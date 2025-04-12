"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type UserRole = "public" | "student" | "youth-union" | "admin"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (credentials: { studentId: string; password: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      setIsLoading(true)
      const token = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse user data", error)
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (credentials: { studentId: string; password: string }) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data based on student ID
    // In a real app, this would come from your backend
    let mockUser: User

    if (credentials.studentId === "admin") {
      mockUser = {
        id: "admin",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        avatar: "https://placehold.co/200/png",
      }
    } else if (credentials.studentId === "youth") {
      mockUser = {
        id: "2001215828",
        name: "Pham Ho Dang Huy",
        email: "2001215828@huit.edu.vn",
        role: "youth-union",
        avatar: "https://placehold.co/200/png",
      }
    } else {
      mockUser = {
        id: credentials.studentId,
        name: "Student User",
        email: `${credentials.studentId}@huit.edu.vn`,
        role: "student",
        avatar: "https://placehold.co/200/png",
      }
    }

    // Store user data
    localStorage.setItem("token", "mock-jwt-token")
    localStorage.setItem("user", JSON.stringify(mockUser))
    setUser(mockUser)
    setIsLoading(false)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
