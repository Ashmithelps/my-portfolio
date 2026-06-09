import type { Command } from '@/lib/shell/types'

const clear: Command = {
  name: 'clear',
  aliases: ['cls'],
  description: 'Clear the terminal',
  usage: 'clear',
  handler(_, shell) {
    shell.clearOutput()
    return []
  },
}

export default clear
