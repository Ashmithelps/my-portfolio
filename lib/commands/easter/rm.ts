import type { Command, OutputLine } from '@/lib/shell/types'

const rm: Command = {
  name: 'rm',
  aliases: [],
  description: 'Remove files',
  usage: 'rm [-rf] <path>',
  hidden: true,
  handler({ args, flags }) {
    const isNuclear =
      (flags['r'] || flags['rf'] || flags['f']) &&
      (args.includes('/') || args.includes('*') || args.includes('~'))

    if (isNuclear) {
      const panic: OutputLine[] = [
        { type: 'error', value: 'rm: descending into /...' },
        { type: 'error', value: 'rm: removing projects/...' },
        { type: 'error', value: 'rm: removing resume.txt...' },
        { type: 'error', value: 'rm: removing about.txt...' },
        { type: 'error', value: '████████████████████ 100%' },
        { type: 'br' },
        { type: 'warning', value: '  Just kidding. 😅' },
        { type: 'text', value: "  This filesystem is immutable. Everything's fine." },
        { type: 'text', value: '  (No developers were harmed in the making of this easter egg.)', className: 'text-dim' },
      ]
      return panic
    }

    return [
      { type: 'error', value: 'rm: permission denied: this filesystem is read-only' },
    ]
  },
}

export default rm
