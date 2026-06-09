import type { ShellState, OutputLine, HistoryEntry } from './types'
import { parseInput } from './parser'
import { registry } from '@/lib/commands/index'
import { defaultTheme } from '@/styles/themes'

const STORAGE_KEY = 'portfolio-shell-state'
const MAX_HISTORY = 200

export function loadState(): ShellState {
  if (typeof window === 'undefined') {
    return { cwd: '/', history: [], theme: defaultTheme, env: {} }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultShellState(), ...JSON.parse(raw) }
  } catch {}
  return defaultShellState()
}

export function saveState(state: ShellState): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

function defaultShellState(): ShellState {
  return { cwd: '/', history: [], theme: defaultTheme, env: {} }
}

export async function executeCommand(
  input: string,
  state: ShellState,
  onClear: () => void,
  onCwdChange: (cwd: string) => void,
  onThemeChange: (theme: string) => void
): Promise<OutputLine[]> {
  const parsed = parseInput(input)

  if (!parsed.command) return []

  const cmd = registry.resolve(parsed.command)

  if (!cmd) {
    const suggestion = registry.suggest(parsed.command)
    const lines: OutputLine[] = [
      { type: 'error', value: `command not found: ${parsed.command}` },
    ]
    if (suggestion) {
      lines.push({ type: 'text', value: `Did you mean: ${suggestion}?`, className: 'text-dim' })
    }
    lines.push({ type: 'text', value: "Type 'help' for a list of commands.", className: 'text-dim' })
    return lines
  }

  const shellCtx = {
    cwd: state.cwd,
    history: state.history,
    theme: state.theme,
    env: state.env,
    clearOutput: onClear,
    setCwd: onCwdChange,
    setTheme: onThemeChange,
  }

  try {
    const result = cmd.handler(parsed, shellCtx)
    return result instanceof Promise ? await result : result
  } catch (err) {
    return [{ type: 'error', value: `${parsed.command}: unexpected error — ${String(err)}` }]
  }
}

export function pushHistory(state: ShellState, input: string): ShellState {
  const trimmed = input.trim()
  if (!trimmed) return state
  const last = state.history[state.history.length - 1]
  if (last === trimmed) return state // no duplicates
  const history = [...state.history, trimmed].slice(-MAX_HISTORY)
  return { ...state, history }
}
