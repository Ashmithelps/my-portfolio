import type { MetadataRoute } from 'next'
import { profile } from '@/content/profile'

const BASE = profile.website ?? `https://${profile.promptHost}.vercel.app`

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
