import { siteConfig } from '@/content/site'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function ContactSection() {
  const { lat, lng } = siteConfig.mapCoordinates
  const whatsappNumber = siteConfig.whatsapp.replace(/\D/g, '')
  const message = encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento de segurança.')
  const whatsappUrl = `https://wa.me/55${whatsappNumber}?text=${message}`

  return (
    <section id="Localizacao-e-contato" className="w-full bg-primary px-5 md:px-20 py-16 md:py-[120px]">
      <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left: WhatsApp CTA */}
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[#0a0a0a]" />
              <span className="font-body text-[13px] font-medium text-[#0a0a0a] uppercase tracking-[0.16em]">
                Fale conosco
              </span>
            </div>
            <h2 className="font-heading text-[36px] md:text-[48px] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-[1.1] md:leading-[52px]">
              Peça seu orçamento
            </h2>
            <p className="font-body text-[16px] text-[#0a0a0a]/70 leading-7 max-w-[460px]">
              Fale direto com a nossa equipe pelo WhatsApp. Respondemos rápido e montamos
              uma proposta de segurança sob medida para você ou o seu evento.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 self-start px-9 py-4 bg-[#0a0a0a] rounded-md font-body text-[15px] font-medium text-white hover:bg-[#2a2a2a] transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5 text-primary" />
            Chamar no WhatsApp
          </a>

          <div className="flex flex-col gap-2 pt-2">
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
              className="font-body text-[15px] text-[#0a0a0a]/70 hover:text-[#0a0a0a] transition-colors"
            >
              Telefone: {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-body text-[15px] text-[#0a0a0a]/70 hover:text-[#0a0a0a] transition-colors"
            >
              E-mail: {siteConfig.email}
            </a>
          </div>
        </div>

        {/* Right: Map + info */}
        <div className="flex flex-col gap-6 w-full lg:w-[480px] lg:flex-shrink-0">
          <div className="w-full h-[280px] rounded-xl overflow-hidden">
            <iframe
              title="Localização S.O.S Segurança"
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
            <h3 className="font-heading text-lg font-semibold text-[#0a0a0a]">Endereço</h3>
            <p className="font-body text-[15px] text-[#0a0a0a]/60 leading-6">{siteConfig.address}</p>
          </div>

          <a
            href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#0a0a0a] rounded-md font-body text-sm font-medium text-[#0a0a0a] self-start hover:bg-[#0a0a0a] hover:text-white transition-colors"
          >
            Como chegar
          </a>
        </div>
      </div>
    </section>
  )
}
