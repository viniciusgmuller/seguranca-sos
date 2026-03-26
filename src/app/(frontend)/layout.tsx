import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

async function getSiteConfig() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'site-config' })
}

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig()

  const title = siteConfig.metaTitle ?? 'S.O.S Segurança'
  const description =
    siteConfig.metaDescription ??
    'Segurança para Eventos, Portarias e Postos de Vigilância em Gramado RS'

  const ogImage =
    typeof siteConfig.ogImage === 'object' && siteConfig.ogImage?.url
      ? `${SITE_URL}${siteConfig.ogImage.url}`
      : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: 'S.O.S Segurança',
      locale: 'pt_BR',
      type: 'website',
      ...(ogImage ? { images: [{ url: ogImage, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteConfig = await getSiteConfig()

  const phone = siteConfig.phone ?? '(54) 3286-5902'
  const whatsapp = siteConfig.whatsapp ?? '(54) 99920-1576'
  const email = siteConfig.email ?? 'contato@sosseguranca.com.br'
  const address = siteConfig.address ?? ''
  const instagram = siteConfig.instagram ?? null
  const facebook = siteConfig.facebook ?? null
  const gaId = siteConfig.gaId ?? ''

  const lat = siteConfig.mapCoordinates?.lat ?? -29.3877278
  const lng = siteConfig.mapCoordinates?.lng ?? -50.876722

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'S.O.S Segurança',
    description:
      siteConfig.metaDescription ??
      'Segurança para Eventos, Portarias e Postos de Vigilância em Gramado RS',
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
      latitude: lat,
      longitude: lng,
    },
  }

  const isGTM = gaId.startsWith('GTM-')

  return (
    <>
      {gaId && !isGTM && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
      {gaId && isGTM && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gaId}');
          `}
        </Script>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar phone={phone} whatsapp={whatsapp} email={email} />
      <div className="pt-[104px]">{children}</div>
      <Footer
        phone={phone}
        whatsapp={whatsapp}
        email={email}
        address={address}
        instagram={instagram}
        facebook={facebook}
      />
      <WhatsAppButton whatsapp={whatsapp} />
    </>
  )
}
