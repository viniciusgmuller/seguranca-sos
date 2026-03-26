export const dynamic = 'force-dynamic'

import HeroSection from './components/HeroSection'
import SolutionsSection from './components/SolutionsSection'
import WhySection from './components/WhySection'
import ClientsSection from './components/ClientsSection'
import PhotosSection from './components/PhotosSection'
import HistorySection from './components/HistorySection'
import ContactSection from './components/ContactSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <SolutionsSection />
      <WhySection />
      <ClientsSection />
      <PhotosSection />
      <HistorySection />
      <ContactSection />
    </main>
  )
}
