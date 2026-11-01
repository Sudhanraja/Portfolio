// Vercel serverless function: POST /api/chat
// Answers questions about Sudhanraja using the Gemini REST API. The API key is
// read only from process.env.GEMINI_API_KEY and never reaches the browser.

import { SYSTEM_PROMPT } from '../chatbot/systemPrompt.js'

const MAX_MESSAGE_CHARS = 500
const HISTORY_LIMIT = 6
const RATE_LIMIT = 5 // requests
const RATE_WINDOW_MS = 60_000 // per minute, per IP

const BUSY_REPLY =
  "I'm a little busy right now. Please try again in a minute, or email Sudhanraja directly at sudhanraja003@gmail.com."
const RATE_REPLY =
  "You're sending messages a little fast. Please wait a minute and try again, or email Sudhanraja at sudhanraja003@gmail.com."

// In-memory rate limit. Each warm serverless instance keeps its own map, so
// this is a light guard rather than a strict global limit.
const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key)
    }
  }
  return false
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim()
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown'
}

// Accepts { message, history: [{ role: 'user' | 'assistant', content }] }.
// Returns an error string, or null when the input is valid.
function validate(body) {
  if (!body || typeof body !== 'object') return 'Invalid request.'
  const { message, history = [] } = body
  if (typeof message !== 'string' || !message.trim()) return 'Please type a question.'
  if (message.length > MAX_MESSAGE_CHARS) return `Please keep your question under ${MAX_MESSAGE_CHARS} characters.`
  if (!Array.isArray(history)) return 'Invalid request.'
  for (const m of history) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') return 'Invalid request.'
    if (m.content.length > MAX_MESSAGE_CHARS) return 'Invalid request.'
  }
  return null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (rateLimited(clientIp(req))) {
    return res.status(429).json({ reply: RATE_REPLY })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = null
    }
  }
  const problem = validate(body)
  if (problem) return res.status(400).json({ error: problem })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set')
    return res.status(503).json({ reply: BUSY_REPLY })
  }
  const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'

  // Last 6 messages of history (previous turns), then the new question.
  // Gemini expects the conversation to open with a user turn.
  const recent = (Array.isArray(body.history) ? body.history : []).slice(-HISTORY_LIMIT)
  while (recent.length && recent[0].role !== 'user') recent.shift()
  const contents = [
    ...recent.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    { role: 'user', parts: [{ text: body.message.trim() }] },
  ]

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 400 },
        }),
      },
    )

    if (!response.ok) {
      console.error('Gemini error', response.status, await response.text().catch(() => ''))
      return res.status(response.status === 429 ? 429 : 502).json({ reply: BUSY_REPLY })
    }

    const data = await response.json()
    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((p) => p.text || '')
      .join('')
      .trim()
    if (!reply) return res.status(502).json({ reply: BUSY_REPLY })

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('Chat request failed', err)
    return res.status(502).json({ reply: BUSY_REPLY })
  }
}
