import HeroSection from './components/HeroSection'
import SolutionsSection from './components/SolutionsSection'
import WhySection from './components/WhySection'
import ClientsSection from './components/ClientsSection'
import HistorySection from './components/HistorySection'
import PhotosSection from './components/PhotosSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <SolutionsSection />
      <WhySection />
      <ClientsSection />
      <HistorySection />
      <PhotosSection />
    </main>
  )
}
