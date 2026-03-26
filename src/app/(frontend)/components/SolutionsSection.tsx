import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  Shield,
  DoorOpen,
  Camera,
  Home,
  Car,
  Eye,
  Flame,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

const iconMap: Record<string, LucideIcon> = {
  'Segurança de todos os tipos': Shield,
  'Portarias': DoorOpen,
  'Monitoramento de câmeras': Camera,
  'Limpeza de condomínios e empresas': Home,
  'Serviço de valet': Car,
  'Vigilância patrimonial': Eye,
  'Brigada de incêndio': Flame,
  'Limpeza e organização de eventos': Sparkles,
  'Vigilância armada': ShieldCheck,
}

function getCardStyle(index: number, isLast: boolean) {
  if (isLast) {
    return {
      bg: 'bg-primary',
      text: 'text-[#0a0a0a]',
      iconBg: 'bg-[#0a0a0a]/15',
      iconColor: 'text-[#0a0a0a]',
    }
  }

  // Checkerboard: row 0 → dark, light, dark / row 1 → light, dark, light / ...
  const row = Math.floor(index / 3)
  const col = index % 3
  const isDark = (row + col) % 2 === 0

  if (isDark) {
    return {
      bg: 'bg-[#0a0a0a]',
      text: 'text-white',
      iconBg: 'bg-white/10',
      iconColor: 'text-primary',
    }
  }

  return {
    bg: 'bg-[#f5f5f0]',
    text: 'text-[#0a0a0a]',
    iconBg: 'bg-[#0a0a0a]/8',
    iconColor: 'text-primary',
  }
}

export default async function SolutionsSection() {
  const payload = await getPayload({ config })

  const { docs: services } = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 100,
  })

  return (
    <section id="Solucoes" className="bg-white py-[120px] px-8 md:px-20">
      {/* Section header */}
      <div className="max-w-[480px] mb-14">
        <div className="flex items-center gap-4 mb-5">
          <span className="block w-8 h-[2px] bg-primary" />
          <span className="font-body text-[13px] font-medium uppercase tracking-[0.16em] text-primary">
            O que fazemos
          </span>
        </div>
        <h2 className="font-heading text-[36px] md:text-[48px] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-[1.1]">
          Nossas Soluções
        </h2>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => {
          const isLast = index === services.length - 1
          const style = getCardStyle(index, isLast)
          const Icon = iconMap[service.title as string] ?? Shield

          const bgImage =
            service.backgroundImage &&
            typeof service.backgroundImage === 'object' &&
            'url' in service.backgroundImage
              ? service.backgroundImage
              : null

          return (
            <div
              key={service.id}
              className={`relative h-[280px] rounded-xl p-7 flex flex-col justify-between overflow-hidden ${!bgImage ? style.bg : ''}`}
            >
              {/* Background image with overlay */}
              {bgImage?.url && (
                <>
                  <Image
                    src={bgImage.url}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0a0a0a]/65" />
                </>
              )}

              {/* Icon top-right */}
              <div className="relative z-10 flex justify-end">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    bgImage ? 'bg-white/15' : style.iconBg
                  }`}
                >
                  <Icon
                    size={20}
                    className={bgImage ? 'text-primary' : style.iconColor}
                  />
                </div>
              </div>

              {/* Title bottom-left */}
              <h3
                className={`relative z-10 font-heading text-[22px] font-semibold leading-[1.2] ${
                  bgImage ? 'text-white' : style.text
                }`}
              >
                {service.title as string}
              </h3>
            </div>
          )
        })}
      </div>
    </section>
  )
}
