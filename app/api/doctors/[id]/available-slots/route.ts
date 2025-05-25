import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req })

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { id } = params
    const { searchParams } = new URL(req.url)
    const date = searchParams.get("date")

    if (!date) {
      return new NextResponse("Date is required", { status: 400 })
    }

    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const db = await connectToDatabase()
    const appointmentsCollection = db.collection("appointments")

    // Get all scheduled appointments for the doctor on the given date
    const appointments = await appointmentsCollection.find({
      doctorId: new ObjectId(id),
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: "scheduled",
    }).toArray()

    // Generate all possible time slots (e.g., every 30 minutes from 9 AM to 5 PM)
    const timeSlots = []
    const startHour = 9
    const endHour = 17
    const intervalMinutes = 30

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        if (!appointments.some(apt => apt.appointmentTime === time)) {
          timeSlots.push(time)
        }
      }
    }

    return NextResponse.json(timeSlots)
  } catch (error) {
    console.error("Error fetching available time slots:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 