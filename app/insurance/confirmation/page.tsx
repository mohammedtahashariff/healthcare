import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Application Submitted | Medick Medical Management",
  description: "Your insurance application has been submitted successfully",
}

export default function InsuranceConfirmationPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Application Submitted Successfully</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-muted-foreground">
              <p>Thank you for submitting your insurance application.</p>
              <p>Our team will review your application and contact you within 2-3 business days.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Next Steps:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Review your email for a confirmation message</li>
                <li>Prepare any additional documentation that may be requested</li>
                <li>Our insurance specialist will contact you to discuss your coverage options</li>
              </ul>
            </div>
            <div className="flex justify-center space-x-4 pt-4">
              <Button asChild variant="outline">
                <Link href="/dashboard">Return to Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/insurance">Submit Another Application</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 