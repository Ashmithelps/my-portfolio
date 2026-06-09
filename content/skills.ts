export interface SkillCategory {
  category: string
  items: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    items: ['Java', 'C++', 'Python', 'SQL', 'React.js'],
  },
  {
    category: 'Frameworks & Technologies',
    items: ['Spring Boot', 'Spring Security', 'Django', 'jQuery', 'Hibernate', 'Kafka', 'Generative AI', 'Agentic AI'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS (EC2, S3)', 'Docker', 'Kubernetes', 'GitHub Actions', 'Azure Fundamentals'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'Postman', 'Figma', 'Framer', 'Google Analytics', 'Google Colab', 'Excel', 'Microsoft 365'],
  },
  {
    category: 'Core CS',
    items: ['Data Structures & Algorithms', 'OOP', 'OS Fundamentals', 'SDLC', 'Design Patterns', 'Unit Testing (JUnit)', 'NoSQL'],
  },
]
