import type { Command } from '@/lib/shell/types'

const matrix: Command = {
  name: 'matrix',
  aliases: [],
  description: 'Wake up, Neo',
  usage: 'matrix',
  hidden: true,
  handler() {
    return [
      { type: 'ascii', value: '  Wake up, Neo...' },
      { type: 'br' },
      {
        type: 'text',
        value: '  01001000 01100101 01111001 00100001',
        className: 'text-bright',
      },
      { type: 'text', value: '  The Matrix has you.', className: 'text-dim' },
      { type: 'br' },
      { type: 'text', value: '  (Try the "matrix" theme: theme matrix)', className: 'text-dim' },
    ]
  },
}

export default matrix
