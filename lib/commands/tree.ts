import type { Command } from '@/lib/shell/types'
import { vfs } from '@/lib/vfs/instance'

const tree: Command = {
  name: 'tree',
  aliases: [],
  description: 'Display directory tree',
  usage: 'tree [path]',
  handler({ args }, shell) {
    const path = args[0] ?? shell.cwd
    const result = vfs.tree(path, shell.cwd)
    if (!result.ok) return [{ type: 'error', value: `tree: ${result.error}` }]
    return result.value.split('\n').map((line) => ({ type: 'text' as const, value: line }))
  },
}

export default tree
