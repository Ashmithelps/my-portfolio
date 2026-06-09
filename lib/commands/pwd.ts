import type { Command } from '@/lib/shell/types'

const pwd: Command = {
  name: 'pwd',
  aliases: [],
  description: 'Print working directory',
  usage: 'pwd',
  handler(_, shell) {
    return [{ type: 'text', value: shell.cwd }]
  },
}

export default pwd
