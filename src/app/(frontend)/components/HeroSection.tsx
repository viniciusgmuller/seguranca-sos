import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function HeroSection() {
  const payload = await getPayload({ config })

  const heroData = await payload.findGlobal({
    slug: 'hero-section',
  })

  const { eyebrow, title, description, backgroundImage, ctaText, stats } = heroData

  const bgImage =
    backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage
      ? backgroundImage
      : null

  return (
    <section className="relative w-full min-h-[720px] bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Background image */}
      {bgImage?.url && (
        <Image
          src={bgImage.url}
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
      )}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(156,202,51,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(156,202,51,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Green accent line top-left */}
      <div className="absolute top-0 left-20 w-[120px] h-[3px] bg-primary" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-20 pt-24 md:pt-[120px] pb-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-6">
          <span className="block w-8 h-[2px] bg-primary" />
          <span
            className="font-body text-[13px] font-medium uppercase tracking-[0.16em] text-primary"
          >
            {eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-4xl md:text-[72px] font-bold text-white tracking-[-0.03em] leading-[1.1] md:leading-[76px] max-w-[800px] mb-6">
          {title}
        </h1>

        {/* Description */}
        <p className="font-body text-base md:text-[18px] font-normal text-white/55 leading-7 max-w-[540px] mb-10">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#email-form"
            className="inline-flex items-center justify-center px-7 py-3 bg-primary text-[#0a0a0a] rounded-md font-body text-[15px] font-medium hover:bg-primary/90 transition-colors"
          >
            {ctaText}
          </a>
          <a
            href="#Solucoes"
            className="inline-flex items-center justify-center px-7 py-3 border border-white/15 rounded-md font-body text-[15px] font-medium text-white/70 hover:border-white/30 hover:text-white/90 transition-colors"
          >
            Nossas Soluções
          </a>
        </div>
      </div>

      {/* Stats bar */}
      {stats && stats.length > 0 && (
        <div className="relative z-10 px-8 md:px-20 pb-[60px]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div className="hidden md:block w-[1px] h-12 bg-white/10 mx-10" />
                )}
                <div className="flex flex-col">
                  <span className="font-heading text-3xl md:text-[36px] font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="font-body text-[13px] font-normal uppercase tracking-[0.16em] text-white/40 mt-1">
                    {stat.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
