'use client'

import type { Theme } from '@/styles/themes'

interface Chip {
  label: string
  command: string
}

const CHIPS: Chip[] = [
  { label: 'About', command: 'whoami' },
  { label: 'Projects', command: 'projects' },
  { label: 'Skills', command: 'skills' },
  { label: 'Résumé', command: 'resume' },
  { label: 'Contact', command: 'contact' },
]

interface Props {
  onCommand: (cmd: string) => void
  theme: Theme
}

export default function QuickChips({ onCommand, theme }: Props) {
  return (
    <div
      className="flex flex-wrap gap-2 px-4 py-2 border-t shrink-0"
      style={{ borderColor: theme.border }}
      role="navigation"
      aria-label="Quick commands"
    >
      {CHIPS.map((chip) => (
        <button
          key={chip.command}
          onClick={() => onCommand(chip.command)}
          className="font-mono text-xs px-3 py-1 rounded border transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 active:scale-95"
          style={{
            borderColor: theme.border,
            color: theme.link,
            backgroundColor: theme.surface,
          }}
          aria-label={`Run ${chip.command}`}
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}
