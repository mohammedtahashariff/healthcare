import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Video, Clock, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"

export function VirtualAppointmentSection() {
  const features = [
    {
      icon: Video,
      title: "HD Video Consultations",
      description: "Crystal clear video calls with medical professionals",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock access to healthcare services",
    },
    {
      icon: DollarSign,
      title: "Free Consultations",
      description: "Complimentary virtual appointments for basic health queries",
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book appointments that fit your schedule",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h6 className="text-blue-600 font-semibold text-lg mb-4 tracking-wide">VIRTUAL CARE</h6>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Free Virtual Appointments</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                As part of our commitment to accessible healthcare, we offer free virtual consultations with qualified
                medical professionals. Get expert medical advice from the comfort of your home.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Experience the future of healthcare with our state-of-the-art telemedicine platform. No waiting rooms,
                no travel time – just quality care when you need it.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Link href="/book-appointment">Book Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-3">
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-xl w-fit mx-auto mb-4">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
