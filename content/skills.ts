// ─── EDIT THIS FILE to update your skills ────────────────────────────────────

export interface SkillCategory {
  category: string
  items: string[]
}

export const skills: SkillCategory[] = [
  // [PLACEHOLDER] Replace with your actual skills
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'gRPC'],
  },
  {
    category: 'Infrastructure',
    items: ['AWS', 'Docker', 'Kubernetes', 'Vercel', 'GitHub Actions'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Vim', 'Figma', 'Linear'],
  },
]
