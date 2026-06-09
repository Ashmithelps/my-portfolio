import type { Command, OutputLine } from '@/lib/shell/types'
import { profile } from '@/content/profile'
import { experience, education, achievements } from '@/content/resume'

const resumeCmd: Command = {
  name: 'resume',
  aliases: ['cv'],
  description: 'View résumé or download PDF',
  usage: 'resume [--download]',
  handler({ flags }) {
    if (flags['download'] || flags['d']) {
      if (typeof window !== 'undefined') {
        const a = document.createElement('a')
        a.href = profile.resumeUrl
        a.download = 'resume.pdf'
        a.click()
      }
      return [{ type: 'success', value: `Downloading ${profile.resumeUrl}…` }]
    }

    const lines: OutputLine[] = [
      { type: 'text', value: '═══ RÉSUMÉ ═══', className: 'text-bright' },
      { type: 'br' },
      { type: 'text', value: 'EXPERIENCE', className: 'text-bright' },
    ]

    for (const job of experience) {
      lines.push({ type: 'br' })
      lines.push({ type: 'text', value: `  ${job.role}`, className: 'text-bright' })
      lines.push({ type: 'text', value: `  ${job.company} · ${job.period}`, className: 'text-dim' })
      for (const b of job.bullets) {
        lines.push({ type: 'text', value: `    • ${b}` })
      }
    }

    lines.push({ type: 'br' })
    lines.push({ type: 'text', value: 'EDUCATION', className: 'text-bright' })
    for (const edu of education) {
      lines.push({ type: 'br' })
      lines.push({ type: 'text', value: `  ${edu.degree}`, className: 'text-bright' })
      lines.push({
        type: 'text',
        value: `  ${edu.institution} · ${edu.period}${edu.detail ? ` · ${edu.detail}` : ''}`,
        className: 'text-dim',
      })
    }

    lines.push({ type: 'br' })
    lines.push({ type: 'text', value: 'ACHIEVEMENTS', className: 'text-bright' })
    lines.push({ type: 'br' })
    for (const a of achievements) {
      lines.push({ type: 'text', value: `  • ${a}` })
    }

    lines.push({ type: 'br' })
    lines.push({ type: 'link', label: `  ↓ Download PDF`, href: profile.resumeUrl })
    lines.push({ type: 'text', value: "  Or run: resume --download", className: 'text-dim' })

    return lines
  },
}

export default resumeCmd
