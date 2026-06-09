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
      return [{ type: 'success', value: `  downloading ${profile.resumeUrl}…` }]
    }

    const lines: OutputLine[] = [
      { type: 'text', value: 'resume', className: 'header' },
      { type: 'text', value: '────────────────────────────────────────', className: 'text-dim' },
      { type: 'br' },
      { type: 'text', value: '  experience', className: 'text-bright' },
      { type: 'br' },
    ]

    for (const job of experience) {
      lines.push({ type: 'text', value: `  ${job.role}`, className: 'text-bright' })
      lines.push({ type: 'text', value: `  ${job.company}  ·  ${job.period}`, className: 'text-dim' })
      for (const b of job.bullets) {
        lines.push({ type: 'text', value: `    · ${b}` })
      }
      lines.push({ type: 'br' })
    }

    lines.push({ type: 'text', value: '  education', className: 'text-bright' })
    lines.push({ type: 'br' })
    for (const edu of education) {
      lines.push({ type: 'text', value: `  ${edu.degree}`, className: 'text-bright' })
      lines.push({
        type: 'text',
        value: `  ${edu.institution}  ·  ${edu.period}${edu.detail ? `  ·  ${edu.detail}` : ''}`,
        className: 'text-dim',
      })
      lines.push({ type: 'br' })
    }

    lines.push({ type: 'text', value: '  achievements', className: 'text-bright' })
    lines.push({ type: 'br' })
    for (const a of achievements) {
      lines.push({ type: 'text', value: `    · ${a}` })
    }

    lines.push({ type: 'br' })
    lines.push({ type: 'text', value: '────────────────────────────────────────', className: 'text-dim' })
    lines.push({ type: 'link', label: `  download PDF  →  ${profile.resumeUrl}`, href: profile.resumeUrl })
    lines.push({ type: 'text', value: "  or run: resume --download", className: 'text-dim' })

    return lines
  },
}

export default resumeCmd
