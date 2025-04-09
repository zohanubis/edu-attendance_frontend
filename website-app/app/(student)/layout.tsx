"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { redirect } from "next/navigation"
import { StudentSidebar } from "@/components/student/student-sidebar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, isLoading } = useAuth()

    // Show loading state while auth is being fetched
    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    // Redirect to login if not authenticated or not a student
    if (!user || user.role !== "student") {
        redirect("/login")
    }

    return (
        <SidebarProvider defaultOpen>
            <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden">
                <Navbar />
                <div className="flex-1 flex w-full">
                    <StudentSidebar />
                    <main className="flex-1 overflow-auto w-full">
                        <div className="container mx-auto p-6 max-w-full">
                            {children}
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </SidebarProvider>
    )
}
