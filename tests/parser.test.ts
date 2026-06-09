import { describe, it, expect } from 'vitest'
import { parseInput } from '@/lib/shell/parser'

describe('parseInput', () => {
  it('parses a bare command', () => {
    const r = parseInput('help')
    expect(r.command).toBe('help')
    expect(r.args).toEqual([])
    expect(r.flags).toEqual({})
  })

  it('parses command with args', () => {
    const r = parseInput('cat about.txt')
    expect(r.command).toBe('cat')
    expect(r.args).toEqual(['about.txt'])
  })

  it('parses long flags with value', () => {
    const r = parseInput('theme --name dracula')
    expect(r.flags['name']).toBe('dracula')
  })

  it('parses boolean flags', () => {
    const r = parseInput('projects --all')
    expect(r.flags['all']).toBe(true)
  })

  it('parses short flags', () => {
    const r = parseInput('resume -d')
    expect(r.flags['d']).toBe(true)
  })

  it('handles quoted args', () => {
    const r = parseInput('echo "hello world"')
    expect(r.args).toEqual(['hello world'])
  })

  it('normalizes command to lowercase', () => {
    const r = parseInput('WHOAMI')
    expect(r.command).toBe('whoami')
  })

  it('returns empty for blank input', () => {
    const r = parseInput('   ')
    expect(r.command).toBe('')
  })
})
