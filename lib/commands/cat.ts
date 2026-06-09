import type { Command, OutputLine } from '@/lib/shell/types'
import { vfs } from '@/lib/vfs/instance'

const cat: Command = {
  name: 'cat',
  aliases: [],
  description: 'Display file contents',
  usage: 'cat <file>',
  handler({ args }, shell) {
    if (!args[0]) return [{ type: 'error', value: 'cat: missing file operand' }]
    const result = vfs.cat(args[0], shell.cwd)
    if (!result.ok) return [{ type: 'error', value: `cat: ${result.error}` }]

    const lines: OutputLine[] = result.value
      .split('\n')
      .map((line) => ({ type: 'text' as const, value: line }))
    return lines
  },
}

export default cat
