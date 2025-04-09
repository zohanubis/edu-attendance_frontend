"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"

// Define public routes that don't require authentication
const publicRoutes = ["/", "/login", "/public-activities", "/public-posts"]

export function useAuthRedirect() {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (isLoading) return

        // Allow public routes
        if (publicRoutes.some(route => pathname.startsWith(route)) &&
            !pathname.includes("/student-") &&
            !pathname.includes("/admin/")) {
            return
        }

        // Redirect to login if not authenticated
        if (!user && pathname !== "/login") {
            router.push("/login")
            return
        }

        // Redirect from login page if already authenticated
        if (user && pathname === "/login") {
            router.push(user.role === "admin" ? "/admin/dashboard" : "/student/dashboard")
            return
        }

        // Handle student routes
        if (pathname.startsWith("/student-")) {
            if (user?.role !== "student") {
                router.push("/")
                return
            }

            // Check for union worker status
            if ((pathname.startsWith("/student-attendance/manage") ||
                pathname.startsWith("/student-attendance/dashboard")) &&
                !user.status) {
                router.push("/student-dashboard")
                return
            }
        }

        // Handle admin routes
        if (pathname.startsWith("/admin") && user?.role !== "admin") {
            router.push("/")
            return
        }
    }, [user, isLoading, pathname, router])
} 