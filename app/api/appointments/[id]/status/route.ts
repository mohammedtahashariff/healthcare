import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req })

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { id } = params
    const { status } = await req.json()

    if (!["scheduled", "completed", "cancelled"].includes(status)) {
      return new NextResponse("Invalid status", { status: 400 })
    }

    const db = await connectToDatabase()
    const appointmentsCollection = db.collection("appointments")

    const appointment = await appointmentsCollection.findOne({
      _id: new ObjectId(id),
    })

    if (!appointment) {
      return new NextResponse("Appointment not found", { status: 404 })
    }

    // Check if user has permission to update the appointment
    if (
      token.role !== "admin" &&
      token.userId !== appointment.patientId.toString() &&
      token.userId !== appointment.doctorId?.toString()
    ) {
      return new NextResponse("Not authorized to update this appointment", {
        status: 403,
      })
    }

    await appointmentsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    )

    // Fetch the updated appointment with patient and doctor details
    const updatedAppointment = await appointmentsCollection
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "users",
            localField: "patientId",
            foreignField: "_id",
            as: "patient",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctor",
          },
        },
        {
          $project: {
            _id: 1,
            appointmentDate: 1,
            appointmentTime: 1,
            type: 1,
            status: 1,
            symptoms: 1,
            notes: 1,
            "patient.firstName": 1,
            "patient.lastName": 1,
            "patient.email": 1,
            "patient.phone": 1,
            "doctor.firstName": 1,
            "doctor.lastName": 1,
          },
        },
      ])
      .toArray()

    return NextResponse.json(updatedAppointment[0])
  } catch (error) {
    console.error("Error updating appointment status:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 