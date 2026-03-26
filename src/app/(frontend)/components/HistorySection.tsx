import { getPayload } from 'payload'
import config from '@payload-config'

export default async function HistorySection() {
  const payload = await getPayload({ config })

  const historyData = await payload.findGlobal({
    slug: 'history-section',
  })

  const { title, paragraphs, founders } = historyData

  return (
    <section className="w-full bg-[#0a0a0a] py-16 px-5 md:py-[120px] md:px-20">
      <div className="flex flex-col md:flex-row gap-12 md:gap-[80px]">
        {/* Left column */}
        <div className="md:w-[400px] md:flex-shrink-0">
          <span
            className="block font-heading text-[64px] md:text-[140px] font-bold leading-[64px] md:leading-[120px] tracking-[-0.05em]"
            style={{ color: 'rgba(156,202,51,0.08)' }}
          >
            02
          </span>

          <div className="mt-6">
            <div className="flex items-center gap-4 mb-5">
              <span className="block w-8 h-[2px] bg-primary" />
              <span className="font-body text-[13px] font-medium uppercase tracking-[0.16em] text-primary">
                Nossa trajetória
              </span>
            </div>
            <h2 className="font-heading text-[36px] md:text-[48px] font-bold text-white tracking-[-0.03em] leading-[1.1]">
              {title}
            </h2>
          </div>
        </div>

        {/* Right column */}
        <div className="flex-1 md:pt-[60px]">
          <div className="flex flex-col gap-6">
            {paragraphs?.map((paragraph: { text: string }, index: number) => (
              <p
                key={index}
                className="font-body text-[17px] font-normal leading-[30px]"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {paragraph.text}
              </p>
            ))}
          </div>

          {/* Green accent line */}
          <div className="w-[60px] h-[3px] bg-primary mt-8" />

          {/* Founders */}
          {founders && (
            <p
              className="font-body text-[14px] font-medium tracking-[0.04em] mt-2"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {founders}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
