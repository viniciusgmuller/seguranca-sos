import { getPayload } from 'payload'
import config from '@payload-config'

export default async function WhySection() {
  const payload = await getPayload({ config })

  const whyData = await payload.findGlobal({
    slug: 'why-section',
  })

  const { title, description, bulletPoints } = whyData

  return (
    <section className="w-full bg-[#0a0a0a] py-16 px-8 md:py-[120px] md:px-20">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left column */}
        <div className="w-full lg:w-[440px] lg:shrink-0">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-5">
            <span className="block w-8 h-[2px] bg-primary" />
            <span className="font-body text-[13px] font-medium uppercase tracking-[0.16em] text-primary">
              Diferenciais
            </span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-[36px] md:text-[48px] font-bold text-white tracking-[-0.03em] leading-[1.08] md:leading-[52px] mb-6">
            {title}
          </h2>

          {/* Description */}
          <p className="font-body text-base font-normal text-white/50 leading-[26px]">
            {description}
          </p>
        </div>

        {/* Right column */}
        <div className="flex-1 pt-0 lg:pt-5">
          {bulletPoints?.map((point: { title: string; subtitle?: string }, index: number) => {
            const number = String(index + 1).padStart(2, '0')
            const isLast = index === bulletPoints.length - 1

            return (
              <div
                key={index}
                className={`flex items-start gap-5 py-6 ${
                  !isLast ? 'border-b border-white/[0.08]' : ''
                }`}
              >
                {/* Number badge */}
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="font-heading text-[20px] font-bold text-primary">
                    {number}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-heading text-[18px] font-semibold text-white">
                    {point.title}
                  </h3>
                  {point.subtitle && (
                    <p className="font-body text-[14px] font-normal text-white/40 leading-[22px]">
                      {point.subtitle}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
