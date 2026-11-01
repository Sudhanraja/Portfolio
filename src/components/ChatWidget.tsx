import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Mail, Send, X } from 'lucide-react'
import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import RobotMascot from './RobotMascot'
import { FORMSPREE_ENDPOINT } from '../data/portfolio'

// Floating AI assistant that answers recruiters' questions about Sudhanraja
// via /api/chat. History lives only in component state.

// offerEmail: show a "Write to Sudhanraja" button under this reply.
type Message = { role: 'user' | 'assistant'; content: string; offerEmail?: boolean }

type Compose = { name: string; email: string; message: string; status: 'idle' | 'sending' | 'error' }

// Questions that are really "how do I reach him" get a send-email shortcut.
const CONTACT_INTENT = /\b(e-?mail|mail|resume|cv|hir(e|ing)|job|role|opening|vacanc|interview|contact|reach|connect|recruit|offer|opportunit)/i

const BOT_NAME = 'Nexa'
const WELCOME = "Hi! I'm Nexa, Sudhanraja's AI assistant. Ask me about his experience, projects, or skills."
const SUGGESTIONS = ['What is he working on now?', 'Tell me about his AI projects', 'What are his technical skills?']
const MAX_CHARS = 500
const BUSY_REPLY =
  "I'm a little busy right now. Please try again in a minute, or email Sudhanraja directly at sudhanraja003@gmail.com."

// Other components can open the chat (e.g. clicking the mascot in About).
const OPEN_EVENT = 'open-chat'
export const openChat = () => window.dispatchEvent(new Event(OPEN_EVENT))

