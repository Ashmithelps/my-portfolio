import type { Command } from '@/lib/shell/types'

const echo: Command = {
  name: 'echo',
  aliases: [],
  description: 'Print text',
  usage: 'echo <text>',
  handler({ args }) {
    return [{ type: 'text', value: args.join(' ') }]
  },
}

export default echo
