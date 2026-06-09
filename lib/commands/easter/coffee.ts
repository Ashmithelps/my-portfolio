import type { Command } from '@/lib/shell/types'

const coffee: Command = {
  name: 'coffee',
  aliases: ['brew'],
  description: 'Essential developer tool',
  usage: 'coffee',
  hidden: true,
  handler() {
    return [
      {
        type: 'ascii',
        value: [
          '     ( (',
          '      ) )',
          '   .______.',
          '   |      |]',
          '   \\      /',
          "    `----'",
        ].join('\n'),
      },
      { type: 'br' },
      { type: 'success', value: '  ☕ Coffee brewing... done.' },
      { type: 'text', value: '  Productivity increased by 200%.', className: 'text-dim' },
    ]
  },
}

export default coffee
