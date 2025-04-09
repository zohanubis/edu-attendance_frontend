"use client"

import { SidebarProvider } from "./sidebar-provider"
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
} from "./sidebar"
import { SidebarNav, SidebarNavFooter } from "./sidebar-nav"

interface MainSidebarProps {
    role: string
}

export function MainSidebar({ role }: MainSidebarProps) {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader />
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarNav role={role} />
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarNavFooter />
                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    )
} 