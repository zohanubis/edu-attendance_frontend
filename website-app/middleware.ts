import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define public routes that don't require authentication
const publicRoutes = ["/", "/login", "/activities", "/posts", "/activities/[id]", "/posts/[id]"]

// Define routes that require specific roles
const adminRoutes = ["/admin"]
const studentRoutes = ["/dashboard", "/my-activities", "/profile"]
const youthUnionRoutes = ["/attendance"]

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if the path is a public route
    const isPublicRoute = publicRoutes.some(route => {
        // Handle dynamic routes with parameters
        if (route.includes("[id]")) {
            const pattern = new RegExp(`^${route.replace("[id]", "[^/]+")}$`)
            return pattern.test(pathname)
        }
        return pathname === route || pathname.startsWith(`${route}/`)
    })

    if (isPublicRoute) {
        return NextResponse.next()
    }

    // Get user data from cookies
    const token = request.cookies.get("token")?.value
    const userStr = request.cookies.get("user")?.value

    // If no token or user data, redirect to login
    if (!token || !userStr) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // Parse user data
    let user
    try {
        user = JSON.parse(userStr)
    } catch (error) {
        // Invalid user data, redirect to login
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // Check role-based access
    const userRole = user.role

    // Admin routes
    if (adminRoutes.some(route => pathname.startsWith(route))) {
        if (userRole !== "admin") {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    // Student routes
    if (studentRoutes.some(route => pathname.startsWith(route))) {
        if (userRole !== "student" && userRole !== "youth-union") {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    // Youth Union routes
    if (youthUnionRoutes.some(route => pathname.startsWith(route))) {
        if (userRole !== "youth-union") {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|public).*)",
    ],
} 