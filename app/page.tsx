import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { skills } from '@/content/skills'
import TerminalLoader from '@/components/terminal/TerminalLoader'

export default function Home() {
  return (
    <>
      {/*
        SSR-rendered content for crawlers and social previews.
        Visually hidden but in the DOM — search engines read it.
      */}
      <div className="sr-only">
        <h1>{profile.name} — {profile.role}</h1>
        <p>{profile.bio}</p>
        <section>
          <h2>Projects</h2>
          <ul>
            {projects.map((p) => (
              <li key={p.name}>
                <strong>{p.name}</strong>: {p.description} ({p.tech.join(', ')})
                {p.url && <a href={p.url}>{p.url}</a>}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Skills</h2>
          <ul>
            {skills.map((cat) => (
              <li key={cat.category}>{cat.category}: {cat.items.join(', ')}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Contact</h2>
          <p>Email: {profile.email}</p>
          {profile.github && <p>GitHub: github.com/{profile.github}</p>}
          {profile.linkedin && <p>LinkedIn: linkedin.com/in/{profile.linkedin}</p>}
        </section>
      </div>

      {/* Terminal — full viewport */}
      <main
        className="h-dvh w-full flex flex-col overflow-hidden"
        aria-label="Interactive terminal portfolio"
      >
        <TerminalLoader />
      </main>
    </>
  )
}
