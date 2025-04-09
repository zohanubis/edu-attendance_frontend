"use client"

import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

interface MainLayoutProps {
    children: React.ReactNode
    showNav?: boolean // Optional prop to control navbar visibility
}

export default function MainLayout({ children, showNav = true }: MainLayoutProps) {
    return (
        <AuthProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <div className={inter.className}>
                    <div className="min-h-screen flex flex-col">
                        {children}
                    </div>
                    <Toaster richColors closeButton position="top-right" />
                </div>
            </ThemeProvider>
        </AuthProvider>
    )
} 