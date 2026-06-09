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
  detail?: string
}

// No formal employment yet — showcasing key projects as experience
export const experience: Experience[] = [
  {
    company: 'Campus Crush',
    role: 'Full-Stack Developer (Personal Project)',
    period: 'Jan 2026 – Feb 2026',
    bullets: [
      'Engineered a secure, anonymous messaging platform using college-issued UIDs for identity verification.',
      'Built an OTP-based authentication pipeline that reduced fraudulent account creation by 90%.',
      'Integrated real-time communication features enabling seamless, low-latency anonymous chat.',
    ],
  },
  {
    company: 'Smartly Tasks',
    role: 'Backend Developer (Personal Project)',
    period: 'Sept 2025 – Dec 2025',
    bullets: [
      'Built a scalable task management web app with Core Java and Spring Boot, applying OOP, exception handling, and RESTful API design.',
      'Implemented full CRUD operations with Spring Security for robust access control.',
    ],
  },
  {
    company: 'Asynchronous Task Scheduler & Parallel Image Processor',
    role: 'Systems Developer (Personal Project)',
    period: 'Sep 2025',
    bullets: [
      'Built a task scheduler using synchronization primitives (mutex, condition variable) to optimize multi-core CPU utilization.',
      'Engineered an automated pipeline for bulk image filtering, achieving a 3.8x speedup on Apple M4 architecture.',
    ],
  },
  {
    company: 'User Interface Designs',
    role: 'UI/UX Designer (Freelance)',
    period: 'Mar 2023 – Oct 2023',
    bullets: [
      'Created a high-fidelity motion graphic ad for Nike using animation, typography, and color psychology.',
      'Designed a user-centric mobile interface with navigation and real-time booking workflows, increasing task efficiency by 20%.',
      'Prototyped a secure banking application UI, validated with 5 users for usability and consistency.',
    ],
  },
]

export const education: Education[] = [
  {
    institution: 'Chandigarh University, Punjab, India',
    degree: 'B.E. Computer Science — AI & ML, Hons.',
    period: 'Sep 2023 – Jul 2027',
  },
  {
    institution: 'Shiwalik Public School, Punjab, India',
    degree: 'CBSE Class XII — PCM',
    period: '2023',
    detail: '84%',
  },
  {
    institution: 'Holy Family Convent School, Punjab, India',
    degree: 'ICSE Class X',
    period: '2021',
    detail: '93.1%',
  },
]

export const achievements: string[] = [
  'Solved 800+ algorithmic problems across LeetCode and Codeforces.',
  'Codeforces rating 1350+ — consistent performance in rated contests.',
  'LeetCode rating 1567 — ranking among top participants.',
  'AtCoder rating 540+ — active participation in structured contests.',
  'Participated in 60+ coding contests.',
]
