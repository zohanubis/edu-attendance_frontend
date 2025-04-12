import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { SonnerProvider } from "@/components/sonner-provider"

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <main className="flex-1">
                    <div className="container py-6">{children}</div>
                </main>
                <SiteFooter />
            </div>
            <SonnerProvider />
        </ThemeProvider>
    )
} 