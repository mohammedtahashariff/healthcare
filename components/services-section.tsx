import { Card, CardContent } from "@/components/ui/card"
import { Users, Shield, Bot, Heart, TreesIcon as Lungs, Droplets } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Users,
      category: "Easy",
      title: "Seamless Registration",
      description:
        "Book appointments with doctors of your choice for both in-person and virtual consultations with just a few clicks.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Shield,
      category: "Health",
      title: "Health Metrics",
      description:
        "Monitor your vital signs, calculate BMI, and detect nutrient deficiencies with our comprehensive health tracking tools.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Bot,
      category: "AI",
      title: "AI Chatbot",
      description:
        "Get instant symptom analysis and health recommendations from our advanced AI-powered medical assistant.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Heart,
      category: "Detection",
      title: "Heart Disease Detection",
      description:
        "Early detection of cardiovascular conditions using machine learning algorithms and medical data analysis.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Lungs,
      category: "Screening",
      title: "Lung Disease Detection",
      description: "Advanced pulmonary health screening using AI-powered image analysis and diagnostic tools.",
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      icon: Droplets,
      category: "Emergency",
      title: "Blood Bank Services",
      description:
        "Connect with blood donors and manage blood donation drives through our integrated blood bank system.",
      color: "bg-orange-100 text-orange-600",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-blue-600 font-semibold text-lg mb-4 tracking-wide">OUR SERVICES</h6>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Comprehensive Healthcare Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From preventive care to emergency services, we provide a complete range of medical solutions powered by
            cutting-edge technology and compassionate care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`p-3 rounded-xl ${service.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        {service.category}
                      </p>
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
