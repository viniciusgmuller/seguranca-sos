import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({ config })

  const siteConfig = await payload.findGlobal({
    slug: 'site-config',
  })

  const phone = siteConfig.phone ?? '(54) 3286-5902'
  const whatsapp = siteConfig.whatsapp ?? '(54) 99920-1576'
  const email = siteConfig.email ?? 'contato@sosseguranca.com.br'
  const address = siteConfig.address ?? ''
  const instagram = siteConfig.instagram ?? null
  const facebook = siteConfig.facebook ?? null

  return (
    <>
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
