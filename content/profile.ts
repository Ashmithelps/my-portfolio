export const profile = {
  name: 'Ashmit Thakur',

  role: 'CS Undergraduate · Software Engineering Intern',

  tagline: 'B.E. CS undergrad with 800+ competitive programming problems and hands-on experience in Java, Spring Boot, and C++.',

  bio: [
    "I'm Ashmit — a Computer Science undergraduate at Chandigarh University specializing in AI/ML,",
    'with strong problem-solving fundamentals built across 800+ competitive programming problems.',
    'I build clean, efficient, and scalable software. Currently seeking a Software Engineering Intern role.',
  ].join(' '),

  location: 'Ropar, Punjab, India',

  email: 'thakurashmit20@gmail.com',

  resumeUrl: '/resume.pdf',

  github: 'ashmithelps',

  linkedin: 'ashmitxthakur',

  twitter: 'ashmitxthakur' as string | null,

  website: null as string | null,

  get promptUser() {
    return 'visitor'
  },
  get promptHost() {
    return this.name.toLowerCase().replace(/\s+/g, '')
  },
}
