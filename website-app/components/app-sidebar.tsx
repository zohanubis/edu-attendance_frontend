"use client"

import type * as React from "react"
import { BarChart3, BookOpen, CalendarDays, FileText, Home, LayoutDashboard, Users } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from "@/components/ui/sidebar"

// This is sample data based on the admin routes
const data = {
  user: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Students",
      url: "/admin/students",
      icon: Users,
    },
    {
      title: "Activities",
      url: "/admin/activities",
      icon: CalendarDays,
      items: [
        {
          title: "All Activities",
          url: "/admin/activities",
          isActive: false,
        },
        {
          title: "New Activity",
          url: "/admin/activities/new",
          isActive: false,
        },
      ],
    },
    {
      title: "Posts",
      url: "/admin/posts",
      icon: FileText,
      items: [
        {
          title: "All Posts",
          url: "/admin/posts",
          isActive: false,
        },
        {
          title: "New Post",
          url: "/admin/posts/new",
          isActive: false,
        },
      ],
    },
    {
      title: "Statistics",
      url: "/admin/statistics",
      icon: BarChart3,
    },
    {
      title: "Attendance",
      url: "/admin/attendance",
      icon: BookOpen,
      items: [
        {
          title: "Attendance Records",
          url: "/admin/attendance",
          isActive: false,
        },
        {
          title: "Youth Union",
          url: "/admin/attendance/youth-union",
          isActive: false,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-2 px-4"} py-2`}>
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="size-4" />
          </div>
          <div
            className={`flex flex-col gap-0.5 leading-none transition-opacity duration-200 ${isCollapsed ? "hidden" : "opacity-100"}`}
          >
            <span className="font-semibold">Admin</span>
            <span className="text-xs text-muted-foreground">v1.0.0</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
