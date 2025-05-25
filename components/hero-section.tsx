import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h6 className="text-blue-600 font-semibold text-lg mb-4 tracking-wide">MEDICAL EXCELLENCE</h6>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Better Doctors.
            <br />
            <span className="text-blue-600">Better Care.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience world-class healthcare with our comprehensive medical platform. From virtual consultations to
            AI-powered diagnostics, we're here for your health journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              <Link href="/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-3">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 text-white">
          <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  )
}