// ---- Minimal markdown: **bold**, [links](url), bare URLs/emails, bullet lists ----
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+[^\s).,])|([\w.+-]+@[\w-]+\.[\w.]+\w)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const k = `${keyBase}-${i++}`
    const link = 'underline decoration-[#E06BD6]/60 underline-offset-2 hover:text-white'
    if (m[1]) out.push(<strong key={k} className="font-semibold text-white">{m[1]}</strong>)
    else if (m[2]) out.push(<a key={k} href={m[3]} target="_blank" rel="noreferrer" className={link}>{m[2]}</a>)
    else if (m[4]) out.push(<a key={k} href={m[4]} target="_blank" rel="noreferrer" className={link}>{m[4]}</a>)
    else if (m[5]) out.push(<a key={k} href={`mailto:${m[5]}`} className={link}>{m[5]}</a>)
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function Markdown({ text }: { text: string }) {
  const blocks: ReactNode[] = []
  let list: string[] = []
  const flush = (k: number) => {
    if (!list.length) return
    blocks.push(
      <ul key={`ul${k}`} className="my-1 flex list-disc flex-col gap-1 pl-5 marker:text-[#E06BD6]">
        {list.map((item, i) => <li key={i}>{inline(item, `li${k}-${i}`)}</li>)}
      </ul>,
    )
    list = []
  }
  text.split('\n').forEach((line, k) => {
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/)
    if (bullet) return void list.push(bullet[1])
    flush(k)
    if (line.trim()) blocks.push(<p key={`p${k}`}>{inline(line, `p${k}`)}</p>)
  })
  flush(-1)
  return <div className="flex flex-col gap-2">{blocks.map((b, i) => <Fragment key={i}>{b}</Fragment>)}</div>
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: WELCOME }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [compose, setCompose] = useState<Compose | null>(null)
  const reduceMotion = useReducedMotion()
  // On page load Nexa pops up and waves while its welcome bubble shows, then
  // Nexa shrinks back into the small chat button. Skipped for
  // reduced motion.
  const [intro, setIntro] = useState(true)
  const [hello, setHello] = useState(false)
  useEffect(() => {
    if (reduceMotion) return setIntro(false)
    const timers = [window.setTimeout(() => setHello(true), 500), window.setTimeout(() => setIntro(false), 2500)]
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [reduceMotion])
  useEffect(() => {
    if (open) setIntro(false)
  }, [open])
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  // Focus the input when opening; Escape closes and returns focus to the button.
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 150)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Keep the newest message in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, open, compose === null])

  const send = useCallback(
    async (text: string) => {
      const message = text.trim().slice(0, MAX_CHARS)
      if (!message || loading) return
      // History excludes the canned welcome message.
      const history = messages.slice(1).slice(-6).map(({ role, content }) => ({ role, content }))
      const offerEmail = CONTACT_INTENT.test(message)
      setMessages((m) => [...m, { role: 'user', content: message }])
      setInput('')
      setLoading(true)
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history }),
        })
        const data = await res.json().catch(() => ({}))
        const reply = typeof data.reply === 'string' ? data.reply : typeof data.error === 'string' ? data.error : BUSY_REPLY
        setMessages((m) => [...m, { role: 'assistant', content: reply, offerEmail }])
      } catch {
        setMessages((m) => [...m, { role: 'assistant', content: BUSY_REPLY }])
      } finally {
        setLoading(false)
      }
    },
    [loading, messages],
  )

  const showSuggestions = messages.length === 1 && !loading

  // Open the in-chat email form, prefilled with the visitor's last message.
  const startEmail = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content ?? ''
    setCompose({ name: '', email: '', message: lastUser, status: 'idle' })
  }

  // Sends through the same Formspree form as the Contact section.
  const sendEmail = async () => {
    if (!compose || compose.status === 'sending') return
    setCompose({ ...compose, status: 'sending' })
    try {
      const data = new FormData()
      data.append('name', compose.name.trim())
      data.append('email', compose.email.trim())
      data.append('message', compose.message.trim())
      data.append('_subject', `Portfolio chat: message from ${compose.name.trim() || compose.email.trim()}`)
      data.append('source', 'Portfolio AI chat')
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(String(res.status))
      setMessages((m) => [...m, { role: 'assistant', content: `**Email sent!** Sudhanraja will get back to you at ${compose.email.trim()}.` }])
      setCompose(null)
    } catch {
      setCompose((c) => (c ? { ...c, status: 'error' } : c))
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : `Chat with ${BOT_NAME}, Sudhanraja's AI assistant`}
        aria-expanded={open}
        aria-controls="portfolio-chat"
        className="fixed bottom-5 right-5 z-[60] flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-[#121217] shadow-[0_10px_40px_-8px_rgba(182,0,168,0.7)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E06BD6] sm:bottom-6 sm:right-6"
        initial={{ scale: 0, opacity: 0 }}
        animate={intro ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ delay: intro ? 0 : 0.25, type: 'spring', stiffness: 260, damping: 18 }}
        style={{ pointerEvents: intro ? 'none' : undefined }}
      >
        {open ? <X className="text-[#D7E2EA]" size={26} /> : <RobotMascot variant="head" className="w-11" />}
        {!open && <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-[#121217] bg-[#28c840]" />}
      </motion.button>

      {/* Page-load hello: the full robot rises, waves, then shrinks into the button */}
      <AnimatePresence>
        {intro && !open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Hi! I'm ${BOT_NAME}. Chat with me about Sudhanraja`}
            className="fixed bottom-3 right-2 z-[61] w-[140px] sm:bottom-4 sm:right-3 sm:w-[180px]"
            style={{ transformOrigin: '85% 100%' }}
            initial={{ opacity: 0, y: 90, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3, y: 10, transition: { duration: 0.3, ease: [0.5, 0, 0.75, 0] } }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 190, damping: 16 }}
          >
            <RobotMascot wave className="w-full drop-shadow-[0_20px_35px_rgba(182,0,168,0.45)]" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {intro && hello && !open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            className="fixed bottom-[118px] right-[150px] z-[61] w-[190px] rounded-2xl rounded-br-sm border border-white/10 bg-[#16151b]/95 px-4 py-3 text-left shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8),0_0_40px_-18px_rgba(182,0,168,0.9)] backdrop-blur-md sm:bottom-[150px] sm:right-[192px] sm:w-[250px]"
            style={{ transformOrigin: '100% 100%' }}
            initial={{ opacity: 0, scale: 0.6, x: 12 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span className="block text-sm font-semibold text-white">
              Hi, I&apos;m {BOT_NAME} <span aria-hidden="true">👋</span>
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-[#b9c3cc]">
              Sudhan&apos;s AI assistant. Ask me about his projects, skills or experience!
            </span>
            {/* Tail pointing at Nexa */}
            <span className="absolute -right-1.5 bottom-3 h-3 w-3 rotate-45 border-r border-t border-white/10 bg-[#16151b]" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            id="portfolio-chat"
            role="dialog"
            aria-label={`${BOT_NAME}, Sudhanraja's AI assistant`}
            className="fixed inset-x-3 bottom-3 top-16 z-[60] flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111116]/95 text-[#D7E2EA] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9),0_0_60px_-30px_rgba(182,0,168,0.6)] backdrop-blur-xl sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[560px] sm:max-h-[calc(100vh-8rem)] sm:w-[380px]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom right' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5">
                <RobotMascot variant="head" className="w-8" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-base font-semibold text-white">{BOT_NAME}</h2>
                <p className="flex items-center gap-1.5 text-xs text-[#7d8894]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" /> Sudhan's AI assistant · online
                </p>
              </div>
              <button
                type="button"
                onClick={startEmail}
                aria-label="Email Sudhanraja"
                title="Email Sudhanraja"
                className="rounded-full p-2 text-[#7d8894] transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E06BD6]"
              >
                <Mail size={18} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  buttonRef.current?.focus()
                }}
                aria-label="Close chat"
                className="rounded-full p-2 text-[#7d8894] transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E06BD6]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite" aria-relevant="additions">
              {messages.map((m, i) =>
                m.role === 'user' ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-gradient-to-br from-[#B600A8] to-[#7621B0] px-3.5 py-2.5 text-sm leading-relaxed text-white">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[88%]">
                      <div className="rounded-2xl rounded-bl-md border border-white/5 bg-white/[0.05] px-3.5 py-2.5 text-sm leading-relaxed">
                        <Markdown text={m.content} />
                      </div>
                      {m.offerEmail && !compose && (
                        <button
                          type="button"
                          onClick={startEmail}
                          className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#E06BD6]/40 bg-[#E06BD6]/10 px-3 py-1.5 text-xs font-medium text-[#f3c6ee] transition-colors hover:bg-[#E06BD6]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E06BD6]"
                        >
                          <Mail size={14} /> Write to Sudhanraja from here
                        </button>
                      )}
                    </div>
                  </div>
                ),
              )}

              {loading && (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/5 bg-white/[0.05] px-4 py-3.5">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-[#E06BD6]" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              )}

              {compose && (
                <form
                  className="rounded-2xl border border-[#E06BD6]/30 bg-[#E06BD6]/[0.05] p-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    sendEmail()
                  }}
                  aria-label="Email Sudhanraja"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                      <Mail size={15} className="text-[#E06BD6]" /> Email Sudhanraja
                    </span>
                    <button type="button" onClick={() => setCompose(null)} aria-label="Cancel email" className="rounded-full p-1 text-[#7d8894] hover:text-white">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      required
                      aria-label="Your name"
                      placeholder="Your name"
                      value={compose.name}
                      onChange={(e) => setCompose({ ...compose, name: e.target.value, status: 'idle' })}
                      className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[#7d8894] focus:border-[#E06BD6]/60 focus:outline-none"
                    />
                    <input
                      required
                      type="email"
                      aria-label="Your email"
                      placeholder="Your email (so he can reply)"
                      value={compose.email}
                      onChange={(e) => setCompose({ ...compose, email: e.target.value, status: 'idle' })}
                      className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[#7d8894] focus:border-[#E06BD6]/60 focus:outline-none"
                    />
                    <textarea
                      required
                      rows={4}
                      maxLength={2000}
                      aria-label="Message"
                      placeholder="Your message, e.g. the role and a link to the job post"
                      value={compose.message}
                      onChange={(e) => setCompose({ ...compose, message: e.target.value, status: 'idle' })}
                      className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[#7d8894] focus:border-[#E06BD6]/60 focus:outline-none resize-none"
                    />
                    {compose.status === 'error' && (
                      <p className="text-xs text-[#ff8a8a]" role="alert">
                        Couldn&apos;t send right now. Please email{' '}
                        <a href="mailto:sudhanraja003@gmail.com" className="underline">
                          sudhanraja003@gmail.com
                        </a>{' '}
                        directly.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={compose.status === 'sending'}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#B600A8] to-[#7621B0] py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
                    >
                      <Send size={14} /> {compose.status === 'sending' ? 'Sending…' : 'Send email'}
                    </button>
                  </div>
                </form>
              )}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-[#E06BD6]/30 bg-[#E06BD6]/[0.07] px-3 py-1.5 text-left text-xs text-[#f3c6ee] transition-colors hover:border-[#E06BD6]/60 hover:bg-[#E06BD6]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E06BD6]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              className="border-t border-white/10 p-3"
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
            >
              <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 pl-3 focus-within:border-[#E06BD6]/50">
                <label htmlFor="chat-input" className="sr-only">
                  Your question
                </label>
                <textarea
                  id="chat-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={MAX_CHARS}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      send(input)
                    }
                  }}
                  placeholder="Ask about his experience, projects…"
                  className="max-h-28 min-h-[2.25rem] flex-1 resize-none bg-transparent py-2 text-sm text-white placeholder:text-[#7d8894] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#B600A8] to-[#7621B0] text-white transition-opacity disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E06BD6]"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="mt-1.5 px-1 text-[10px] text-[#5d6670]">
                AI can make mistakes. For anything important, email sudhanraja003@gmail.com.
                {input.length > MAX_CHARS - 80 && <span className="float-right">{input.length}/{MAX_CHARS}</span>}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
