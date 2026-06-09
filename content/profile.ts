// ─── EDIT THIS FILE to personalize your portfolio ───────────────────────────

export const profile = {
  // [PLACEHOLDER] Your full name
  name: 'Ashmit Thakur',

  // [PLACEHOLDER] Your title / role
  role: 'Full-Stack Engineer',

  // [PLACEHOLDER] One-liner shown in the terminal banner
  tagline: 'I build fast, thoughtful software and care deeply about the craft.',

  // [PLACEHOLDER] 2-4 sentence bio shown by `whoami`
  bio: [
    "Hey — I'm Ashmit, a full-stack engineer who loves building products",
    'that are fast, accessible, and a little bit delightful.',
    "I'm currently open to new opportunities. Say hi.",
  ].join(' '),

  // [PLACEHOLDER] Where you're based
  location: 'Ropar, Punjab',

  // [PLACEHOLDER] Public email
  email: 'thakurashmit20@gmail.com',

  // [PLACEHOLDER] Path to your résumé PDF in /public, or a full URL
  resumeUrl: '/resume.pdf',

  // [PLACEHOLDER] Your GitHub handle
  github: 'ashmithelps',

  // [PLACEHOLDER] Your LinkedIn path (after linkedin.com/in/)
  linkedin: 'ashmitxthakur',

  // [PLACEHOLDER] Optional: Twitter/X handle (without @), or null to hide
  twitter: null as string | null,

  // [PLACEHOLDER] Optional: personal website, or null
  website: null as string | null,

  // Prompt string — change yourname here or it uses profile.name automatically
  get promptUser() {
    return 'visitor'
  },
  get promptHost() {
    return this.name.toLowerCase().replace(/\s+/g, '')
  },
}
