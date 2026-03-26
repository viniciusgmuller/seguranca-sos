import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt } from '@payloadcms/translations/languages/pt'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Slides } from './collections/Slides'
import { Services } from './collections/Services'
import { Clients } from './collections/Clients'
import { ContactSubmissions } from './collections/ContactSubmissions'

import { SiteConfig } from './globals/SiteConfig'
import { HeroSection } from './globals/HeroSection'
import { WhySection } from './globals/WhySection'
import { HistorySection } from './globals/HistorySection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        return baseUrl
      },
      globals: ['site-config', 'hero-section', 'why-section', 'history-section'],
      collections: ['slides', 'services', 'clients'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Slides, Services, Clients, ContactSubmissions],
  globals: [SiteConfig, HeroSection, WhySection, HistorySection],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://payload:payload@localhost:5436/payload',
    },
  }),
  sharp,
  i18n: {
    supportedLanguages: { pt },
    fallbackLanguage: 'pt',
  },
})
