import type { Command, OutputLine } from '@/lib/shell/types'
import { profile } from '@/content/profile'

const socials: Command = {
  name: 'socials',
  aliases: ['links'],
  description: 'My social links',
  usage: 'socials',
  handler() {
    const lines: OutputLine[] = [
      { type: 'text', value: 'socials', className: 'header' },
      { type: 'text', value: '────────────────────────────────────────', className: 'text-dim' },
      { type: 'br' },
    ]
    if (profile.github)
      lines.push({ type: 'link', label: `  github      github.com/${profile.github}`, href: `https://github.com/${profile.github}` })
    if (profile.linkedin)
      lines.push({ type: 'link', label: `  linkedin    linkedin.com/in/${profile.linkedin}`, href: `https://linkedin.com/in/${profile.linkedin}` })
    if (profile.twitter)
      lines.push({ type: 'link', label: `  twitter     @${profile.twitter}`, href: `https://twitter.com/${profile.twitter}` })
    if (profile.website)
      lines.push({ type: 'link', label: `  website     ${profile.website}`, href: profile.website })
    return lines
  },
}

export default socials
