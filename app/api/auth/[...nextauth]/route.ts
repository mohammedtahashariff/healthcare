import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    role: string
  }
  
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string
    role: string
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials')
        }

        const db = await connectToDatabase()
        const user = await db.collection("users").findOne({ email: credentials.email })

        if (!user) {
          throw new Error('No user found')
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error('Invalid password')
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.userId
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  }
})

export { handler as GET, handler as POST } 