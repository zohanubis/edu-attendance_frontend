"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useAuth } from "./auth-provider"

// Base navigation items for all roles
const mainNavItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Activities",
    href: "/activities",
  },
  {
    title: "Posts",
    href: "/posts",
  },
]

// Student navigation items
const studentNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "My Activities",
    href: "/my-activities",
  },
]

// Youth Union specific navigation
const youthUnionNavItems = [
  {
    title: "Assigned Activities",
    href: "/attendance/assigned",
  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [userRole, setUserRole] = React.useState<"public" | "student" | "youth-union" | "admin">("public")

  // Check if user is authenticated and get role
  React.useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
      setUserRole(user.role)
    } else {
      setIsAuthenticated(false)
      setUserRole("public")
    }
  }, [user])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <MainNav items={mainNavItems} />
        <MobileNav
          mainItems={mainNavItems}
          studentItems={studentNavItems}
          youthUnionItems={youthUnionNavItems}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <NavigationMenu className="hidden md:flex">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Account</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {studentNavItems.map((item) => (
                            <ListItem
                              key={item.title}
                              title={item.title}
                              href={item.href}
                              className={cn(pathname === item.href && "text-primary")}
                            />
                          ))}
                          {userRole === "youth-union" && (
                            <NavigationMenuItem>
                              <NavigationMenuTrigger>Attendance</NavigationMenuTrigger>
                              <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                  {youthUnionNavItems.map((item) => (
                                    <ListItem
                                      key={item.title}
                                      title={item.title}
                                      href={item.href}
                                      className={cn(pathname === item.href && "text-primary")}
                                    />
                                  ))}
                                </ul>
                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          )}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <ThemeToggle />
                <Button asChild variant="ghost" size="sm" onClick={logout}>
                  <Link href="/logout">Logout</Link>
                </Button>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Button asChild size="sm">
                  <Link href="/login">Sign In</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

function MainNav({ items }: { items: { title: string; href: string }[] }) {
  const pathname = usePathname()

  return (
    <div className="flex-1 flex items-center w-full">
      <Link href="/" className="flex items-center">
        <img
          src="https://huit.edu.vn/Images/Documents/N00CT/logo-huit-web-chinh-moi-mau-xanh-02.svg?h=80"
          alt="HUIT Logo"
          className="h-10 w-auto"
        />
      </Link>
      <NavigationMenu className="mx-auto">
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item.title}>
              <Link href={item.href} passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), pathname === item.href && "text-primary")}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

function MobileNav({
  mainItems,
  studentItems,
  youthUnionItems,
  isAuthenticated,
  userRole,
}: {
  mainItems: { title: string; href: string }[]
  studentItems: { title: string; href: string }[]
  youthUnionItems: { title: string; href: string }[]
  isAuthenticated: boolean
  userRole: "public" | "student" | "youth-union" | "admin"
}) {
  const pathname = usePathname()

  return (
    <div className="md:hidden flex items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0 flex flex-col">
          <div className="flex items-center mb-6">
            <img
              src="https://huit.edu.vn/Images/Documents/N00CT/logo-huit-web-chinh-moi-mau-xanh-02.svg?h=80"
              alt="HUIT Logo"
              className="h-10 w-auto"
            />
          </div>
          <div className="flex-1 overflow-auto">
            <div className="flex flex-col space-y-3 mb-4">
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Main Navigation</h4>
              {mainItems.map((item) => (
                <MobileLink key={item.title} href={item.href} pathname={pathname}>
                  {item.title}
                </MobileLink>
              ))}
            </div>

            {isAuthenticated && (
              <div className="flex flex-col space-y-3 mt-6 border-t pt-6">
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Account</h4>
                {studentNavItems.map((item) => (
                  <MobileLink key={item.title} href={item.href} pathname={pathname}>
                    {item.title}
                  </MobileLink>
                ))}

                {userRole === "youth-union" && (
                  <>
                    <h4 className="font-medium text-sm text-muted-foreground mt-4 mb-1">Attendance</h4>
                    {youthUnionNavItems.map((item) => (
                      <MobileLink key={item.title} href={item.href} pathname={pathname}>
                        {item.title}
                      </MobileLink>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
          <div className="border-t pt-4 mt-auto">
            {isAuthenticated ? (
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="/logout">Logout</Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center ml-2">
        <img
          src="https://huit.edu.vn/Images/Documents/N00CT/logo-huit-web-chinh-moi-mau-xanh-02.svg?h=80"
          alt="HUIT Logo"
          className="h-8 w-auto"
        />
      </Link>
    </div>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string
  href: string
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(({ className, title, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

interface MobileLinkProps {
  href: string
  pathname: string
  children: React.ReactNode
}

function MobileLink({ href, pathname, children }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground font-medium",
      )}
      onClick={() => {
        // Close the sheet when clicking on a link
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
      }}
    >
      {children}
    </Link>
  )
}
