import type { Command, OutputLine } from '@/lib/shell/types'

const historyCmd: Command = {
  name: 'history',
  aliases: [],
  description: 'Show command history',
  usage: 'history',
  handler(_, shell) {
    if (shell.history.length === 0) return [{ type: 'text', value: 'No history yet.' }]
    const lines: OutputLine[] = shell.history.map((h, i) => ({
      type: 'text',
      value: `  ${String(i + 1).padStart(3)}  ${h}`,
    }))
    return lines
  },
}

export default historyCmd
