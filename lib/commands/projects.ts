import type { Command, OutputLine } from '@/lib/shell/types'
import { projects } from '@/content/projects'

const projectsCmd: Command = {
  name: 'projects',
  aliases: [],
  description: 'List my projects',
  usage: 'projects [--all]',
  handler({ flags }) {
    const showAll = flags['all'] === true
    const list = showAll ? projects : projects.filter((p) => p.highlight)

    const lines: OutputLine[] = [
      { type: 'text', value: 'projects', className: 'header' },
      { type: 'text', value: '────────────────────────────────────────', className: 'text-dim' },
      { type: 'br' },
    ]

    list.forEach((p) => {
      lines.push({ type: 'text', value: `  ${p.name}${p.year ? `  (${p.year})` : ''}`, className: 'text-bright' })
      lines.push({ type: 'text', value: `  ${p.description}` })
      lines.push({ type: 'text', value: `  ${p.tech.join(' · ')}`, className: 'text-dim' })
      if (p.url)  lines.push({ type: 'link', label: `  live  →  ${p.url}`,  href: p.url })
      if (p.repo) lines.push({ type: 'link', label: `  repo  →  ${p.repo}`, href: p.repo })
      lines.push({ type: 'br' })
    })

    const slug0 = list[0]?.name.toLowerCase().replace(/\s+/g, '-')
    lines.push({
      type: 'text',
      value: `  cat projects/${slug0}.txt for full detail  ·  --all to show all`,
      className: 'text-dim',
    })
    return lines
  },
}

export default projectsCmd
