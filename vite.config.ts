import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
// Dev only: serve the Vercel function in api/chat.js from the Vite dev server,
// so the chatbot works with `npm run dev` (no Vercel CLI needed). Production
// uses Vercel's own /api routing; this plugin never runs in the build.
function localApi(env: Record<string, string>): Plugin {
  return {
    name: 'local-vercel-api',
    apply: 'serve',
    configureServer(server) {
      // .env.local is the source of truth in dev, so edits apply on restart.
      for (const key of ['GEMINI_API_KEY', 'GEMINI_MODEL']) {
        if (env[key]) process.env[key] = env[key]
      }
      server.middlewares.use('/api/chat', async (req, res) => {
        let raw = ''
        for await (const chunk of req) raw += chunk
        let body: unknown = null
        try {
          body = raw ? JSON.parse(raw) : null
        } catch {
          body = null
        }
        // Minimal stand-in for Vercel's req/res helpers.
        const vReq = Object.assign(req, { body })
        const vRes = Object.assign(res, {
          status(code: number) {
            res.statusCode = code
            return vRes
          },
          json(data: unknown) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
            return vRes
          },
        })
        const mod = await server.ssrLoadModule('/api/chat.js')
        await mod.default(vReq, vRes)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), localApi(loadEnv(mode, process.cwd(), ''))],}))
