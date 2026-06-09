'use client'

import dynamic from 'next/dynamic'

const TerminalApp = dynamic(() => import('./TerminalApp'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full font-mono text-sm" style={{ color: '#50fa7b', backgroundColor: '#282a36' }}>
      Booting…
    </div>
  ),
})

export default function TerminalLoader() {
  return <TerminalApp />
}
