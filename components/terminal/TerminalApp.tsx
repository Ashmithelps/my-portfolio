'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import type { HistoryEntry, ShellState } from '@/lib/shell/types'
import { loadState, saveState, executeCommand, pushHistory } from '@/lib/shell/shell'
import { themes } from '@/styles/themes'
import { getBannerLines } from '@/lib/shell/banner'
import { registry } from '@/lib/commands/index'
import { vfs } from '@/lib/vfs/instance'
import { profile } from '@/content/profile'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import QuickChips from './QuickChips'

const BOOT_ENTRY: HistoryEntry = {
  input: '',
  output: getBannerLines(),
  timestamp: 0,
}

// Konami code
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function TerminalApp() {
  const [shellState, setShellState] = useState<ShellState>(() => loadState())
  const [entries, setEntries] = useState<HistoryEntry[]>([BOOT_ENTRY])
  const [inputValue, setInputValue] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [running, setRunning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const konamiRef = useRef<string[]>([])

  const theme = themes[shellState.theme] ?? themes.dracula

  useEffect(() => {
    saveState(shellState)
  }, [shellState])

  // Click anywhere to focus input
  const focusInput = useCallback(() => {
    const input = containerRef.current?.querySelector('input')
    input?.focus()
  }, [])

  // Konami code listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      konamiRef.current.push(e.key)
      konamiRef.current = konamiRef.current.slice(-KONAMI.length)
      if (konamiRef.current.join(',') === KONAMI.join(',')) {
        handleRun('matrix')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  const handleRun = useCallback(async (input: string) => {
    const trimmed = input.trim()
    if (!trimmed || running) return

    setRunning(true)
    setInputValue('')
    setHistoryIndex(-1)

    const newState = pushHistory(shellState, trimmed)

    let cleared = false
    let newCwd = newState.cwd
    let newTheme = newState.theme

    const output = await executeCommand(
      trimmed,
      newState,
      () => { cleared = true },
      (cwd) => { newCwd = cwd },
      (t) => { newTheme = t }
    )

    const updatedState: ShellState = {
      ...newState,
      cwd: newCwd,
      theme: newTheme,
    }

    setShellState(updatedState)

    if (cleared) {
      setEntries([])
    } else {
      const entry: HistoryEntry = { input: trimmed, output, timestamp: Date.now() }
      setEntries((prev) => [...prev, entry])
    }
    setRunning(false)
  }, [shellState, running])

  const handleHistoryUp = useCallback(() => {
    const history = shellState.history
    if (history.length === 0) return
    const newIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
    setHistoryIndex(newIdx)
    setInputValue(history[newIdx])
  }, [shellState.history, historyIndex])

  const handleHistoryDown = useCallback(() => {
    if (historyIndex === -1) return
    const history = shellState.history
    const newIdx = historyIndex + 1
    if (newIdx >= history.length) {
      setHistoryIndex(-1)
      setInputValue('')
    } else {
      setHistoryIndex(newIdx)
      setInputValue(history[newIdx])
    }
  }, [shellState.history, historyIndex])

  const handleTab = useCallback((value: string): string => {
    const tokens = value.split(' ')
    const last = tokens[tokens.length - 1]

    if (tokens.length === 1) {
      const matches = registry.completions(last)
      if (matches.length === 1) return matches[0]
      if (matches.length > 1) {
        const entry: HistoryEntry = {
          input: '',
          output: [{ type: 'text', value: matches.join('  '), className: 'text-dim' }],
          timestamp: Date.now(),
        }
        setEntries((prev) => [...prev, entry])
      }
      return value
    }

    // Filesystem completion
    const fsPaths = vfs.completions(last, shellState.cwd)
    if (fsPaths.length === 1) {
      return [...tokens.slice(0, -1), fsPaths[0]].join(' ')
    }
    if (fsPaths.length > 1) {
      const entry: HistoryEntry = {
        input: '',
        output: [{ type: 'text', value: fsPaths.join('  '), className: 'text-dim' }],
        timestamp: Date.now(),
      }
      setEntries((prev) => [...prev, entry])
    }
    return value
  }, [shellState.cwd])

  const promptStr = `${profile.promptUser}@${profile.promptHost}:${shellState.cwd}$ `

  return (
    <div
      ref={containerRef}
      onClick={focusInput}
      className="flex flex-col h-full w-full overflow-hidden cursor-text select-auto"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-4 py-2 shrink-0 select-none"
        style={{ backgroundColor: theme.surface, borderBottom: `1px solid ${theme.border}` }}
      >
        <div className="flex gap-2 mr-4">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} aria-hidden="true" />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#febc2e' }} aria-hidden="true" />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28c840' }} aria-hidden="true" />
        </div>
        <span className="font-mono text-xs" style={{ color: theme.textDim }}>
          {profile.promptHost} — terminal
        </span>
      </div>

      <TerminalOutput entries={entries} theme={theme} prompt={promptStr} />
      <QuickChips onCommand={handleRun} theme={theme} />
      <TerminalInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleRun}
        onHistoryUp={handleHistoryUp}
        onHistoryDown={handleHistoryDown}
        onTab={handleTab}
        prompt={promptStr}
        theme={theme}
        disabled={running}
      />
    </div>
  )
}
