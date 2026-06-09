import type { MetadataRoute } from 'next'
import { profile } from '@/content/profile'

const BASE = profile.website ?? `https://${profile.promptHost}.vercel.app`

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
