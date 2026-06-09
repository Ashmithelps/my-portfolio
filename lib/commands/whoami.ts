import type { Command } from '@/lib/shell/types'
import { profile } from '@/content/profile'

const whoami: Command = {
  name: 'whoami',
  aliases: ['about'],
  description: 'About me',
  usage: 'whoami',
  handler() {
    return [
      { type: 'text', value: profile.name, className: 'text-bright' },
      { type: 'text', value: profile.role, className: 'text-dim' },
      { type: 'br' },
      { type: 'text', value: profile.bio },
      { type: 'br' },
      { type: 'text', value: `📍 ${profile.location}`, className: 'text-dim' },
      { type: 'br' },
      { type: 'text', value: "Run 'cat about.txt' for more, or 'contact' to reach me." },
    ]
  },
}

export default whoami
