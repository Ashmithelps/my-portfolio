import type { Command } from './types'

export class CommandRegistry {
  private commands: Map<string, Command> = new Map()
  private aliases: Map<string, string> = new Map()

  register(command: Command): void {
    this.commands.set(command.name, command)
    for (const alias of command.aliases) {
      this.aliases.set(alias, command.name)
    }
  }

  resolve(name: string): Command | null {
    const direct = this.commands.get(name)
    if (direct) return direct
    const aliased = this.aliases.get(name)
    if (aliased) return this.commands.get(aliased) ?? null
    return null
  }

  suggest(name: string): string | null {
    const all = this.allNames()
    let best: string | null = null
    let bestDist = Infinity
    for (const candidate of all) {
      const d = levenshtein(name, candidate)
      if (d < bestDist && d <= 3) {
        bestDist = d
        best = candidate
      }
    }
    return best
  }

  allCommands(): Command[] {
    return Array.from(this.commands.values())
  }

  allNames(): string[] {
    return [
      ...Array.from(this.commands.keys()),
      ...Array.from(this.aliases.keys()),
    ]
  }

  completions(partial: string): string[] {
    return this.allNames().filter((n) => n.startsWith(partial)).sort()
  }
}

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}
