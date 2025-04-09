"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface SidebarContextType {
    isOpen: boolean
    toggle: () => void
    open: () => void
    close: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

const SIDEBAR_STATE_KEY = "sidebar-state"

export function SidebarProvider({
    children,
    defaultOpen = true,
}: {
    children: React.ReactNode
    defaultOpen?: boolean
}) {
    // Initialize state from localStorage if available, otherwise use defaultOpen
    const [isOpen, setIsOpen] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(SIDEBAR_STATE_KEY)
            return saved ? JSON.parse(saved) : defaultOpen
        }
        return defaultOpen
    })

    // Persist sidebar state to localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(isOpen))
        }
    }, [isOpen])

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768 && isOpen) {
                setIsOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize() // Check initial size

        return () => window.removeEventListener("resize", handleResize)
    }, [isOpen])

    const toggle = () => setIsOpen(prev => !prev)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return (
        <SidebarContext.Provider
            value={{
                isOpen,
                toggle,
                open,
                close
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
} 