import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FiX, FiSend, FiRefreshCcw, FiMessageSquare, FiCheck } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import { CONTACT_CHANNELS } from '@/data/offer.js'
import { sendChat, loadConversation, saveConversation, clearConversation } from '@/lib/chat.js'
import { cn } from '@/utils/cn.js'

// Rendered locally rather than fetched: an empty panel that then has to
// round-trip to Groq before saying anything reads as broken, and this
// greeting costs nothing and never rate-limits.
const GREETING = {
  role: 'assistant',
  content:
    "Hi, I'm Burnty — BurntStack's assistant. Ask me anything about websites, online stores or what a project involves, or tell me what you're after and I'll get the team to call you back.",
}

/** Fired whenever the panel opens or closes. LeadPopup listens for it. */
export const CHAT_STATE_EVENT = 'bs:chat-state'

const SUGGESTIONS = [
  'What do you build?',
  'How long does a website take?',
  'I need a website for my shop',
]

function Bubble({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] whitespace-pre-wrap rounded-bento-sm px-3.5 py-2.5 text-sm leading-relaxed',
          isUser ? 'bg-orange-500 text-white' : 'border border-line bg-white text-slate',
        )}
      >
        {content}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex justify-start" aria-label="Burnty is typing">
      <div className="flex gap-1 rounded-bento-sm border border-line bg-white px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-mute"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Burnty, the site assistant. Answers questions about what BurntStack does
 * and collects a name and mobile number; the serverless endpoint decides when
 * a lead is real and emails it to the team.
 *
 * Deliberately a sibling of the WhatsApp button rather than a replacement:
 * plenty of local customers would rather message a human, and the panel
 * offers that route too whenever the assistant can't help.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [leadCaptured, setLeadCaptured] = useState(false)

  const reduceMotion = useReducedMotion()
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const abortRef = useRef(null)

  // Restore whatever this tab was in the middle of.
  useEffect(() => {
    setMessages(loadConversation())
  }, [])

  useEffect(() => {
    if (messages.length > 0) saveConversation(messages)
  }, [messages])

  // Stick to the latest message, including while the typing dots show.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, sending, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Tell the lead popup to stand down while the panel is up. On a phone
  // both are full-width and anchored to the bottom, so they overlap - and
  // two different forms asking for the same details at the same time
  // reads as a broken page, not as persistence.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(CHAT_STATE_EVENT, { detail: { open } }))
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Don't leave a request running against an unmounted component.
  useEffect(() => () => abortRef.current?.abort(), [])

  const send = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed || sending) return

      const next = [...messages, { role: 'user', content: trimmed }]
      setMessages(next)
      setInput('')
      setError('')
      setSending(true)

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const { reply, leadCaptured: captured } = await sendChat(next, {
          signal: controller.signal,
        })
        if (reply) setMessages([...next, { role: 'assistant', content: reply }])
        if (captured) setLeadCaptured(true)
      } catch (err) {
        if (err?.name === 'AbortError') return
        setError(err.message)
      } finally {
        setSending(false)
      }
    },
    [messages, sending],
  )

  const reset = () => {
    abortRef.current?.abort()
    clearConversation()
    setMessages([])
    setError('')
    setLeadCaptured(false)
    setSending(false)
    inputRef.current?.focus()
  }

  const thread = messages.length > 0 ? messages : [GREETING]

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Chat with Burnty'}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 sm:bottom-7 sm:right-7"
      >
        {open ? <FiX className="h-6 w-6" /> : <FiMessageSquare className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Burnty"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 left-4 right-4 z-40 flex max-h-[min(34rem,calc(100dvh-8rem))] flex-col overflow-hidden rounded-bento border border-line bg-ivory shadow-[var(--shadow-lg)] sm:bottom-28 sm:left-auto sm:right-7 sm:w-[23rem]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-line bg-ink px-4 py-3.5">
              <div>
                <p className="font-display text-base font-semibold text-white">Burnty</p>
                <p className="text-[0.7rem] text-white/45">BurntStack assistant</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Usually replies instantly
                </p>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Start a new conversation"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <FiRefreshCcw className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Thread */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
              aria-atomic="false"
            >
              {thread.map((m, i) => (
                <Bubble key={`${m.role}-${i}`} {...m} />
              ))}

              {sending && <TypingDots />}

              {leadCaptured && (
                <div className="flex items-start gap-2 rounded-bento-sm border border-orange-200 bg-orange-50 px-3.5 py-2.5 text-sm text-orange-900">
                  <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                  Your details are with the team — someone will be in touch within one business day.
                </div>
              )}

              {error && (
                <div className="rounded-bento-sm border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
                  <p>{error}</p>
                  <a
                    href={CONTACT_CHANNELS.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 font-semibold text-red-900 underline underline-offset-2"
                  >
                    <FaWhatsapp className="h-4 w-4" /> Message us on WhatsApp instead
                  </a>
                </div>
              )}

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-line-strong bg-white px-3 py-1.5 text-xs font-medium text-slate transition-colors hover:border-orange-400/60 hover:text-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex shrink-0 items-end gap-2 border-t border-line bg-white px-3 py-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Your message
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Burnty…"
                autoComplete="off"
                maxLength={2000}
                className="min-w-0 flex-1 rounded-lg border border-line-strong bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-mute focus:border-orange-400"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send message"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white transition-colors hover:bg-orange-600 disabled:opacity-50"
              >
                <FiSend className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
