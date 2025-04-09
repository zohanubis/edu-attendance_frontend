"use client"

import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

interface User {
    id: string
    name: string
    email: string
    role: "student" | "admin"
    status?: boolean // for union worker status
    avatar?: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const MOCK_USERS = [
    {
        id: "1",
        name: "Phạm Hồ Đăng Huy",
        email: "student@example.com",
        role: "student",
        status: true, // union worker
        avatar: "/avatar.jpg"
    },
    {
        id: "2",
        name: "Admin",
        email: "admin@example.com",
        role: "admin",
        avatar: "/avatar.jpg"
    }
] as const

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check for saved auth state in cookies
        const savedUser = Cookies.get("user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        // Mock login
        if (password !== "123") {
            throw new Error("Invalid credentials")
        }

        const foundUser = MOCK_USERS.find(u => u.email === email)
        if (!foundUser) {
            throw new Error("User not found")
        }

        setUser(foundUser)
        // Set cookie with 7 days expiry
        Cookies.set("user", JSON.stringify(foundUser), { expires: 7 })
    }

    const logout = () => {
        setUser(null)
        Cookies.remove("user")
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
} 