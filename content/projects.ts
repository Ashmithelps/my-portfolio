export interface Project {
  name: string
  description: string
  longDescription?: string
  tech: string[]
  url?: string
  repo?: string
  highlight: boolean
  year?: number
}

export const projects: Project[] = [
  {
    name: 'Campus Crush',
    description: 'Secure anonymous messaging platform for college students verified via UIDs.',
    longDescription:
      'Engineered a secure, anonymous messaging platform utilizing college-issued UIDs to verify user originality. ' +
      'Developed a robust OTP-based authentication pipeline that reduced fraudulent account creation by 90%. ' +
      'Integrated real-time communication features for seamless, low-latency chat between anonymous participants.',
    tech: ['React.js', 'Spring Boot', 'RESTful APIs'],
    highlight: true,
    year: 2026,
  },
  {
    name: 'Smartly Tasks',
    description: 'Scalable task management web app built with Core Java and Spring Boot.',
    longDescription:
      'Developed a scalable task management web application using Core Java and Spring Boot, applying OOP principles, ' +
      'exception handling, and RESTful API design for a clean, maintainable backend architecture. ' +
      'Implemented full CRUD operations with Spring Security for efficient task creation, updating, and deletion.',
    tech: ['Spring Boot', 'Spring Security', 'RESTful APIs', 'Java'],
    highlight: true,
    year: 2025,
  },
  {
    name: 'Async Task Scheduler & Image Processor',
    description: 'C++17 multithreaded task scheduler achieving 3.8x speedup on Apple M4.',
    longDescription:
      'Built a task scheduler using synchronization primitives (mutex, condition variable) to optimize multi-core CPU utilization. ' +
      'Engineered an automated pipeline for bulk image filtering achieving a 3.8x speedup on Apple M4 architecture. ' +
      'Leverages C++17 features including structured bindings, std::filesystem, and parallel algorithms.',
    tech: ['C++17', 'Multithreading', 'Systems Programming'],
    highlight: true,
    year: 2025,
  },
  {
    name: 'TerminalFolio',
    description: 'This portfolio — a fully interactive CLI terminal built with Next.js.',
    longDescription:
      'A portfolio website styled as an interactive command-line terminal. ' +
      'Built with Next.js App Router, TypeScript, and a custom shell engine featuring a virtual filesystem, ' +
      'command registry with fuzzy matching, tab-completion, five themes, and easter eggs.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    repo: 'https://github.com/ashmithelps/portfolio',
    highlight: true,
    year: 2026,
  },
  {
    name: 'UI/UX Design Portfolio',
    description: 'High-fidelity UI designs for Nike, mobile booking apps, and banking interfaces.',
    longDescription:
      'Created a high-fidelity motion graphic ad for Nike using animation, typography, and color psychology. ' +
      'Designed a user-centric mobile interface with real-time booking workflows, increasing task efficiency by 20%. ' +
      'Prototyped a secure banking application UI, validated for usability and consistency with 5 real users.',
    tech: ['Figma', 'Framer'],
    highlight: false,
    year: 2023,
  },
]
