'use client'

import { useRef, useEffect, useCallback, KeyboardEvent } from 'react'
import type { Theme } from '@/styles/themes'

interface Props {
  value: string
  onChange: (v: string) => void
  onSubmit: (v: string) => void
  onHistoryUp: () => void
  onHistoryDown: () => void
  onTab: (v: string) => string
  prompt: string
  theme: Theme
  disabled?: boolean
}

export default function TerminalInput({
  value,
  onChange,
  onSubmit,
  onHistoryUp,
  onHistoryDown,
  onTab,
  prompt,
  theme,
  disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus whenever enabled
  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [disabled])

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onSubmit(value)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        onHistoryUp()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        onHistoryDown()
      } else if (e.key === 'Tab') {
        e.preventDefault()
        const completed = onTab(value)
        onChange(completed)
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault()
        onSubmit('clear')
      } else if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault()
        onChange('')
      }
    },
    [value, onChange, onSubmit, onHistoryUp, onHistoryDown, onTab]
  )

  return (
    <div
      className="flex items-center px-4 py-2 border-t shrink-0"
      style={{ borderColor: theme.border, backgroundColor: theme.surface }}
    >
      <span
        className="font-mono text-sm mr-2 shrink-0 select-none whitespace-nowrap"
        style={{ color: theme.prompt }}
        aria-hidden="true"
      >
        {prompt}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        disabled={disabled}
        aria-label="Terminal input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="flex-1 bg-transparent outline-none font-mono text-sm caret-current"
        style={{ color: theme.text, caretColor: theme.cursor }}
      />
      <span
        className="animate-blink w-2 h-4 ml-0.5 inline-block shrink-0"
        style={{ backgroundColor: value ? 'transparent' : theme.cursor }}
        aria-hidden="true"
      />
    </div>
  )
}
