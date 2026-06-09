import type { Command } from '@/lib/shell/types'

const man: Command = {
  name: 'man',
  aliases: [],
  description: 'Display manual for a command',
  usage: 'man <command>',
  handler({ args }) {
    const { registry } = require('@/lib/commands/index') as { registry: import('@/lib/shell/registry').CommandRegistry }

    if (!args[0]) return [{ type: 'error', value: 'man: what manual page do you want?' }]
    const cmd = registry.resolve(args[0])
    if (!cmd) return [{ type: 'error', value: `man: no entry for '${args[0]}'` }]
    return [
      { type: 'text', value: 'NAME', className: 'text-bright' },
      { type: 'text', value: `     ${cmd.name} — ${cmd.description}` },
      { type: 'br' },
      { type: 'text', value: 'SYNOPSIS', className: 'text-bright' },
      { type: 'text', value: `     ${cmd.usage}` },
      ...(cmd.aliases.length
        ? [
            { type: 'br' as const },
            { type: 'text' as const, value: 'ALIASES', className: 'text-bright' },
            { type: 'text' as const, value: `     ${cmd.aliases.join(', ')}` },
          ]
        : []),
    ]
  },
}

export default man
