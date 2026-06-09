import type { Command, OutputLine } from '@/lib/shell/types'
import { profile } from '@/content/profile'

const contact: Command = {
  name: 'contact',
  aliases: [],
  description: 'Get in touch',
  usage: 'contact',
  handler() {
    const lines: OutputLine[] = [
      { type: 'text', value: 'contact', className: 'header' },
      { type: 'text', value: '────────────────────────────────────────', className: 'text-dim' },
      { type: 'br' },
      { type: 'link', label: `  email       ${profile.email}`, href: `mailto:${profile.email}` },
    ]
    if (profile.github)
      lines.push({ type: 'link', label: `  github      github.com/${profile.github}`, href: `https://github.com/${profile.github}` })
    if (profile.linkedin)
      lines.push({ type: 'link', label: `  linkedin    linkedin.com/in/${profile.linkedin}`, href: `https://linkedin.com/in/${profile.linkedin}` })
    if (profile.twitter)
      lines.push({ type: 'link', label: `  twitter     @${profile.twitter}`, href: `https://twitter.com/${profile.twitter}` })
    if (profile.website)
      lines.push({ type: 'link', label: `  website     ${profile.website}`, href: profile.website })
    lines.push({ type: 'br' })
    lines.push({ type: 'text', value: `  location    ${profile.location}`, className: 'text-dim' })
    return lines
  },
}

export default contact
