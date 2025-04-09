import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string
            role: "student" | "admin"
            status: boolean
            avatar: string
        } & DefaultSession["user"]
    }

    interface User {
        role: "student" | "admin"
        status: boolean
        avatar: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: "student" | "admin"
        status: boolean
        avatar: string
    }
} 