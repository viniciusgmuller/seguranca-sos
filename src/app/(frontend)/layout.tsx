import React from 'react'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { siteConfig } from '@/content/site'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://segurancasos.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  icons: { icon: siteConfig.logo, apple: siteConfig.logo },
  openGraph: {
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    url: SITE_URL,
    siteName: 'S.O.S Segurança',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  const { phone, whatsapp, email, address, instagram, facebook, logo, mapCoordinates } = siteConfig

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'S.O.S Segurança',
    description: siteConfig.metaDescription,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'R. F. G. Bier, 458',
      addressLocality: 'Gramado',
      addressRegion: 'RS',
      postalCode: '95670-000',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: mapCoordinates.lat,
      longitude: mapCoordinates.lng,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar phone={phone} whatsapp={whatsapp} email={email} logoUrl={logo} />
      <div className="pt-[104px]">{children}</div>
      <Footer
        phone={phone}
        whatsapp={whatsapp}
        email={email}
        address={address}
        instagram={instagram || null}
        facebook={facebook || null}
        logoUrl={logo}
      />
      <WhatsAppButton whatsapp={whatsapp} />
    </>
  )
}
