"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-provider"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
    const { isCollapsed } = useSidebar()
    return (
        <div
            className={cn(
                "flex h-screen flex-col border-r bg-background transition-all duration-300",
                isCollapsed ? "w-16" : "w-64",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function SidebarHeader({ className, children, ...props }: SidebarProps) {
    const { isCollapsed, toggleCollapse } = useSidebar()
    const { theme, setTheme } = useTheme()

    return (
        <div
            className={cn(
                "flex h-14 items-center justify-between border-b px-4",
                className
            )}
            {...props}
        >
            {!isCollapsed && <div className="font-semibold">Edu Attendance</div>}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleCollapse}>
                    <ChevronLeft
                        className={cn(
                            "h-4 w-4 transition-transform",
                            isCollapsed && "rotate-180"
                        )}
                    />
                </Button>
            </div>
        </div>
    )
}

export function SidebarContent({ className, children, ...props }: SidebarProps) {
    return (
        <div
            className={cn("flex-1 overflow-auto py-2", className)}
            {...props}
        >
            {children}
        </div>
    )
}

export function SidebarFooter({ className, children, ...props }: SidebarProps) {
    return (
        <div
            className={cn("border-t p-4", className)}
            {...props}
        >
            {children}
        </div>
    )
}

export function SidebarGroup({ className, children, ...props }: SidebarProps) {
    return (
        <div
            className={cn("px-2 py-2", className)}
            {...props}
        >
            {children}
        </div>
    )
} 