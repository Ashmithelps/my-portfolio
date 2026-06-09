export type OutputLineType =
  | 'text'
  | 'link'
  | 'ascii'
  | 'br'
  | 'error'
  | 'success'
  | 'warning'
  | 'command-echo'

export interface TextLine {
  type: 'text'
  value: string
  className?: string
}

export interface LinkLine {
  type: 'link'
  label: string
  href: string
  className?: string
}

export interface AsciiLine {
  type: 'ascii'
  value: string
}

export interface BrLine {
  type: 'br'
}

export interface ErrorLine {
  type: 'error'
  value: string
}

export interface SuccessLine {
  type: 'success'
  value: string
}

export interface WarningLine {
  type: 'warning'
  value: string
}

export interface CommandEchoLine {
  type: 'command-echo'
  value: string
}

export type OutputLine =
  | TextLine
  | LinkLine
  | AsciiLine
  | BrLine
  | ErrorLine
  | SuccessLine
  | WarningLine
  | CommandEchoLine

export interface ParsedInput {
  raw: string
  command: string
  args: string[]
  flags: Record<string, string | boolean>
}

export interface ShellContext {
  cwd: string
  history: string[]
  theme: string
  env: Record<string, string>
  setCwd: (path: string) => void
  setTheme: (name: string) => void
  clearOutput: () => void
}

export interface Command {
  name: string
  aliases: string[]
  description: string
  usage: string
  hidden?: boolean
  handler: (
    parsed: ParsedInput,
    shell: ShellContext
  ) => OutputLine[] | Promise<OutputLine[]>
}

export interface ShellState {
  cwd: string
  history: string[]
  theme: string
  env: Record<string, string>
}

export interface HistoryEntry {
  input: string
  output: OutputLine[]
  timestamp: number
}
