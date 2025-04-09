"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart2, Calendar, FileText, LayoutDashboard, Settings, Users, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar
} from "@/components/ui/sidebar"

const adminNavItems = [
    {
        title: "Dashboard",
        href: "/admin-dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Activities",
        href: "/admin-activities",
        icon: Calendar,
    },
    {
        title: "Posts",
        href: "/admin-posts",
        icon: FileText,
    },
    {
        title: "Students",
        href: "/admin-students",
        icon: Users,
    },
    {
        title: "Statistics",
        href: "/admin-statistics",
        icon: BarChart2,
    },
    {
        title: "Settings",
        href: "/admin-settings",
        icon: Settings,
    },
]

export function AdminSidebar() {
    const { user, logout } = useAuth()
    const pathname = usePathname()
    const router = useRouter()
    const { open } = useSidebar()

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <Sidebar
            className={cn(
                "fixed left-0 top-16 h-[calc(100vh-4rem)] border-r transition-all duration-300 ease-in-out",
                open ? "w-64" : "w-[70px]"
            )}
        >
            <SidebarHeader>
                <div className="flex items-center justify-between px-4 py-2">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <span className={cn("text-xl transition-all duration-300",
                            open ? "opacity-100" : "opacity-0 w-0"
                        )}>
                            Admin
                        </span>
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {adminNavItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild isActive={isActive}>
                                    <Link href={item.href} className="flex items-center gap-2">
                                        <Icon className="h-4 w-4 flex-shrink-0" />
                                        <span className={cn("transition-all duration-300",
                                            open ? "opacity-100" : "opacity-0 w-0"
                                        )}>
                                            {item.title}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className={cn(
                "transition-all duration-300",
                open ? "opacity-100" : "opacity-0"
            )}>
                <div className="flex items-center gap-4 rounded-lg border p-4 mb-2">
                    <Avatar>
                        <AvatarImage src={user?.avatar || "/images/avatar.png"} alt={user?.name || "Admin"} />
                        <AvatarFallback>{user?.name?.charAt(0) || "A"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{user?.name}</span>
                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    <span className={cn("transition-all duration-300",
                        open ? "opacity-100" : "opacity-0 w-0"
                    )}>
                        Logout
                    </span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
} 