# Medick Medical - MERN Stack Healthcare Platform

A comprehensive healthcare management system built with MongoDB, Express.js, React.js (Next.js), and Node.js.

## Features

- 🏥 **Healthcare Dashboard** - Complete patient management system
- 👨‍⚕️ **Virtual Appointments** - Book and manage online consultations
- 📊 **Health Monitoring** - Track vital signs and health metrics
- 🤖 **AI Chatbot** - Symptom checker and health recommendations
- 💊 **Prescription Management** - Digital prescription handling
- 🩸 **Blood Bank Integration** - Blood donation and request system
- 🫀 **Disease Detection** - AI-powered heart and lung disease screening
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## Installation & Setup

### 1. Clone the Repository
\`\`\`bash
git clone <your-repo-url>
cd medick-medical-mern
\`\`\`

### 2. Install Frontend Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Install Backend Dependencies
\`\`\`bash
cd server
npm init -y
npm install express mongoose cors bcryptjs jsonwebtoken dotenv
npm install -D nodemon
\`\`\`

### 4. Set Up Environment Variables
\`\`\`bash
# In the server directory, create a .env file
cp .env.example .env
\`\`\`

Edit the `.env` file with your configuration:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/medick-medical
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
FRONTEND_URL=http://localhost:3000
\`\`\`

### 5. Start MongoDB
Make sure MongoDB is running on your system:

**Windows:**
\`\`\`bash
mongod
\`\`\`

**macOS (with Homebrew):**
\`\`\`bash
brew services start mongodb-community
\`\`\`

**Linux:**
\`\`\`bash
sudo systemctl start mongod
\`\`\`

### 6. Start the Backend Server
\`\`\`bash
cd server
npm run dev
\`\`\`

The backend will run on `http://localhost:5000`

### 7. Start the Frontend Development Server
\`\`\`bash
# In the root directory
npm run dev
\`\`\`

The frontend will run on `http://localhost:3000`

## Project Structure

\`\`\`
medick-medical-mern/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── login/             # Authentication pages
│   ├── health-monitor/    # Health tracking
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation component
│   ├── hero-section.tsx  # Landing page hero
│   └── ...               # Other components
├── server/               # Backend API
│   ├── server.js         # Express server
│   ├── models/           # MongoDB models
│   └── routes/           # API routes
├── public/               # Static assets
└── README.md            # This file
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Health Records
- `POST /api/health-records` - Save health data
- `GET /api/health-records` - Get user's health records

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get user's appointments

### Health Check
- `GET /api/health` - API status check

## Usage Guide

### 1. User Registration
1. Navigate to the login page
2. Click on "Sign Up" tab
3. Fill in your details (name, email, phone, password)
4. Click "Create Account"

### 2. Health Monitoring
1. Go to "Health Monitor" from the navigation
2. Enter your vital signs (heart rate, blood pressure, etc.)
3. Click "Analyze Health Metrics"
4. View your health analysis and recommendations

### 3. Booking Appointments
1. Click "Book Now" on the virtual appointments section
2. Select your preferred date and time
3. Choose appointment type (virtual/in-person)
4. Add any symptoms or notes
5. Confirm your booking

### 4. Viewing Health History
1. Access your dashboard after logging in
2. View your health records timeline
3. Track your health progress over time

## Development Scripts

\`\`\`bash
# Frontend development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check code quality

# Backend development
cd server
npm run dev          # Start with nodemon (auto-restart)
npm start           # Start production server
\`\`\`

## Database Schema

### User Model
\`\`\`javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: String (patient/doctor/admin),
  createdAt: Date
}
\`\`\`

### Health Record Model
\`\`\`javascript
{
  userId: ObjectId,
  heartRate: Number,
  bloodPressure: String,
  temperature: Number,
  oxygenSaturation: Number,
  weight: Number,
  height: Number,
  bmi: Number,
  recordedAt: Date
}
\`\`\`

### Appointment Model
\`\`\`javascript
{
  patientId: ObjectId,
  doctorId: ObjectId,
  appointmentDate: Date,
  appointmentTime: String,
  type: String (virtual/in-person),
  status: String (scheduled/completed/cancelled),
  symptoms: String,
  notes: String,
  createdAt: Date
}
\`\`\`

## Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - Server-side validation for all inputs
- **CORS Protection** - Cross-origin request security
- **Environment Variables** - Sensitive data protection

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Backend (Railway/Heroku)
1. Create a new app on your hosting platform
2. Set environment variables
3. Deploy from GitHub

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Set up a cluster
3. Update MONGODB_URI in your environment variables

## Troubleshooting

### Common Issues

**MongoDB Connection Error:**
\`\`\`bash
# Make sure MongoDB is running
mongod --version
# Check if the service is active
\`\`\`

**Port Already in Use:**
\`\`\`bash
# Kill process on port 3000 or 5000
npx kill-port 3000
npx kill-port 5000
\`\`\`

**Module Not Found:**
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

**CORS Errors:**
- Check that FRONTEND_URL in .env matches your frontend URL
- Ensure the backend server is running

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information
4. Contact the development team

## Roadmap

### Phase 1 (Current)
- ✅ User authentication
- ✅ Health monitoring
- ✅ Appointment booking
- ✅ Responsive design

### Phase 2 (Upcoming)
- 🔄 AI chatbot integration
- 🔄 Real-time notifications
- 🔄 Doctor dashboard
- 🔄 Payment integration

### Phase 3 (Future)
- 📋 Telemedicine video calls
- 📋 Electronic health records
- 📋 Insurance integration
- 📋 Mobile app development

---

**Happy Coding! 🚀**

For any questions or support, please reach out to the development team.
#   H E A L T H  
 