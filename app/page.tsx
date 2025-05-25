import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { VirtualAppointmentSection } from "@/components/virtual-appointment-section"
import { PrescriptionSection } from "@/components/prescription-section"
import { MapSection } from "@/components/map-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <VirtualAppointmentSection />
      <PrescriptionSection />
      <MapSection />
      <Footer />
    </div>
  )
}
