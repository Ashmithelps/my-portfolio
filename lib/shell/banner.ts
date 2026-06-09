import { profile } from '@/content/profile'
import type { OutputLine } from './types'

const ASCII_NAME = `
 █████╗ ███████╗██╗  ██╗███╗   ███╗██╗████████╗
██╔══██╗██╔════╝██║  ██║████╗ ████║██║╚══██╔══╝
███████║███████╗███████║██╔████╔██║██║   ██║
██╔══██║╚════██║██╔══██║██║╚██╔╝██║██║   ██║
██║  ██║███████║██║  ██║██║ ╚═╝ ██║██║   ██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝
`

export function getBannerLines(): OutputLine[] {
  return [
    { type: 'ascii', value: ASCII_NAME },
    { type: 'text', value: `  ${profile.name} — ${profile.role}`, className: 'text-bright' },
    { type: 'text', value: `  ${profile.tagline}`, className: 'text-dim' },
    { type: 'br' },
    { type: 'text', value: '  OS:       PortfolioOS v1.0.0' },
    { type: 'text', value: `  Host:     ${profile.promptHost}` },
    { type: 'text', value: `  Location: ${profile.location}` },
    { type: 'br' },
    {
      type: 'success',
      value: "  Type 'help' to see all commands, or tap a chip below to jump straight in.",
    },
    { type: 'br' },
  ]
}
