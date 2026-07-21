import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  type ChatMessage,
  createId,
  generateAssistantReply,
  getStepContext,
} from '@/lib/quote-assistant'

type QuoteAssistantProps = {
  stepId: string
  stepTitle: string
  stepSubtitle?: string
  stepTip?: string
  className?: string
}

export function QuoteAssistant({
  stepId,
  stepTitle,
  stepSubtitle,
  stepTip,
  className,
}: QuoteAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const prevStepRef = useRef<string>('')

  const step = { id: stepId, title: stepTitle, subtitle: stepSubtitle, tip: stepTip }
  const context = getStepContext(step)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    })
  }, [])

  const addAssistantMessage = useCallback((content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: createId(), role: 'assistant', content, timestamp: new Date() },
    ])
  }, [])

  useEffect(() => {
    if (prevStepRef.current === stepId) return
    prevStepRef.current = stepId
    setMessages([{
      id: createId(),
      role: 'assistant',
      content: getStepContext(step).intro,
      timestamp: new Date(),
    }])
    setTyping(false)
    setInput('')
  }, [stepId, stepTitle, stepSubtitle, stepTip, step])

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing, scrollToBottom])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || typing) return
      setMessages((prev) => [
        ...prev,
        { id: createId(), role: 'user', content: trimmed, timestamp: new Date() },
      ])
      setInput('')
      setTyping(true)
      await new Promise((r) => setTimeout(r, 450 + Math.random() * 350))
      addAssistantMessage(generateAssistantReply(trimmed, step))
      setTyping(false)
    },
    [typing, step, addAssistantMessage],
  )

  return (
    <div className={cn('flex h-full min-h-0 flex-col', className)}>
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.06] px-6 py-5">
        <div className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-light">
          <Bot className="size-4 text-navy-deep" strokeWidth={2} aria-hidden />
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-navy-deep bg-[#30d158]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-white">Sentrix Guide</p>
          <p className="text-[12px] text-white/40">AI · Context-aware help</p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-6 py-5"
        role="log"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('flex gap-2', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
            >
              {msg.role === 'assistant' && (
                <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
                  <Bot className="size-3 text-white/50" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[85%] px-3.5 py-2.5 text-[13px] leading-[1.55]',
                  msg.role === 'user'
                    ? 'rounded-[16px] rounded-tr-sm bg-[#1976FF] text-white'
                    : 'rounded-[16px] rounded-tl-sm bg-white/[0.06] text-white/85',
                )}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <div className="flex gap-2">
            <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
              <Bot className="size-3 text-white/50" />
            </div>
            <div className="flex items-center gap-1 rounded-[16px] rounded-tl-sm bg-white/[0.06] px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full bg-white/40"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {context.suggestions.length > 0 && !typing && (
        <div className="shrink-0 border-t border-white/[0.04] px-6 py-4">
          <div className="flex flex-col gap-2">
            {context.suggestions.slice(0, 3).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => sendMessage(s)}
                className="rounded-xl bg-white/[0.04] px-4 py-3 text-left text-[12px] leading-snug text-white/70 transition hover:bg-white/[0.08] hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 border-t border-white/[0.06] px-6 py-5">
        <div className="flex items-end gap-2.5 rounded-2xl bg-white/[0.06] p-2 pl-4 transition-colors focus-within:bg-white/[0.09]">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage(input)
              }
            }}
            placeholder="Message…"
            rows={1}
            className="quote-chat-input max-h-20 min-h-[28px] flex-1 resize-none bg-transparent py-2 text-[13px] text-white placeholder:text-white/30"
            aria-label="Message to assistant"
          />
          <button
            type="button"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gold-light text-navy-deep transition hover:bg-gold-light/90 disabled:opacity-30"
            aria-label="Send"
          >
            <ArrowUp className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
