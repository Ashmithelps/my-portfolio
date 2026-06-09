import { ImageResponse } from 'next/og'
import { profile } from '@/content/profile'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: '#282a36',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          fontFamily: 'monospace',
        }}
      >
        <div style={{ color: '#6272a4', fontSize: 24, marginBottom: 16 }}>
          $ whoami
        </div>
        <div style={{ color: '#f8f8f2', fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          {profile.name}
        </div>
        <div style={{ color: '#bd93f9', fontSize: 32, marginTop: 16 }}>
          {profile.role}
        </div>
        <div style={{ color: '#6272a4', fontSize: 24, marginTop: 24, maxWidth: 800 }}>
          {profile.tagline}
        </div>
        <div style={{ color: '#50fa7b', fontSize: 20, marginTop: 48 }}>
          ▶ type &apos;help&apos; to explore
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
