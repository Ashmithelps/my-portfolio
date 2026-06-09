import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { profile } from '@/content/profile'

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const TITLE = `${profile.name} — ${profile.role}`
const DESCRIPTION = profile.bio
const BASE_URL = profile.website ?? `https://${profile.promptHost}.vercel.app`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: `${profile.name}'s Portfolio`,
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
    ...(profile.twitter ? { creator: `@${profile.twitter}` } : {}),
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} h-full`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#282a36" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased h-full overflow-hidden">{children}</body>
    </html>
  )
}
