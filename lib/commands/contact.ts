import type { Command, OutputLine } from '@/lib/shell/types'
import { profile } from '@/content/profile'

const contact: Command = {
  name: 'contact',
  aliases: [],
  description: 'Get in touch',
  usage: 'contact',
  handler() {
    const lines: OutputLine[] = [
      { type: 'text', value: "Let's connect!", className: 'text-bright' },
      { type: 'br' },
      { type: 'link', label: `  Email    → ${profile.email}`, href: `mailto:${profile.email}` },
    ]
    if (profile.github)
      lines.push({ type: 'link', label: `  GitHub   → github.com/${profile.github}`, href: `https://github.com/${profile.github}` })
    if (profile.linkedin)
      lines.push({ type: 'link', label: `  LinkedIn → linkedin.com/in/${profile.linkedin}`, href: `https://linkedin.com/in/${profile.linkedin}` })
    if (profile.twitter)
      lines.push({ type: 'link', label: `  Twitter  → @${profile.twitter}`, href: `https://twitter.com/${profile.twitter}` })
    if (profile.website)
      lines.push({ type: 'link', label: `  Website  → ${profile.website}`, href: profile.website })
    return lines
  },
}

export default contact
