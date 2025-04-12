import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserCircle } from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SiteHeaderProps {
    userRole?: "public" | "student" | "youth-union" | "admin"
}

export function SiteHeader({ userRole = "public" }: SiteHeaderProps) {
    const pathname = usePathname()

    // Base navigation items for all roles
    const baseNavItems = [
        { href: "/", label: "Home" },
        { href: "/activities", label: "Activities" },
        { href: "/posts", label: "Posts" },
    ]

    // Youth Union specific navigation
    const youthUnionNav = userRole === "youth-union" && (
        <NavigationMenuItem>
            <NavigationMenuTrigger>Attendance</NavigationMenuTrigger>
            <NavigationMenuContent>
                <NavigationMenuLink asChild>
                    <Link
                        href="/attendance/assigned"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                        Assigned Activities
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuContent>
        </NavigationMenuItem>
    )

    // User menu for authenticated users
    const userMenu = userRole !== "public" && (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                <span>Account</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/my-activities">My Activities</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/logout">Log out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold">HCMUTE</span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-between">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {baseNavItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <NavigationMenuLink
                                        asChild
                                        active={pathname === item.href}
                                    >
                                        <Link href={item.href}>{item.label}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                            {youthUnionNav}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex items-center gap-4">
                        {userRole === "public" ? (
                            <Link
                                href="/login"
                                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            >
                                Sign In
                            </Link>
                        ) : (
                            userMenu
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
} 