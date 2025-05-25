import { Metadata } from "next"
import { InsuranceApplicationForm } from "@/components/insurance/insurance-form"

export const metadata: Metadata = {
  title: "Insurance Application | Medick Medical Management",
  description: "Apply for medical insurance coverage",
}

export default function InsurancePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Insurance Application</h1>
            <p className="text-muted-foreground mt-2">
              Apply for medical insurance coverage. Please fill out all required information accurately.
            </p>
          </div>
          <InsuranceApplicationForm />
        </div>
      </div>
    </div>
  )
} 