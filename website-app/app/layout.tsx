import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { SidebarProvider } from "@/components/providers/sidebar-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "EDU Attendance",
    description: "Student attendance management system",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
                inter.className
            )}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <SidebarProvider defaultOpen={true}>
                            {children}
                            <Toaster />
                        </SidebarProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    )
} 