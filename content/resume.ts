// ─── EDIT THIS FILE to update your résumé content ────────────────────────────

export interface Experience {
  company: string
  role: string
  period: string
  bullets: string[]
}

export interface Education {
  institution: string
  degree: string
  period: string
}

export const experience: Experience[] = [
  // [PLACEHOLDER] Replace with your real experience
  {
    company: '[PLACEHOLDER] Acme Corp',
    role: 'Senior Software Engineer',
    period: '2022 – Present',
    bullets: [
      '[PLACEHOLDER] Led migration of monolith to microservices, reducing p99 latency by 40%.',
      '[PLACEHOLDER] Built real-time data pipeline processing 50k events/sec.',
      '[PLACEHOLDER] Mentored 3 junior engineers.',
    ],
  },
  {
    company: '[PLACEHOLDER] Startup Inc',
    role: 'Software Engineer',
    period: '2020 – 2022',
    bullets: [
      '[PLACEHOLDER] Shipped core product features used by 10k daily active users.',
      '[PLACEHOLDER] Owned the entire frontend (React + TypeScript).',
    ],
  },
]

export const education: Education[] = [
  {
    institution: '[PLACEHOLDER] University of X',
    degree: 'B.S. Computer Science',
    period: '2016 – 2020',
  },
]
