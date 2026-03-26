'use client'

import { useState } from 'react'

type Category = 'fixo' | 'evento' | 'parceiro'

interface Client {
  id: string
  name: string
  category: Category
}

interface ClientsTabsProps {
  grouped: Record<Category, Client[]>
}

const tabs: { key: Category; label: string }[] = [
  { key: 'fixo', label: 'Clientes Fixos' },
  { key: 'evento', label: 'Grandes Eventos' },
  { key: 'parceiro', label: 'Parceiros' },
]

export default function ClientsTabs({ grouped }: ClientsTabsProps) {
  const [active, setActive] = useState<Category>('fixo')

  return (
    <>
      {/* Header row */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        {/* Left: eyebrow + title */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            <span className="block w-8 h-[2px] bg-primary" />
            <span className="font-body text-[13px] font-medium uppercase tracking-[0.16em] text-primary">
              Quem confia em nós
            </span>
          </div>
          <h2 className="font-heading text-[36px] md:text-[48px] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-[1.1]">
            Clientes
          </h2>
        </div>

        {/* Right: tab pills */}
        <div className="flex flex-wrap gap-2 overflow-x-auto md:flex-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`shrink-0 rounded-full px-5 py-2.5 font-body text-[14px] font-medium transition-colors ${
                active === tab.key
                  ? 'bg-primary text-[#0a0a0a]'
                  : 'bg-[#0a0a0a] text-white/70 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Client chips */}
      <div className="mt-12 flex flex-wrap gap-3">
        {grouped[active].map((client) => (
          <span
            key={client.id}
            className="rounded-lg border border-[#e5e5e0] px-6 py-3.5 font-body text-[14px] font-normal text-[#2a2a2a]"
          >
            {client.name}
          </span>
        ))}

        {grouped[active].length === 0 && (
          <p className="font-body text-[14px] text-[#2a2a2a]/50">
            Nenhum cliente cadastrado nesta categoria.
          </p>
        )}
      </div>
    </>
  )
}
