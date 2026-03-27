import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'
import MobileMenuButton from './MobileMenuButton'

type NavbarProps = {
  phone: string
  whatsapp: string
  email: string
  logoUrl?: string | null
}

const navLinks = [
  { label: 'HOME', href: '#' },
  { label: 'SOLUÇÕES', href: '#Solucoes' },
  { label: 'LOCALIZAÇÃO', href: '#Localizacao-e-contato' },
  { label: 'CONTATO', href: '#Localizacao-e-contato' },
]

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

export default function Navbar({ phone, whatsapp, email, logoUrl }: NavbarProps) {
  const whatsappNumber = whatsapp.replace(/\D/g, '')

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center h-10 gap-6 text-sm">
          <a href={`tel:${phone.replace(/\D/g, '')}`} className="hidden sm:flex items-center gap-1.5 text-[#0a0a0a]/70 hover:text-[#0a0a0a] transition-colors">
            <Phone size={14} className="text-[#0a0a0a]" />
            <span>{phone}</span>
          </a>
          <a href={`https://wa.me/55${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#0a0a0a]/70 hover:text-[#0a0a0a] transition-colors">
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#0a0a0a]" />
            <span>{whatsapp}</span>
          </a>
          <a href={`mailto:${email}`} className="hidden md:flex items-center gap-1.5 text-[#0a0a0a]/70 hover:text-[#0a0a0a] transition-colors">
            <Mail size={14} className="text-[#0a0a0a]" />
            <span>{email}</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            {logoUrl ? (
              <Image src={logoUrl} alt="S.O.S Segurança" width={140} height={48} className="h-10 w-auto object-contain" />
            ) : (
              <>
                <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-black font-heading font-bold text-lg leading-none">S</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#0a0a0a] font-heading font-bold text-base leading-tight">S.O.S</span>
                  <span className="text-[#0a0a0a]/50 text-[10px] tracking-[0.15em] uppercase leading-tight">Segurança</span>
                </div>
              </>
            )}
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm font-medium text-[#0a0a0a]/60 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/55${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-black font-medium text-sm px-5 py-2.5 rounded-lg hover:brightness-110 transition"
            >
              Fale Conosco
            </a>
          </nav>

          {/* Mobile menu button */}
          <MobileMenuButton whatsapp={whatsapp} />
        </div>
      </div>
    </header>
  )
}
