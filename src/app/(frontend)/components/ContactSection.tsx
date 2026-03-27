import { getPayload } from 'payload'
import config from '@payload-config'
import ContactForm from './ContactForm'

export default async function ContactSection() {
  const payload = await getPayload({ config })
  const siteConfig = await payload.findGlobal({ slug: 'site-config' })

  const lat = siteConfig.mapCoordinates?.lat ?? -29.3877278
  const lng = siteConfig.mapCoordinates?.lng ?? -50.876722

  return (
    <section id="Localizacao-e-contato" className="w-full bg-primary px-5 md:px-20 py-16 md:py-[120px]">
      <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left: Form */}
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[#0a0a0a]" />
              <span className="font-body text-[13px] font-medium text-[#0a0a0a] uppercase tracking-[0.16em]">
                Fale conosco
              </span>
            </div>
            <h2 className="font-heading text-[36px] md:text-[48px] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-[1.1] md:leading-[52px]">
              Contato
            </h2>
          </div>

          <ContactForm />
        </div>

        {/* Right: Map + info */}
        <div className="flex flex-col gap-6 w-full lg:w-[480px] lg:flex-shrink-0">
          <div className="w-full h-[280px] rounded-xl overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDIzJzE1LjgiUyA1MMKwNTInMzYuMiJX!5e0!3m2!1spt-BR!2sbr!4v1`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-lg font-semibold text-[#0a0a0a]">
              Endereço
            </h3>
            <p className="font-body text-[15px] text-[#0a0a0a]/60 leading-6">
              {siteConfig.address}
            </p>
          </div>

          <a
            href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#0a0a0a] rounded-md font-body text-sm font-medium text-[#0a0a0a] self-start hover:bg-[#0a0a0a] hover:text-white transition-colors"
          >
            Abrir endereço no Waze
          </a>
        </div>
      </div>
    </section>
  )
}
