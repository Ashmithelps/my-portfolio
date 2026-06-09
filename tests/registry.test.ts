import { describe, it, expect } from 'vitest'
import { CommandRegistry } from '@/lib/shell/registry'
import type { Command } from '@/lib/shell/types'

function makeCmd(name: string, aliases: string[] = []): Command {
  return {
    name,
    aliases,
    description: `${name} command`,
    usage: name,
    handler: () => [],
  }
}

describe('CommandRegistry', () => {
  it('registers and resolves a command', () => {
    const reg = new CommandRegistry()
    reg.register(makeCmd('help'))
    expect(reg.resolve('help')).not.toBeNull()
  })

  it('resolves by alias', () => {
    const reg = new CommandRegistry()
    reg.register(makeCmd('whoami', ['about']))
    const cmd = reg.resolve('about')
    expect(cmd?.name).toBe('whoami')
  })

  it('returns null for unknown command', () => {
    const reg = new CommandRegistry()
    expect(reg.resolve('nope')).toBeNull()
  })

  it('suggests close match', () => {
    const reg = new CommandRegistry()
    reg.register(makeCmd('help'))
    expect(reg.suggest('halp')).toBe('help')
  })

  it('returns null suggestion when too far', () => {
    const reg = new CommandRegistry()
    reg.register(makeCmd('help'))
    expect(reg.suggest('xyzxyz')).toBeNull()
  })

  it('completions returns prefix matches', () => {
    const reg = new CommandRegistry()
    reg.register(makeCmd('help'))
    reg.register(makeCmd('history'))
    const c = reg.completions('hi')
    expect(c).toContain('history')
    expect(c).not.toContain('help')
  })
})
