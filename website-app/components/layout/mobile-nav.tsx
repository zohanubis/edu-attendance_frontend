"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetClose } from "@/components/ui/sheet"

interface MobileNavProps {
    onClose?: () => void
}

export function MobileNav({ onClose }: MobileNavProps) {
    const pathname = usePathname()
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(true)

    // Close sheet when route changes
    useEffect(() => {
        setIsOpen(false)
        onClose?.()
    }, [pathname, onClose])

    const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
        const isActive = pathname === href

        return (
            <Link
                href={href}
                className={cn(
                    "text-foreground/70 transition-colors hover:text-foreground",
                    isActive && "font-medium text-foreground"
                )}
            >
                {children}
            </Link>
        )
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                    <NavLink href="/">Trang chủ</NavLink>
                    <NavLink href="/public-activities">Hoạt động</NavLink>
                    <NavLink href="/public-posts">Bài viết</NavLink>
                </div>

                {user?.role === "student" && (
                    <>
                        <div className="my-4 border-t" />
                        <div className="flex flex-col space-y-2">
                            <div className="text-lg font-semibold">Điểm danh</div>
                            <NavLink href="/student-activities/history">
                                Lịch sử điểm danh
                            </NavLink>
                            {user.status && (
                                <NavLink href="/student-attendance/manage">
                                    Quản lý điểm danh
                                </NavLink>
                            )}
                        </div>
                    </>
                )}

                {user?.role === "admin" && (
                    <>
                        <div className="my-4 border-t" />
                        <div className="flex flex-col space-y-2">
                            <div className="text-lg font-semibold">Quản lý</div>
                            <NavLink href="/admin-manage-users">
                                Quản lý người dùng
                            </NavLink>
                            <NavLink href="/admin-activities/create">
                                Tạo hoạt động
                            </NavLink>
                            <NavLink href="/admin-posts/create">
                                Tạo bài viết
                            </NavLink>
                        </div>
                    </>
                )}

                <SheetClose className="sr-only">Close</SheetClose>
            </ScrollArea>
        </Sheet>
    )
} 