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
      { type: 'text', value: 'Projects', className: 'text-bright' },
      { type: 'br' },
    ]
    list.forEach((p, i) => {
      lines.push({ type: 'text', value: `  ${String(i + 1).padStart(2)}. ${p.name}${p.year ? ` (${p.year})` : ''}`, className: 'text-bright' })
      lines.push({ type: 'text', value: `      ${p.description}` })
      lines.push({ type: 'text', value: `      Stack: ${p.tech.join(', ')}`, className: 'text-dim' })
      if (p.url) lines.push({ type: 'link', label: `      Live → ${p.url}`, href: p.url })
      if (p.repo) lines.push({ type: 'link', label: `      Repo → ${p.repo}`, href: p.repo })
      lines.push({ type: 'br' })
    })
    const slug0 = list[0]?.name.toLowerCase().replace(/\s+/g, '-')
    lines.push({
      type: 'text',
      value: `Tip: cat projects/${slug0}.txt for details. Use --all to show all projects.`,
      className: 'text-dim',
    })
    return lines
  },
}

export default projectsCmd
