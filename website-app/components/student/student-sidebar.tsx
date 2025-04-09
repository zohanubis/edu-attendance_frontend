"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
    LayoutDashboard,
    Calendar,
    FileText,
    User,
    ClipboardCheck,
    BarChart2,
    ChevronLeft,
    ChevronRight
} from "lucide-react"

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar"

const studentMenuItems = [
    {
        title: "Dashboard",
        href: "/student-dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Hoạt động",
        href: "/student-activities",
        icon: Calendar,
    },
    {
        title: "Bài viết",
        href: "/student-posts",
        icon: FileText,
    },
    {
        title: "Hồ sơ",
        href: "/student-profile",
        icon: User,
    },
]

const unionWorkerMenuItems = [
    {
        title: "Lịch sử điểm danh",
        href: "/student-activities/history",
        icon: ClipboardCheck,
    },
    {
        title: "Thống kê",
        href: "/student-statistics",
        icon: BarChart2,
    },
]

export function StudentSidebar() {
    const pathname = usePathname()
    const { open, toggleSidebar } = useSidebar()

    return (
        <Sidebar
            className={cn(
                "fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] border-r bg-background transition-all duration-300",
                open ? "w-64" : "w-[70px]"
            )}
        >
            <SidebarHeader className="flex h-[60px] items-center border-b px-4">
                <span className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    !open && "opacity-0 md:opacity-100"
                )}>
                    <span className={cn(
                        "text-lg font-semibold transition-all duration-300",
                        !open && "md:hidden"
                    )}>
                        Sinh viên
                    </span>
                    <Badge
                        variant="secondary"
                        className={cn(
                            "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400",
                            !open && "md:hidden"
                        )}
                    >
                        Công tác đoàn
                    </Badge>
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={toggleSidebar}
                >
                    {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className={cn(
                        "px-4 py-2",
                        !open && "md:hidden"
                    )}>
                        Dành cho sinh viên
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {studentMenuItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={cn(
                                                "w-full",
                                                !open && "md:justify-center"
                                            )}
                                        >
                                            <Link href={item.href}>
                                                <Icon className="h-4 w-4" />
                                                <span className={cn(
                                                    "ml-2",
                                                    !open && "md:hidden"
                                                )}>
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className={cn(
                        "px-4 py-2",
                        !open && "md:hidden"
                    )}>
                        Dành cho công tác đoàn
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {unionWorkerMenuItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={cn(
                                                "w-full",
                                                !open && "md:justify-center"
                                            )}
                                        >
                                            <Link href={item.href}>
                                                <Icon className="h-4 w-4" />
                                                <span className={cn(
                                                    "ml-2",
                                                    !open && "md:hidden"
                                                )}>
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
} 