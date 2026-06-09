'use client'

import type { Theme } from '@/styles/themes'

const CHIPS = [
  { label: 'about',    command: 'whoami' },
  { label: 'projects', command: 'projects' },
  { label: 'skills',   command: 'skills' },
  { label: 'resume',   command: 'resume' },
  { label: 'contact',  command: 'contact' },
]

interface Props {
  onCommand: (cmd: string) => void
  theme: Theme
}

export default function QuickChips({ onCommand, theme }: Props) {
  return (
    <div
      className="relative z-10 flex flex-wrap items-center gap-x-1 gap-y-1 px-5 py-2 border-t shrink-0"
      style={{ borderColor: theme.border, backgroundColor: theme.surface }}
      role="navigation"
      aria-label="Quick commands"
    >
      <span
        className="font-mono text-[11px] mr-1 select-none"
        style={{ color: theme.textDim }}
        aria-hidden="true"
      >
        quick:
      </span>
      {CHIPS.map((chip) => (
        <button
          key={chip.command}
          onClick={() => onCommand(chip.command)}
          className="terminal-chip font-mono text-[11px] px-2.5 py-0.5 rounded
                     focus:outline-none focus-visible:ring-1"
          style={{
            color: theme.textDim,
            backgroundColor: 'transparent',
            // CSS class handles hover transition; JS inline for rest state
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = theme.prompt
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = theme.selection
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = theme.textDim
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
          }}
          aria-label={`Run ${chip.command}`}
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}
