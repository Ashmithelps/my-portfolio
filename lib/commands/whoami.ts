import type { Command } from '@/lib/shell/types'
import { profile } from '@/content/profile'

const whoami: Command = {
  name: 'whoami',
  aliases: ['about'],
  description: 'About me',
  usage: 'whoami',
  handler() {
    return [
      { type: 'text', value: profile.name, className: 'header' },
      { type: 'text', value: profile.role, className: 'text-dim' },
      { type: 'br' },
      { type: 'text', value: profile.bio },
      { type: 'br' },
      { type: 'text', value: `  location    ${profile.location}`, className: 'text-dim' },
      { type: 'text', value: `  email       ${profile.email}`, className: 'text-dim' },
      { type: 'br' },
      { type: 'text', value: "  run 'contact' to reach me, or 'resume' for full history.", className: 'text-dim' },
    ]
  },
}

export default whoami
