'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'HOME', href: '#' },
  { label: 'SOLUÇÕES', href: '#Solucoes' },
  { label: 'LOCALIZAÇÃO', href: '#Localizacao-e-contato' },
  { label: 'CONTATO', href: '#Localizacao-e-contato' },
]

export default function MobileMenuButton({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false)

  const whatsappNumber = whatsapp.replace(/\D/g, '')

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden text-[#0a0a0a] p-2"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-[#0a0a0a]/10 shadow-lg">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-[var(--font-body)] text-sm font-medium text-[#0a0a0a]/60 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/55${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-black font-medium text-sm px-5 py-2.5 rounded-lg text-center hover:brightness-110 transition"
            >
              Fale Conosco
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
