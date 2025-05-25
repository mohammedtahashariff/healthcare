const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/medick-medical", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor", "admin"], default: "patient" },
  createdAt: { type: Date, default: Date.now },
})

// Health Record Schema
const healthRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  heartRate: Number,
  bloodPressure: String,
  temperature: Number,
  oxygenSaturation: Number,
  weight: Number,
  height: Number,
  bmi: Number,
  recordedAt: { type: Date, default: Date.now },
})

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  type: { type: String, enum: ["virtual", "in-person"], default: "virtual" },
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
  symptoms: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model("User", userSchema)
const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema)
const Appointment = mongoose.model("Appointment", appointmentSchema)

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Access token required" })
  }

  jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" })
    }
    req.user = user
    next()
  })
}

// Routes

// User Registration
app.post("/api/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    })

    await user.save()

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "24h",
    })

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error during registration" })
  }
})

// User Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "24h",
    })

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error during login" })
  }
})

// Save Health Record
app.post("/api/health-records", authenticateToken, async (req, res) => {
  try {
    const { heartRate, bloodPressure, temperature, oxygenSaturation, weight, height } = req.body

    // Calculate BMI if weight and height are provided
    let bmi = null
    if (weight && height) {
      bmi = Number.parseFloat((weight / Math.pow(height / 100, 2)).toFixed(1))
    }

    const healthRecord = new HealthRecord({
      userId: req.user.userId,
      heartRate,
      bloodPressure,
      temperature,
      oxygenSaturation,
      weight,
      height,
      bmi,
    })

    await healthRecord.save()

    res.status(201).json({
      message: "Health record saved successfully",
      record: healthRecord,
    })
  } catch (error) {
    console.error("Health record error:", error)
    res.status(500).json({ message: "Server error saving health record" })
  }
})

// Get Health Records
app.get("/api/health-records", authenticateToken, async (req, res) => {
  try {
    const records = await HealthRecord.find({ userId: req.user.userId }).sort({ recordedAt: -1 }).limit(10)

    res.json(records)
  } catch (error) {
    console.error("Get health records error:", error)
    res.status(500).json({ message: "Server error fetching health records" })
  }
})

// Get all appointments
app.get("/api/appointments", authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query
    let query = {}

    // Add date range filter if provided
    if (startDate && endDate) {
      query.appointmentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    // Add status filter if provided
    if (status) {
      query.status = status
    }

    // If user is a patient, only show their appointments
    if (req.user.role === "patient") {
      query.patientId = req.user.userId
    }
    // If user is a doctor, only show their appointments
    else if (req.user.role === "doctor") {
      query.doctorId = req.user.userId
    }

    const appointments = await Appointment.find(query)
      .populate("patientId", "firstName lastName email phone")
      .populate("doctorId", "firstName lastName")
      .sort({ appointmentDate: 1, appointmentTime: 1 })

    res.json(appointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    res.status(500).json({ message: "Server error while fetching appointments" })
  }
})

// Create new appointment
app.post("/api/appointments", authenticateToken, async (req, res) => {
  try {
    const {
      doctorId,
      appointmentDate,
      appointmentTime,
      type,
      symptoms,
      notes,
    } = req.body

    // Validate required fields
    if (!appointmentDate || !appointmentTime || !type) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    // Check if the time slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: "scheduled",
    })

    if (existingAppointment) {
      return res.status(400).json({ message: "Time slot is not available" })
    }

    const appointment = new Appointment({
      patientId: req.user.userId,
      doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      type,
      symptoms,
      notes,
    })

    await appointment.save()

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("patientId", "firstName lastName email phone")
      .populate("doctorId", "firstName lastName")

    res.status(201).json(populatedAppointment)
  } catch (error) {
    console.error("Error creating appointment:", error)
    res.status(500).json({ message: "Server error while creating appointment" })
  }
})

// Update appointment status
app.patch("/api/appointments/:id/status", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!["scheduled", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const appointment = await Appointment.findById(id)

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" })
    }

    // Check if user has permission to update the appointment
    if (
      req.user.role !== "admin" &&
      req.user.userId !== appointment.patientId.toString() &&
      req.user.userId !== appointment.doctorId?.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to update this appointment" })
    }

    appointment.status = status
    await appointment.save()

    const updatedAppointment = await Appointment.findById(id)
      .populate("patientId", "firstName lastName email phone")
      .populate("doctorId", "firstName lastName")

    res.json(updatedAppointment)
  } catch (error) {
    console.error("Error updating appointment status:", error)
    res.status(500).json({ message: "Server error while updating appointment status" })
  }
})

// Get available time slots for a doctor
app.get("/api/doctors/:id/available-slots", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { date } = req.query

    if (!date) {
      return res.status(400).json({ message: "Date is required" })
    }

    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    // Get all scheduled appointments for the doctor on the given date
    const appointments = await Appointment.find({
      doctorId: id,
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: "scheduled",
    })

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

    res.json(timeSlots)
  } catch (error) {
    console.error("Error fetching available time slots:", error)
    res.status(500).json({ message: "Server error while fetching available time slots" })
  }
})

// Get User Profile
app.get("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({ message: "Server error fetching profile" })
  }
})

// Update User Profile
app.put("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body
    const user = await User.findByIdAndUpdate(req.user.userId, { firstName, lastName, phone }, { new: true }).select(
      "-password",
    )

    res.json({ message: "Profile updated successfully", user })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ message: "Server error updating profile" })
  }
})

// AI Symptom Checker (Mock Implementation)
app.post("/api/ai/symptom-check", authenticateToken, async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body

    // Mock AI response - In production, integrate with actual AI service
    const mockDiagnosis = {
      symptoms: symptoms,
      possibleConditions: [
        { condition: "Common Cold", probability: 75, severity: "Mild" },
        { condition: "Seasonal Allergies", probability: 60, severity: "Mild" },
        { condition: "Viral Infection", probability: 45, severity: "Moderate" },
      ],
      recommendations: [
        "Rest and stay hydrated",
        "Monitor symptoms for 24-48 hours",
        "Consult a doctor if symptoms worsen",
        "Consider over-the-counter medications for symptom relief",
      ],
      urgency: "Low",
      disclaimer: "This is an AI-generated assessment. Please consult a healthcare professional for proper diagnosis.",
    }

    res.json(mockDiagnosis)
  } catch (error) {
    console.error("Symptom check error:", error)
    res.status(500).json({ message: "Server error during symptom analysis" })
  }
})

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "Medick Medical API is running!" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
