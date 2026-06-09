import type { VFSDir } from './types'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { skills } from '@/content/skills'
import { experience, education, achievements } from '@/content/resume'

function buildAboutContent(): string {
  return [
    `Name:     ${profile.name}`,
    `Role:     ${profile.role}`,
    `Location: ${profile.location}`,
    `Email:    ${profile.email}`,
    '',
    profile.bio,
  ].join('\n')
}

function buildResumeContent(): string {
  const lines: string[] = ['═══ RÉSUMÉ ═══', '']

  lines.push('── EXPERIENCE ──')
  for (const job of experience) {
    lines.push(`\n${job.role} @ ${job.company}`)
    lines.push(`${job.period}`)
    for (const b of job.bullets) lines.push(`  • ${b}`)
  }

  lines.push('\n── EDUCATION ──')
  for (const edu of education) {
    lines.push(`${edu.degree} — ${edu.institution} (${edu.period}${edu.detail ? `, ${edu.detail}` : ''})`)
  }

  lines.push('\n── ACHIEVEMENTS ──')
  for (const a of achievements) lines.push(`  • ${a}`)

  lines.push(`\nDownload PDF: ${profile.resumeUrl}`)
  return lines.join('\n')
}

function buildSkillsContent(): string {
  return skills.map((cat) => `${cat.category}:\n  ${cat.items.join(', ')}`).join('\n\n')
}

function buildContactContent(): string {
  return [
    `Email:    ${profile.email}`,
    profile.github ? `GitHub:   https://github.com/${profile.github}` : null,
    profile.linkedin ? `LinkedIn: https://linkedin.com/in/${profile.linkedin}` : null,
    profile.twitter ? `Twitter:  https://twitter.com/${profile.twitter}` : null,
    profile.website ? `Website:  ${profile.website}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

export function buildVFSTree(): VFSDir {
  const projectChildren: Record<string, VFSDir['children'][string]> = {}
  for (const p of projects) {
    const slug = p.name.toLowerCase().replace(/\s+/g, '-')
    const content = [
      `Project: ${p.name}`,
      `Year:    ${p.year ?? 'N/A'}`,
      `Stack:   ${p.tech.join(', ')}`,
      '',
      p.longDescription ?? p.description,
      '',
      p.url ? `Live:    ${p.url}` : null,
      p.repo ? `Repo:    ${p.repo}` : null,
    ]
      .filter((l) => l !== null)
      .join('\n')

    projectChildren[`${slug}.txt`] = {
      kind: 'file',
      name: `${slug}.txt`,
      content,
      description: p.description,
    }
  }

  return {
    kind: 'dir',
    name: '/',
    children: {
      'about.txt': {
        kind: 'file',
        name: 'about.txt',
        content: buildAboutContent,
        description: 'About me',
      },
      'resume.txt': {
        kind: 'file',
        name: 'resume.txt',
        content: buildResumeContent,
        description: 'Résumé / CV',
      },
      'skills.txt': {
        kind: 'file',
        name: 'skills.txt',
        content: buildSkillsContent,
        description: 'Technical skills',
      },
      'contact.txt': {
        kind: 'file',
        name: 'contact.txt',
        content: buildContactContent,
        description: 'Contact information',
      },
      projects: {
        kind: 'dir',
        name: 'projects',
        description: 'My projects',
        children: projectChildren,
      },
    },
  }
}
