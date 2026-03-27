import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'

type FooterProps = {
  phone: string
  whatsapp: string
  email: string
  address: string
  instagram?: string | null
  facebook?: string | null
  logoUrl?: string | null
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const siteLinks = [
  { label: 'Home', href: '#' },
  { label: 'Soluções', href: '#Solucoes' },
  { label: 'Localização', href: '#Localizacao-e-contato' },
  { label: 'Contato', href: '#Localizacao-e-contato' },
]

export default function Footer({ phone, whatsapp, email, address, instagram, facebook, logoUrl }: FooterProps) {
  const whatsappNumber = whatsapp.replace(/\D/g, '')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              {logoUrl ? (
                <Image src={logoUrl} alt="S.O.S Segurança" width={140} height={48} className="h-10 w-auto object-contain" />
              ) : (
                <>
                  <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center">
                    <span className="text-black font-heading font-bold text-lg leading-none">S</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-heading font-bold text-base leading-tight">S.O.S</span>
                    <span className="text-white/60 text-[10px] tracking-[0.15em] uppercase leading-tight">Segurança</span>
                  </div>
                </>
              )}
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Segurança para Eventos, Portarias e Postos de Vigilância em Gramado e região.
            </p>
          </div>

          {/* Mapa do Site */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Mapa do Site
            </h3>
            <ul className="space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Contato
            </h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-white/50 text-sm hover:text-primary transition-colors">
                  <Phone size={14} className="text-primary shrink-0" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/55${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 text-sm hover:text-primary transition-colors">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{whatsapp}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/50 text-sm hover:text-primary transition-colors">
                  <Mail size={14} className="text-primary shrink-0" />
                  <span>{email}</span>
                </a>
              </li>
              <li className="text-white/50 text-sm leading-relaxed pt-1">
                {address}
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Redes Sociais
            </h3>
            <div className="flex gap-3">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-black transition-colors"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-black transition-colors"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-white/40 text-xs text-center">
            &copy; {currentYear} S.O.S Segurança. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
