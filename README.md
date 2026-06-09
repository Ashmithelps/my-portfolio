# Terminal Portfolio

A portfolio website styled as a fully interactive command-line terminal. Built with Next.js App Router, TypeScript, and a custom shell engine.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve production build
npm test           # run test suite
```

---

## How to personalize

### 1. Your bio and info

Edit **`content/profile.ts`** — name, role, tagline, bio, location, email, GitHub, LinkedIn, resume URL.

### 2. Projects

Edit **`content/projects.ts`** — add/remove entries. Set `highlight: true` to show in the `projects` summary. Each entry maps to a file in the virtual filesystem at `/projects/<slug>.txt`.

### 3. Skills

Edit **`content/skills.ts`** — categories and items.

### 4. Work history / education

Edit **`content/resume.ts`** — experience and education entries.

### 5. Resume PDF

Drop your PDF at `public/resume.pdf` and set `resumeUrl: '/resume.pdf'` in `content/profile.ts`. The `resume --download` command will trigger a download.

---

## How to add a command

Create a file in `lib/commands/` that exports a `Command` object:

```ts
// lib/commands/hello.ts
import type { Command } from '@/lib/shell/types'

const hello: Command = {
  name: 'hello',
  aliases: ['hi'],
  description: 'Say hello',
  usage: 'hello [name]',
  handler({ args }) {
    return [
      { type: 'success', value: `Hello, ${args[0] ?? 'world'}!` },
    ]
  },
}

export default hello
```

Then register it in `lib/commands/index.ts`:

```ts
import hello from './hello'
// add hello to the commands array
const commands = [...existing..., hello]
```

That's it. Help, tab-completion, and fuzzy "did you mean" all pick it up automatically.

---

## Output line types

| Type | Renders as |
|---|---|
| `text` | Plain text. `className: 'text-bright'` or `'text-dim'` for emphasis |
| `link` | Clickable hyperlink (opens in new tab) |
| `ascii` | `<pre>` block with prompt colour |
| `br` | Vertical spacer |
| `error` | Red text |
| `success` | Green text |
| `warning` | Yellow/orange text |

---

## Theming

Five built-in themes: `dracula` (default), `gruvbox`, `nord`, `matrix`, `light`.

Switch at runtime: `theme dracula`

To add a theme, add an entry to `styles/themes.ts` following the `Theme` interface — no other changes needed.

---

## Virtual filesystem

The filesystem is built in `lib/vfs/vfs-tree.ts` from your content files:

```
/
├── about.txt
├── resume.txt
├── skills.txt
├── contact.txt
└── projects/
    ├── terminalfolio.txt
    └── ...
```

Adding a project in `content/projects.ts` automatically creates a file in `/projects/`.

---

## Easter eggs

Hidden commands (not shown in `help`): `sudo`, `rm -rf /`, `matrix`, `coffee`, `snake`, `guess`.
Konami code (up up down down left right left right B A) triggers the matrix command.

---

## SEO

- Server-rendered content (bio, projects, skills, contact) lives in a `sr-only` div — visible to crawlers, not users.
- OG image generated dynamically at `/og` via Next.js ImageResponse (edge runtime).
- `<title>`, `<meta description>`, Open Graph, and Twitter card tags in `app/layout.tsx`.
- `sitemap.xml` and `robots.txt` auto-generated from `app/sitemap.ts` and `app/robots.ts`.

Update the domain in `content/profile.ts` (`website` field) before deploying.

---

## Accessibility

- Terminal output is an ARIA live region (`role="log"`, `aria-live="polite"`).
- Input is always focusable; clicking anywhere in the terminal focuses it.
- Quick-command chips (About, Projects, Resume, Contact) provide a no-typing path.
- Cursor blink animation respects `prefers-reduced-motion`.
- All interactive elements have visible focus styles.

---

## Deploying to Vercel

```bash
vercel
```

The main page is statically generated. The `/og` route runs on the Edge runtime.

---

## Project structure

```
content/          ← Edit here to personalize
  profile.ts
  projects.ts
  skills.ts
  resume.ts

lib/
  shell/
    types.ts      ← Core type definitions
    parser.ts     ← Input tokenizer
    registry.ts   ← Command registry + fuzzy matching
    shell.ts      ← State management + executor
    banner.ts     ← Boot banner
  vfs/
    types.ts      ← VFS node types
    vfs.ts        ← VirtualFS class
    vfs-tree.ts   ← Filesystem tree built from content
    instance.ts   ← Singleton VFS instance
  commands/
    index.ts      ← Registry + all imports
    *.ts          ← Individual commands
    easter/       ← Easter egg commands

components/
  terminal/
    TerminalApp.tsx     ← Shell loop, state, keyboard
    TerminalOutput.tsx  ← ARIA live region renderer
    TerminalInput.tsx   ← Prompt + input + keybindings
    QuickChips.tsx      ← Escape-hatch tap buttons
    SnakeGame.tsx       ← Canvas snake easter egg
    TerminalLoader.tsx  ← Client-side dynamic wrapper

styles/
  themes.ts       ← Color palette definitions

app/
  layout.tsx      ← Metadata, OG tags, fonts
  page.tsx        ← SSR content + terminal mount
  og/route.tsx    ← Dynamic OG image
  sitemap.ts
  robots.ts

tests/
  parser.test.ts
  vfs.test.ts
  registry.test.ts
```
