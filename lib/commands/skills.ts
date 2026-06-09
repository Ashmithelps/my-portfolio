import type { Command, OutputLine } from '@/lib/shell/types'
import { skills } from '@/content/skills'

const skillsCmd: Command = {
  name: 'skills',
  aliases: ['stack'],
  description: 'My technical skills',
  usage: 'skills',
  handler() {
    const lines: OutputLine[] = [
      { type: 'text', value: 'Technical Skills', className: 'text-bright' },
      { type: 'br' },
    ]
    for (const cat of skills) {
      lines.push({ type: 'text', value: `  ${cat.category}`, className: 'text-bright' })
      lines.push({ type: 'text', value: `    ${cat.items.join(' · ')}` })
      lines.push({ type: 'br' })
    }
    return lines
  },
}

export default skillsCmd
