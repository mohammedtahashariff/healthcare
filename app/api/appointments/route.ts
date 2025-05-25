import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const status = searchParams.get("status")

    const db = await connectToDatabase()
    const appointmentsCollection = db.collection("appointments")

    let query: any = {}

    if (startDate && endDate) {
      query.appointmentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    if (status) {
      query.status = status
    }

    // If user is a patient, only show their appointments
    if (token.role === "patient") {
      query.patientId = token.userId
    }
    // If user is a doctor, only show their appointments
    else if (token.role === "doctor") {
      query.doctorId = token.userId
    }

    const appointments = await appointmentsCollection
      .aggregate([
        { $match: query },
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

    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const {
      doctorId,
      appointmentDate,
      appointmentTime,
      type,
      symptoms,
      notes,
    } = body

    // Validate required fields
    if (!appointmentDate || !appointmentTime || !type) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const db = await connectToDatabase()
    const appointmentsCollection = db.collection("appointments")

    // Check if the time slot is available
    const existingAppointment = await appointmentsCollection.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: "scheduled",
    })

    if (existingAppointment) {
      return new NextResponse("Time slot is not available", { status: 400 })
    }

    const appointment = {
      patientId: token.userId,
      doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      type,
      symptoms,
      notes,
      status: "scheduled",
      createdAt: new Date(),
    }

    const result = await appointmentsCollection.insertOne(appointment)

    // Fetch the created appointment with patient and doctor details
    const createdAppointment = await appointmentsCollection
      .aggregate([
        { $match: { _id: result.insertedId } },
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

    return NextResponse.json(createdAppointment[0], { status: 201 })
  } catch (error) {
    console.error("Error creating appointment:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 