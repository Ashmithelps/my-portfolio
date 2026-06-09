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
        { type: 'text', value: 'Available themes:', className: 'text-bright' },
        { type: 'br' },
      ]
      for (const [key, t] of Object.entries(themes)) {
        const current = key === shell.theme ? ' ← current' : ''
        lines.push({ type: 'text', value: `  ${key.padEnd(10)} ${t.label}${current}` })
      }
      lines.push({ type: 'br' })
      lines.push({ type: 'text', value: "Usage: theme <name>", className: 'text-dim' })
      return lines
    }

    const name = args[0].toLowerCase()
    if (!themes[name]) {
      return [
        { type: 'error', value: `theme: unknown theme '${name}'` },
        { type: 'text', value: `Available: ${Object.keys(themes).join(', ')}` },
      ]
    }
    shell.setTheme(name)
    return [{ type: 'success', value: `Theme set to '${themes[name].label}'` }]
  },
}

export default themeCmd
