import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pill, Upload, Truck, Shield } from "lucide-react"

export function PrescriptionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-100 border-0 shadow-xl">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                    <Pill className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Prescription Services</h2>
                </div>

                <p className="text-xl text-gray-700 leading-relaxed">
                  Upload your prescription and get your medications delivered right to your doorstep. We partner with
                  trusted pharmacies to ensure you receive genuine medicines quickly and safely.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Upload className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Easy prescription upload</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Fast home delivery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Verified medications</span>
                  </div>
                </div>

                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 mt-8">
                  <a href="https://www.apollopharmacy.in/upload-prescription" target="_blank" rel="noopener noreferrer">
                    Order with Prescription
                  </a>
                </Button>
              </div>

              {/* Visual Element */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center space-y-4">
                    <div className="bg-green-100 text-green-600 p-4 rounded-full w-fit mx-auto">
                      <Pill className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Quick & Secure</h3>
                    <p className="text-gray-600">
                      Your health is our priority. We ensure all prescriptions are verified by licensed pharmacists
                      before delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
