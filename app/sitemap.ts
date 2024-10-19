// src/app/api/sitemap/route.ts (or sitemap.ts depending on setup)
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://healthsync-alpha.vercel.app', // Home page
      lastModified: new Date(),
      changeFrequency: 'daily',  // Home page may update regularly
      priority: 1.0,  // Highest priority
    },
    {
      url: 'https://healthsync-alpha.vercel.app/patient-auth', // Patient authentication page
      lastModified: new Date(),
      changeFrequency: 'daily',  // Auth pages may be accessed regularly
      priority: 0.9,  // High priority due to user authentication flow
    },
    {
      url: 'https://healthsync-alpha.vercel.app/hospital-auth', // Hospital authentication page
      lastModified: new Date(),
      changeFrequency: 'daily',  // Auth pages may be accessed regularly
      priority: 0.9,  // High priority for authentication flow
    },
  ]
}
