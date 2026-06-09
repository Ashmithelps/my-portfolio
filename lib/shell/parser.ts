import type { ParsedInput } from './types'

export function parseInput(raw: string): ParsedInput {
  const trimmed = raw.trim()
  if (!trimmed) {
    return { raw, command: '', args: [], flags: {} }
  }

  const tokens = tokenize(trimmed)
  const [command, ...rest] = tokens
  const args: string[] = []
  const flags: Record<string, string | boolean> = {}

  let i = 0
  while (i < rest.length) {
    const token = rest[i]
    if (token.startsWith('--')) {
      const key = token.slice(2)
      if (i + 1 < rest.length && !rest[i + 1].startsWith('-')) {
        flags[key] = rest[i + 1]
        i += 2
      } else {
        flags[key] = true
        i++
      }
    } else if (token.startsWith('-') && token.length === 2) {
      const key = token.slice(1)
      if (i + 1 < rest.length && !rest[i + 1].startsWith('-')) {
        flags[key] = rest[i + 1]
        i += 2
      } else {
        flags[key] = true
        i++
      }
    } else {
      args.push(token)
      i++
    }
  }

  return { raw, command: command.toLowerCase(), args, flags }
}

function tokenize(input: string): string[] {
  const tokens: string[] = []
  let current = ''
  let inSingle = false
  let inDouble = false

  for (let i = 0; i < input.length; i++) {
    const ch = input[i]
    if (ch === "'" && !inDouble) {
      inSingle = !inSingle
    } else if (ch === '"' && !inSingle) {
      inDouble = !inDouble
    } else if (ch === ' ' && !inSingle && !inDouble) {
      if (current) {
        tokens.push(current)
        current = ''
      }
    } else {
      current += ch
    }
  }
  if (current) tokens.push(current)
  return tokens
}
