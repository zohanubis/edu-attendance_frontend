import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ["/", "/login", "/public-activities", "/public-posts"]

// Define role-based route patterns
const studentRoutes = ["/student-"]
const adminRoutes = ["/admin"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const user = request.cookies.get("user")?.value
    ? JSON.parse(request.cookies.get("user")?.value || "{}")
    : null

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route)) && !pathname.includes("/student-") && !pathname.includes("/admin/")) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Handle student routes
  if (pathname.startsWith("/student-")) {
    if (user.role !== "student") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Check for union worker status for specific routes
    if (
      (pathname.startsWith("/student-attendance/manage") ||
        pathname.startsWith("/student-attendance/dashboard")) &&
      !user.status
    ) {
      return NextResponse.redirect(new URL("/student-dashboard", request.url))
    }
  }

  // Handle admin routes
  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
