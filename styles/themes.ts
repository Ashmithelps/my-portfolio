export interface Theme {
  name: string
  label: string
  bodyBg: string   // desktop backdrop behind the floating card
  bg: string
  surface: string  // title bar, input bar
  text: string
  textDim: string  // secondary / muted
  textBright: string
  prompt: string   // THE signature accent — prompt $, logo, headers
  promptHost: string
  promptPath: string
  promptSuffix: string
  success: string
  error: string
  warning: string
  link: string
  cursor: string
  selection: string
  border: string
}

export const themes: Record<string, Theme> = {
  // ── Onyx (amber accent on near-black) — default ───────────────────────────
  onyx: {
    name: 'onyx',
    label: 'Onyx',
    bodyBg: '#070608',
    bg: '#0D0D0F',
    surface: '#131218',
    text: '#E2DFE8',
    textDim: '#857F96',
    textBright: '#F0EDF5',
    prompt: '#E0A458',       // amber — signature accent
    promptHost: '#857F96',   // muted
    promptPath: '#7AB893',   // sage for cwd path
    promptSuffix: '#524D61', // very dim for $
    success: '#7AB893',
    error: '#C96060',
    warning: '#D4804A',
    link: '#6B9FBF',
    cursor: '#E0A458',
    selection: '#1C1A23',
    border: '#252330',
  },

  // ── Phosphor (classic green CRT) ──────────────────────────────────────────
  phosphor: {
    name: 'phosphor',
    label: 'Phosphor',
    bodyBg: '#020402',
    bg: '#060806',
    surface: '#0A0F0A',
    text: '#90D888',
    textDim: '#4A7844',
    textBright: '#B8F0B0',
    prompt: '#50E040',
    promptHost: '#4A7844',
    promptPath: '#50E040',
    promptSuffix: '#284026',
    success: '#50E040',
    error: '#D05050',
    warning: '#C8B040',
    link: '#48C8C0',
    cursor: '#50E040',
    selection: '#0C1C0C',
    border: '#182818',
  },

  // ── Amber CRT (warm vintage terminal) ────────────────────────────────────
  amber: {
    name: 'amber',
    label: 'Amber CRT',
    bodyBg: '#080602',
    bg: '#0E0B07',
    surface: '#141008',
    text: '#E8C870',
    textDim: '#9A7E42',
    textBright: '#F5DC98',
    prompt: '#F0B038',
    promptHost: '#9A7E42',
    promptPath: '#F0B038',
    promptSuffix: '#5A4820',
    success: '#90B858',
    error: '#C85858',
    warning: '#E08838',
    link: '#68B8A0',
    cursor: '#F0B038',
    selection: '#201808',
    border: '#2A2010',
  },

  // ── Paper (warm light mode) ───────────────────────────────────────────────
  paper: {
    name: 'paper',
    label: 'Paper',
    bodyBg: '#DDD8CE',
    bg: '#F5F0E8',
    surface: '#EDE8DF',
    text: '#2A2520',
    textDim: '#7A7268',
    textBright: '#1A1510',
    prompt: '#8B4010',
    promptHost: '#7A7268',
    promptPath: '#3A6840',
    promptSuffix: '#AEA89E',
    success: '#3A6840',
    error: '#8B2020',
    warning: '#8B5800',
    link: '#2B5E8E',
    cursor: '#2A2520',
    selection: '#D8D2C8',
    border: '#D0C8BC',
  },
}

export const defaultTheme = 'onyx'
