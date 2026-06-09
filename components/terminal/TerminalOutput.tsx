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
      className="relative z-10 flex-1 overflow-y-auto px-5 pt-5 pb-2 font-mono text-sm leading-[1.7]"
      style={{ color: theme.text }}
    >
      {/* Max-width wrapper keeps lines readable on ultrawide */}
      <div className="max-w-3xl">
        {entries.map((entry) => (
          <div key={entry.timestamp} className="output-entry-animate mb-4">
            {entry.input && (
              <div className="flex items-baseline gap-1 mb-1 opacity-75">
                <span className="shrink-0 whitespace-nowrap" style={{ color: theme.prompt }}>
                  {prompt}
                </span>
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
      </div>
      <div ref={bottomRef} />
    </div>
  )
}

function OutputLineView({ line, theme }: { line: OutputLine; theme: Theme }) {
  if (line.type === 'br') return <div className="h-1.5" aria-hidden="true" />

  if (line.type === 'link') {
    return (
      <div className="leading-[1.7]">
        <a
          href={line.href}
          target={line.href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="output-link focus:outline-none focus-visible:ring-2 rounded-sm"
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
        className="ascii-art leading-tight mb-1 overflow-x-auto"
        style={{ color: theme.prompt, whiteSpace: 'pre' }}
        aria-label="ASCII art"
      >
        {line.value}
      </pre>
    )
  }

  if (line.type === 'text' && line.value === '__SNAKE_GAME__') {
    return (
      <Suspense fallback={<span style={{ color: theme.textDim }}>Loading…</span>}>
        <SnakeGame theme={theme} />
      </Suspense>
    )
  }

  if (line.type === 'text' && line.className === 'hidden') return null

  // Color resolution — one accent, strict semantics
  const colorByType: Record<string, string> = {
    error: theme.error,
    success: theme.success,
    warning: theme.warning,
    'command-echo': theme.textDim,
  }

  const colorByClass: Record<string, string> = {
    'text-bright': theme.textBright,
    'text-dim':    theme.textDim,
    'header':      theme.prompt,   // accent — section headers
    'hidden':      'transparent',
  }

  const color =
    colorByType[line.type] ??
    (line.type === 'text' && line.className ? colorByClass[line.className] : undefined) ??
    theme.text

  // Section headers get slight letter-spacing
  const isHeader = line.type === 'text' && line.className === 'header'

  return (
    <div
      style={{
        color,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        letterSpacing: isHeader ? '0.04em' : undefined,
      }}
    >
      {line.value}
    </div>
  )
}
