"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-provider"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    ClipboardList,
    Settings,
    LogOut,
} from "lucide-react"

interface NavItem {
    title: string
    href: string
    icon: React.ReactNode
    roles: string[]
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/student-dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />,
        roles: ["student", "admin"],
    },
    {
        title: "Activities",
        href: "/student-activities",
        icon: <Calendar className="h-4 w-4" />,
        roles: ["student", "admin"],
    },
    {
        title: "Posts",
        href: "/student-posts",
        icon: <FileText className="h-4 w-4" />,
        roles: ["student", "admin"],
    },
    {
        title: "Attendance",
        href: "/student-attendance/manage",
        icon: <ClipboardList className="h-4 w-4" />,
        roles: ["student"],
    },
    {
        title: "Manage Users",
        href: "/admin/manage-users",
        icon: <Users className="h-4 w-4" />,
        roles: ["admin"],
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: <Settings className="h-4 w-4" />,
        roles: ["admin"],
    },
]

interface SidebarNavProps {
    role: string
}

export function SidebarNav({ role }: SidebarNavProps) {
    const pathname = usePathname()
    const { isCollapsed } = useSidebar()

    const filteredNavItems = navItems.filter((item) =>
        item.roles.includes(role)
    )

    return (
        <div className="space-y-1">
            {filteredNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                    <Button
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className={cn(
                            "w-full justify-start",
                            isCollapsed && "justify-center"
                        )}
                    >
                        {item.icon}
                        {!isCollapsed && <span className="ml-2">{item.title}</span>}
                    </Button>
                </Link>
            ))}
        </div>
    )
}

export function SidebarNavFooter() {
    return (
        <Button variant="ghost" className="w-full justify-start">
            <LogOut className="h-4 w-4" />
            <span className="ml-2">Logout</span>
        </Button>
    )
} 