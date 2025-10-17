import { Hero } from '@/components/features/hero/Hero'
import { Philosophy } from '@/components/features/philosophy/Philosophy'
import { ServicesSection } from '@/components/features/services/ServicesSection'
import { DualVision } from '@/components/features/team/DualVision'
import { ClosingCTA } from '@/components/features/cta/ClosingCTA'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Philosophy />
      <ServicesSection />
      <DualVision />
      <ClosingCTA />
    </main>
  );
}
