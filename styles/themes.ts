export interface Theme {
  name: string
  label: string
  bg: string
  surface: string
  text: string
  textDim: string
  textBright: string
  prompt: string
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
  dracula: {
    name: 'dracula',
    label: 'Dracula',
    bg: '#282a36',
    surface: '#21222c',
    text: '#f8f8f2',
    textDim: '#6272a4',
    textBright: '#ffffff',
    prompt: '#ff79c6',
    promptHost: '#bd93f9',
    promptPath: '#50fa7b',
    promptSuffix: '#f8f8f2',
    success: '#50fa7b',
    error: '#ff5555',
    warning: '#ffb86c',
    link: '#8be9fd',
    cursor: '#f8f8f2',
    selection: '#44475a',
    border: '#44475a',
  },
  gruvbox: {
    name: 'gruvbox',
    label: 'Gruvbox Dark',
    bg: '#282828',
    surface: '#1d2021',
    text: '#ebdbb2',
    textDim: '#928374',
    textBright: '#fbf1c7',
    prompt: '#fe8019',
    promptHost: '#d3869b',
    promptPath: '#b8bb26',
    promptSuffix: '#ebdbb2',
    success: '#b8bb26',
    error: '#fb4934',
    warning: '#fabd2f',
    link: '#83a598',
    cursor: '#ebdbb2',
    selection: '#3c3836',
    border: '#504945',
  },
  nord: {
    name: 'nord',
    label: 'Nord',
    bg: '#2e3440',
    surface: '#242933',
    text: '#d8dee9',
    textDim: '#4c566a',
    textBright: '#eceff4',
    prompt: '#88c0d0',
    promptHost: '#81a1c1',
    promptPath: '#a3be8c',
    promptSuffix: '#d8dee9',
    success: '#a3be8c',
    error: '#bf616a',
    warning: '#ebcb8b',
    link: '#88c0d0',
    cursor: '#d8dee9',
    selection: '#3b4252',
    border: '#3b4252',
  },
  matrix: {
    name: 'matrix',
    label: 'Matrix',
    bg: '#0d0d0d',
    surface: '#000000',
    text: '#00ff41',
    textDim: '#007a1f',
    textBright: '#80ff80',
    prompt: '#00ff41',
    promptHost: '#00cc33',
    promptPath: '#00ff41',
    promptSuffix: '#80ff80',
    success: '#00ff41',
    error: '#ff0000',
    warning: '#ffff00',
    link: '#00ffff',
    cursor: '#00ff41',
    selection: '#003300',
    border: '#004400',
  },
  light: {
    name: 'light',
    label: 'Light',
    bg: '#fafafa',
    surface: '#f0f0f0',
    text: '#1a1a1a',
    textDim: '#666666',
    textBright: '#000000',
    prompt: '#c7254e',
    promptHost: '#0070c1',
    promptPath: '#2d7a2d',
    promptSuffix: '#1a1a1a',
    success: '#2d7a2d',
    error: '#cc0000',
    warning: '#b36b00',
    link: '#0070c1',
    cursor: '#1a1a1a',
    selection: '#cce7ff',
    border: '#dddddd',
  },
}

export const defaultTheme = 'dracula'
