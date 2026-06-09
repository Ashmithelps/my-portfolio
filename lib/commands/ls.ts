import type { Command, OutputLine } from '@/lib/shell/types'
import { vfs } from '@/lib/vfs/instance'

const ls: Command = {
  name: 'ls',
  aliases: ['dir'],
  description: 'List directory contents',
  usage: 'ls [path]',
  handler({ args }, shell) {
    const path = args[0] ?? shell.cwd
    const result = vfs.ls(path, shell.cwd)
    if (!result.ok) return [{ type: 'error', value: `ls: ${result.error}` }]

    const lines: OutputLine[] = []
    const items = result.value
    if (items.length === 0) return [{ type: 'text', value: '(empty)' }]

    const formatted = items
      .map((n) => (n.kind === 'dir' ? `${n.name}/` : n.name))
      .join('  ')
    lines.push({ type: 'text', value: formatted })
    return lines
  },
}

export default ls
