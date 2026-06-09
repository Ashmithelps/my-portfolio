import type { Command } from '@/lib/shell/types'
import { vfs } from '@/lib/vfs/instance'

const cd: Command = {
  name: 'cd',
  aliases: [],
  description: 'Change directory',
  usage: 'cd [path]',
  handler({ args }, shell) {
    const path = args[0] ?? '/'
    const result = vfs.cd(path, shell.cwd)
    if (!result.ok) return [{ type: 'error', value: `cd: ${result.error}` }]
    shell.setCwd(result.value)
    return []
  },
}

export default cd
