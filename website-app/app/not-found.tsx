import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center bg-background">
        <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center gap-6 text-center">
          <img
            src="https://huit.edu.vn/Images/Documents/N00CT/logo-huit-web-chinh-moi-mau-xanh-02.svg?h=80"
            alt="HUIT Logo"
            className="h-20 w-auto"
          />
          <h1 className="text-4xl font-bold tracking-tight">404 - Page Not Found</h1>
          <p className="text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
