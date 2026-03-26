import HeroSection from './components/HeroSection'
import SolutionsSection from './components/SolutionsSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <SolutionsSection />
    </main>
  )
}
