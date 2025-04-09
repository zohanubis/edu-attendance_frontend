"use client"

import Link from "next/link"
import Image from "next/image"
import { Github } from "lucide-react"
import { cn } from "@/lib/utils"

interface FooterProps {
    className?: string
}

export function Footer({ className }: FooterProps) {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container flex items-center h-14 max-w-full px-4">
                <p className="text-sm text-muted-foreground">
                    Built with ❤️ by HUIT Students
                </p>
            </div>
        </footer>
    )
} 