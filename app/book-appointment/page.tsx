import { Metadata } from "next"
import { AppointmentForm } from "@/components/appointment-form"

export const metadata: Metadata = {
  title: "Book Appointment | Medick Medical Management",
  description: "Book an appointment with one of our healthcare professionals",
}

export default function BookAppointmentPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Book an Appointment</h1>
            <p className="text-muted-foreground">
              Schedule a consultation with one of our healthcare professionals.
            </p>
          </div>
          <AppointmentForm />
        </div>
      </div>
    </div>
  )
}
