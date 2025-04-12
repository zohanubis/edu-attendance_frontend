import type React from "react"
import Link from "next/link"
import { Facebook, Github, Linkedin } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, "border-t bg-background")}>
      <div className="container flex flex-col gap-10 py-10 md:flex-row">
        <div className="flex flex-col gap-2 md:gap-4 md:w-1/3">
          <Link href="/" className="flex items-center">
            <img
              src="https://huit.edu.vn/Images/Documents/N00CT/logo-huit-web-chinh-moi-mau-xanh-02.svg?h=80"
              alt="HUIT Logo"
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-sm text-muted-foreground">
            Student Activity Management System - HCMC University of Industry and Trade
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              href="https://github.com/zohanubis"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/zohanubis/"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://www.facebook.com/phamhodanghuy14102003/"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
            >
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:w-2/3">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Links</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-foreground">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-foreground">
                  Posts
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Contact</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="https://huit.edu.vn" target="_blank" className="hover:text-foreground">
                  HCMC University of Industry and Trade
                </Link>
              </li>
              <li>
                <Link href="mailto:info@huit.edu.vn" className="hover:text-foreground">
                  info@huit.edu.vn
                </Link>
              </li>
              <li>
                <Link href="tel:+84283894897" className="hover:text-foreground">
                  (028) 3894 7897
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Author</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <span className="block">Pham Ho Dang Huy (Zohanubis)</span>
                <span className="block">Student ID: 2001215828</span>
              </li>
              <li>
                <span className="block">Major: Software Engineering</span>
              </li>
              <li>
                <Link href="https://portfolio-zohanubis.vercel.app/" target="_blank" className="hover:text-foreground">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container flex flex-col items-center justify-between gap-4 border-t py-6 md:h-16 md:flex-row md:py-0">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} HUIT Student Portal. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
