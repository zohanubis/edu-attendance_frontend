"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { redirect } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, isLoading } = useAuth()
    const { open: isOpen } = useSidebar()

    // Show loading state while auth is being fetched
    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    // Redirect to login if not authenticated or not an admin
    if (!user || user.role !== "admin") {
        redirect("/login")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar className="fixed top-0 z-50 w-full" />
            <div className="flex flex-1 pt-16">
                <AdminSidebar />
                <main className={`flex-1 transition-all duration-300 ${isOpen ? "md:ml-64" : "md:ml-[70px]"}`}>
                    <div className="container mx-auto p-6">
                        {children}
                    </div>
                </main>
            </div>
            <Footer className="mt-auto" />
        </div>
    )
} 