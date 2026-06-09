'use client'

import { useEffect, useRef, lazy, Suspense } from 'react'
import type { HistoryEntry, OutputLine } from '@/lib/shell/types'
import type { Theme } from '@/styles/themes'

const SnakeGame = lazy(() => import('./SnakeGame'))

interface Props {
  entries: HistoryEntry[]
  theme: Theme
  prompt: string
}

export default function TerminalOutput({ entries, theme, prompt }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [entries])

  return (
    <div
      aria-live="polite"
      aria-label="Terminal output"
      role="log"
      className="flex-1 overflow-y-auto px-4 pt-4 pb-2 font-mono text-sm leading-relaxed"
      style={{ color: theme.text }}
    >
      {entries.map((entry) => (
        <div key={entry.timestamp} className="mb-1">
          {entry.input && (
            <div className="flex items-center gap-1 mb-0.5 opacity-80">
              <span style={{ color: theme.prompt }}>{prompt}</span>
              <span style={{ color: theme.text }}>{entry.input}</span>
            </div>
          )}
          <div>
            {entry.output.map((line, i) => (
              <OutputLineView key={i} line={line} theme={theme} />
            ))}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

function OutputLineView({ line, theme }: { line: OutputLine; theme: Theme }) {
  if (line.type === 'br') return <div className="h-2" aria-hidden="true" />

  if (line.type === 'link') {
    return (
      <div>
        <a
          href={line.href}
          target={line.href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="hover:underline focus:underline outline-none focus-visible:ring-2"
          style={{ color: theme.link }}
        >
          {line.label}
        </a>
      </div>
    )
  }

  if (line.type === 'ascii') {
    return (
      <pre
        style={{ color: theme.prompt, whiteSpace: 'pre', overflowX: 'auto' }}
        aria-label="ASCII art"
      >
        {line.value}
      </pre>
    )
  }

  // Check for snake game sentinel
  if (line.type === 'text' && line.value === '__SNAKE_GAME__') {
    return (
      <Suspense fallback={<span style={{ color: theme.textDim }}>Loading…</span>}>
        <SnakeGame theme={theme} />
      </Suspense>
    )
  }

  const colorMap: Record<string, string> = {
    error: theme.error,
    success: theme.success,
    warning: theme.warning,
    'command-echo': theme.textDim,
  }

  const classColorMap: Record<string, string> = {
    'text-bright': theme.textBright,
    'text-dim': theme.textDim,
    hidden: 'transparent',
  }

  const baseColor =
    colorMap[line.type] ??
    (line.type === 'text' && line.className ? classColorMap[line.className] : undefined) ??
    theme.text

  if (line.type === 'text' && line.className === 'hidden') return null

  return (
    <div style={{ color: baseColor, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {line.value}
    </div>
  )
}
