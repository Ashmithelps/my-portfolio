import type { Command } from '@/lib/shell/types'

// Snake game is rendered entirely inside the terminal as a client-side widget.
// The command returns a special marker that TerminalOutput detects and renders
// the <SnakeGame> component instead of plain text.

const snake: Command = {
  name: 'snake',
  aliases: [],
  description: 'Play a game of snake',
  usage: 'snake',
  hidden: true,
  handler() {
    return [
      { type: 'text', value: '🐍 Starting Snake...', className: 'text-bright' },
      // Special sentinel that TerminalOutput.tsx watches for
      { type: 'text', value: '__SNAKE_GAME__', className: 'hidden' },
    ]
  },
}

export default snake
