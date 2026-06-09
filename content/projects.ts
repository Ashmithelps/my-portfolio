// ─── EDIT THIS FILE to add / update your projects ────────────────────────────

export interface Project {
  name: string
  description: string
  longDescription?: string
  tech: string[]
  url?: string
  repo?: string
  highlight: boolean  // show in `projects` summary; set false to hide
  year?: number
}

export const projects: Project[] = [
  // [PLACEHOLDER] Replace with your real projects
  {
    name: 'TerminalFolio',
    description: 'This portfolio — a fully interactive CLI terminal built with Next.js.',
    longDescription:
      'A portfolio website styled as an interactive command-line terminal. ' +
      'Built with Next.js App Router, TypeScript, and a custom shell engine ' +
      'featuring a virtual filesystem, command registry with fuzzy matching, ' +
      'tab-completion, and multiple themes.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    repo: 'https://github.com/ashmitthakur/portfolio',
    highlight: true,
    year: 2024,
  },
  {
    name: 'Project Alpha',
    description: '[PLACEHOLDER] A brief description of what this project does.',
    longDescription:
      '[PLACEHOLDER] A longer description — what problem it solved, ' +
      'what you learned, what makes it interesting.',
    tech: ['[PLACEHOLDER] React', 'Node.js', 'PostgreSQL'],
    url: 'https://example.com',
    repo: 'https://github.com/ashmitthakur/project-alpha',
    highlight: true,
    year: 2024,
  },
  {
    name: 'Project Beta',
    description: '[PLACEHOLDER] Another project description.',
    longDescription: '[PLACEHOLDER] More detail about Project Beta.',
    tech: ['[PLACEHOLDER] Python', 'FastAPI', 'Redis'],
    repo: 'https://github.com/ashmitthakur/project-beta',
    highlight: true,
    year: 2023,
  },
  {
    name: 'Project Gamma',
    description: '[PLACEHOLDER] Yet another project.',
    tech: ['[PLACEHOLDER] Go', 'gRPC'],
    repo: 'https://github.com/ashmitthakur/project-gamma',
    highlight: false,
    year: 2023,
  },
]
