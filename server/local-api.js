import lead from '../api/lead.js'
import chat from '../api/chat.js'
import sitemap from '../api/sitemap.js'

// Run the same handlers as Vercel during local development. This module is
// imported by vite.config.js only; credentials never enter the client bundle.
const handlers = { '/api/lead': lead, '/api/chat': chat, '/api/sitemap': sitemap, '/sitemap.xml': sitemap }

export function localApi({ blogApiUrl } = {}) {
  return {
    name: 'burntstack-local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = new URL(req.url, 'http://localhost').pathname.replace(/\/$/, '')
        const handler = handlers[path]
        if (!handler) return next()
        res.status = (code) => { res.statusCode = code; return res }
        res.json = (data) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)) }
        res.send = (data) => res.end(data)
        try {
          const chunks = []
          let size = 0
          for await (const chunk of req) {
            size += chunk.length
            if (size > 64 * 1024) return res.status(413).json({ error: 'Request is too large.' })
            chunks.push(chunk)
          }
          const body = Buffer.concat(chunks).toString('utf8')
          try {
            req.body = body ? JSON.parse(body) : {}
          } catch {
            return res.status(400).json({ error: 'Please send valid JSON.' })
          }
          if (handler === sitemap) await sitemap(req, res, blogApiUrl)
          else await handler(req, res)
        } catch {
          if (!res.writableEnded) res.status(500).json({ error: 'Could not complete the request. Please try again.' })
        }
      })
    },
  }
}
