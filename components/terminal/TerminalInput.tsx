'use client'

import { useRef, useEffect, useCallback, useState, KeyboardEvent } from 'react'
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
  value, onChange, onSubmit, onHistoryUp, onHistoryDown, onTab, prompt, theme, disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [disabled])

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') { e.preventDefault(); onSubmit(value) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); onHistoryUp() }
      else if (e.key === 'ArrowDown') { e.preventDefault(); onHistoryDown() }
      else if (e.key === 'Tab') { e.preventDefault(); onChange(onTab(value)) }
      else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); onSubmit('clear') }
      else if (e.key === 'c' && e.ctrlKey) { e.preventDefault(); onChange('') }
    },
    [value, onChange, onSubmit, onHistoryUp, onHistoryDown, onTab]
  )

  return (
    <div
      className="terminal-input-bar relative z-10 flex items-center px-5 py-3 shrink-0 border-t"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
        // Accent top-line appears on focus — CSS transition in globals.css handles it
        borderTopColor: focused ? theme.prompt : theme.border,
      }}
    >
      <span
        className="font-mono text-sm shrink-0 select-none whitespace-nowrap mr-2"
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
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        aria-label="Terminal input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="flex-1 bg-transparent outline-none font-mono text-sm"
        style={{ color: theme.text, caretColor: theme.cursor }}
      />
      {/* Block cursor when input is empty */}
      {!value && (
        <span
          className="animate-blink w-[0.5ch] h-[1.1em] ml-px inline-block shrink-0 opacity-80"
          style={{ backgroundColor: theme.cursor }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
