import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function PhotosSection() {
  const payload = await getPayload({ config })

  const { docs: slides } = await payload.find({
    collection: 'slides',
    sort: 'order',
    limit: 100,
  })

  return (
    <section id="Galeria" className="bg-[#f5f5f0] py-16 md:py-[120px] pl-5 md:pl-20">
      {/* Section header */}
      <div className="pr-5 md:pr-20 mb-10 md:mb-14">
        <div className="flex items-center gap-4 mb-5">
          <span className="block w-8 h-[2px] bg-primary" />
          <span className="font-body text-[13px] font-medium uppercase tracking-[0.16em] text-primary">
            Nosso trabalho
          </span>
        </div>
        <h2 className="font-heading text-[36px] md:text-[48px] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-[1.1]">
          Galeria
        </h2>
      </div>

      {/* Horizontal scroll strip */}
      <div
        className="flex gap-4 overflow-x-auto"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {slides.map((slide) => {
          const image =
            slide.image && typeof slide.image === 'object' && 'url' in slide.image
              ? slide.image
              : null

          return (
            <div
              key={slide.id}
              className="relative w-[300px] md:w-[400px] h-[280px] rounded-xl flex-shrink-0 overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
            >
              {image?.url ? (
                <Image
                  src={image.url}
                  alt={(slide.caption as string) || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 300px, 400px"
                />
              ) : (
                <div className="w-full h-full bg-[#2a2a2a]" />
              )}

              {/* Caption overlay */}
              {slide.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-5">
                  <p className="font-body text-[15px] font-medium text-white">
                    {slide.caption as string}
                  </p>
                </div>
              )}
            </div>
          )
        })}

        {/* Spacer to give some right padding at the end of the scroll */}
        <div className="w-8 md:w-20 flex-shrink-0" aria-hidden="true" />
      </div>

      {/* Hide scrollbar for webkit browsers */}
      <style>{`
        #Galeria > div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
