import type { Command, OutputLine } from '@/lib/shell/types'
import { themes } from '@/styles/themes'

const themeCmd: Command = {
  name: 'theme',
  aliases: [],
  description: 'Switch terminal theme',
  usage: 'theme [name]',
  handler({ args }, shell) {
    if (!args[0]) {
      const lines: OutputLine[] = [
        { type: 'text', value: 'themes', className: 'header' },
        { type: 'text', value: '────────────────────────────────────────', className: 'text-dim' },
        { type: 'br' },
      ]
      for (const [key, t] of Object.entries(themes)) {
        const current = key === shell.theme ? '  ← active' : ''
        lines.push({
          type: 'text',
          value: `  ${key.padEnd(12)}${t.label}${current}`,
          className: current ? 'text-bright' : undefined,
        })
      }
      lines.push({ type: 'br' })
      lines.push({ type: 'text', value: '  usage: theme <name>', className: 'text-dim' })
      return lines
    }

    const name = args[0].toLowerCase()
    if (!themes[name]) {
      return [
        { type: 'error', value: `  theme: unknown theme '${name}'` },
        { type: 'text', value: `  available: ${Object.keys(themes).join(', ')}`, className: 'text-dim' },
      ]
    }
    shell.setTheme(name)
    return [{ type: 'success', value: `  theme → ${themes[name].label}` }]
  },
}

export default themeCmd
