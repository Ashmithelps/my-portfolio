import type { Command, OutputLine } from '@/lib/shell/types'

const help: Command = {
  name: 'help',
  aliases: ['?'],
  description: 'List available commands',
  usage: 'help [command]',
  handler({ args }) {
    // Lazy import to break circular dependency
    const { registry } = require('@/lib/commands/index') as { registry: import('@/lib/shell/registry').CommandRegistry }

    if (args[0]) {
      const cmd = registry.resolve(args[0])
      if (!cmd) {
        return [{ type: 'error', value: `help: no entry for '${args[0]}'` }]
      }
      return [
        { type: 'text', value: cmd.name, className: 'text-bright' },
        { type: 'text', value: `  ${cmd.description}` },
        { type: 'text', value: `  Usage: ${cmd.usage}` },
        ...(cmd.aliases.length
          ? [{ type: 'text' as const, value: `  Aliases: ${cmd.aliases.join(', ')}` }]
          : []),
      ]
    }

    const cmds = (registry.allCommands() as import('@/lib/shell/types').Command[]).filter((c) => !c.hidden)
    const lines: OutputLine[] = [
      { type: 'text', value: 'Available commands:', className: 'text-bright' },
      { type: 'br' },
    ]
    const maxLen = Math.max(...cmds.map((c) => c.name.length))
    for (const cmd of cmds) {
      lines.push({
        type: 'text',
        value: `  ${cmd.name.padEnd(maxLen + 2)}${cmd.description}`,
      })
    }
    lines.push({ type: 'br' })
    lines.push({
      type: 'text',
      value: "Type 'man <command>' for detailed usage.",
      className: 'text-dim',
    })
    return lines
  },
}

export default help
