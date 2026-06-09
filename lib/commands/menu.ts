import type { Command, OutputLine } from '@/lib/shell/types'
import { profile } from '@/content/profile'

const menu: Command = {
  name: 'menu',
  aliases: [],
  description: 'Quick-access menu for all content',
  usage: 'menu',
  handler() {
    const lines: OutputLine[] = [
      { type: 'text', value: `Welcome to ${profile.name}'s portfolio`, className: 'text-bright' },
      { type: 'br' },
      { type: 'text', value: 'Quick navigation:', className: 'text-dim' },
      { type: 'br' },
      { type: 'text', value: '  whoami       → About me' },
      { type: 'text', value: '  projects     → My projects' },
      { type: 'text', value: '  skills       → Technical skills' },
      { type: 'text', value: '  resume       → Work history & education' },
      { type: 'text', value: '  contact      → How to reach me' },
      { type: 'text', value: '  socials      → Social links' },
      { type: 'br' },
      { type: 'text', value: '  ls           → Browse the filesystem' },
      { type: 'text', value: '  tree         → Filesystem overview' },
      { type: 'text', value: '  theme        → Change color theme' },
      { type: 'text', value: '  help         → All commands' },
      { type: 'br' },
      { type: 'link', label: `  ↓ Download Résumé`, href: profile.resumeUrl },
      { type: 'link', label: `  Email: ${profile.email}`, href: `mailto:${profile.email}` },
    ]
    return lines
  },
}

export default menu
