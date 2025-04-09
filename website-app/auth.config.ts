import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: "student" | "admin"
            status: boolean
            avatar: string
            name?: string | null
            email?: string | null
        }
    }
}

// Mock users for demonstration
const users = [
    {
        id: "1",
        name: "Student User",
        email: "student@example.com",
        password: "123",
        role: "student" as const,
        status: true, // union worker
        avatar: "/avatars/student.png"
    },
    {
        id: "2",
        name: "Admin User",
        email: "admin@example.com",
        password: "123",
        role: "admin" as const,
        status: false,
        avatar: "/avatars/admin.png"
    }
]

export const authConfig = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const { email, password } = credentials

                // Find user with matching credentials
                const user = users.find(user =>
                    user.email === email && user.password === password
                )

                if (!user) return null

                // Return user data (excluding password)
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                    avatar: user.avatar
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.status = user.status
                token.avatar = user.avatar
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as "student" | "admin"
                session.user.status = token.status as boolean
                session.user.avatar = token.avatar as string
            }
            return session
        }
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key-for-development"
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig) 