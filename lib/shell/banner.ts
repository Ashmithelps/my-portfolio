import { profile } from '@/content/profile'
import type { OutputLine } from './types'

// Clean single-accent ANSI Shadow wordmark
const ASCII_NAME = `
 █████╗ ███████╗██╗  ██╗███╗   ███╗██╗████████╗
██╔══██╗██╔════╝██║  ██║████╗ ████║██║╚══██╔══╝
███████║███████╗███████║██╔████╔██║██║   ██║
██╔══██║╚════██║██╔══██║██║╚██╔╝██║██║   ██║
██║  ██║███████║██║  ██║██║ ╚═╝ ██║██║   ██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝`

// Pad label to fixed width for clean neofetch-style alignment
function info(label: string, value: string): OutputLine {
  return { type: 'text', value: `  ${label.padEnd(10)}${value}` }
}

export function getBannerLines(): OutputLine[] {
  return [
    { type: 'ascii', value: ASCII_NAME },
    { type: 'br' },
    { type: 'text', value: `  ${profile.name}`, className: 'text-bright' },
    { type: 'text', value: `  ${profile.role}`, className: 'text-dim' },
    { type: 'text', value: '  ──────────────────────────────────────', className: 'text-dim' },
    { type: 'br' },
    info('os',       'PortfolioOS v1.0.0'),
    info('host',     profile.promptHost),
    info('location', profile.location),
    info('shell',    'portfoliosh 1.0.0'),
    info('uptime',   '2nd year of 4'),
    { type: 'br' },
    { type: 'success', value: "  type 'help' to explore, or tap a shortcut below  ›" },
    { type: 'br' },
  ]
}
