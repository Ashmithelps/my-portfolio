import type { Command, OutputLine } from '@/lib/shell/types'
import { profile } from '@/content/profile'

const socials: Command = {
  name: 'socials',
  aliases: ['links'],
  description: 'My social links',
  usage: 'socials',
  handler() {
    const lines: OutputLine[] = [{ type: 'text', value: 'Social Links', className: 'text-bright' }, { type: 'br' }]
    if (profile.github)
      lines.push({ type: 'link', label: `  GitHub    github.com/${profile.github}`, href: `https://github.com/${profile.github}` })
    if (profile.linkedin)
      lines.push({ type: 'link', label: `  LinkedIn  linkedin.com/in/${profile.linkedin}`, href: `https://linkedin.com/in/${profile.linkedin}` })
    if (profile.twitter)
      lines.push({ type: 'link', label: `  Twitter   twitter.com/${profile.twitter}`, href: `https://twitter.com/${profile.twitter}` })
    if (profile.website)
      lines.push({ type: 'link', label: `  Website   ${profile.website}`, href: profile.website })
    return lines
  },
}

export default socials
