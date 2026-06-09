import type { Command } from '@/lib/shell/types'

const sudo: Command = {
  name: 'sudo',
  aliases: [],
  description: 'Run command as root',
  usage: 'sudo <command>',
  hidden: true,
  handler({ args }) {
    if (args[0] === 'rm' || args.join(' ').includes('-rf')) {
      return [
        { type: 'error', value: 'WAIT—' },
        { type: 'br' },
        { type: 'text', value: '  Nice try. But this is a portfolio, not a production server.' },
        { type: 'text', value: '  No root for you. 😄' },
      ]
    }
    return [
      { type: 'warning', value: `[sudo] password for visitor:` },
      { type: 'error', value: 'Sorry, try again.' },
      { type: 'error', value: 'Sorry, try again.' },
      { type: 'error', value: 'sudo: 3 incorrect password attempts' },
      { type: 'text', value: '  (Psst: this is a read-only terminal. You were never getting root.)', className: 'text-dim' },
    ]
  },
}

export default sudo
