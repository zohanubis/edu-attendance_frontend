"use client";

import { Settings, LogOut, Bell, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebarStore } from "@/store/sidebar-store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  userRole?: 'student' | 'union_worker' | 'admin' | null;
  isUnionWorker?: boolean;
}

export function NavbarWithNavigationMenu({ userRole, isUnionWorker = false }: NavbarProps) {
  const { toggle, isOpen } = useSidebarStore();
  
  // Xác định nếu đây là public view (không có role)
  const isPublic = !userRole;

  return (
    <div className="flex items-center justify-between p-4 border-b w-full sticky top-0 z-10 bg-background">
      <div className="flex items-center">
        {!isPublic && (
          <SidebarTrigger className="mr-2" />
        )}
        <Link href="/" className="flex items-center">
          <Image
            src="https://huit.edu.vn/Images/Documents/N00CT/logo-huit-web-chinh-moi-mau-xanh-02.svg"
            alt="HUIT Logo"
            width={200}
            height={500}
            className="dark:invert"
          />
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-center flex-1">
        <NavigationMenu>
          <NavigationMenuList>
            {/* Trang chủ - cho tất cả người dùng */}
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Trang chủ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Bài viết - cho tất cả người dùng */}
            <NavigationMenuItem>
              <Link href="/posts" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Bài viết
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Hoạt động - cho tất cả người dùng */}
            <NavigationMenuItem>
              <Link href="/activities" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Hoạt động
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Điểm danh - menu đa cấp dựa trên vai trò */}
            {userRole === 'student' && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Điểm danh</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/student/history"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Điểm danh
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Xem lịch sử điểm danh và thông tin điểm danh của bạn
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/student/history"
                        >
                          <div className="text-sm font-medium leading-none">Lịch sử điểm danh</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Xem lịch sử điểm danh của bạn
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {/* Menu bổ sung cho cán bộ đoàn */}
                    {isUnionWorker && (
                      <>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="/student/attendance"
                            >
                              <div className="text-sm font-medium leading-none">Điểm danh cho hoạt động</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Quản lý điểm danh cho các hoạt động
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="/student/attendance-history"
                            >
                              <div className="text-sm font-medium leading-none">Lịch sử điểm danh hoạt động</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Xem lịch sử điểm danh đã phân công
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="/student/dashboard"
                            >
                              <div className="text-sm font-medium leading-none">Thống kê điểm danh</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Xem thống kê điểm danh của các hoạt động
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {/* Menu cho admin */}
            {userRole === 'admin' && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Quản lý</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/admin/dashboard"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Dashboard
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Quản lý và theo dõi hoạt động của hệ thống
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/admin/activities"
                        >
                          <div className="text-sm font-medium leading-none">Quản lý hoạt động</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Thêm, sửa, xóa các hoạt động
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/admin/students"
                        >
                          <div className="text-sm font-medium leading-none">Quản lý sinh viên</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Quản lý thông tin sinh viên
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/admin/union_workers"
                        >
                          <div className="text-sm font-medium leading-none">Quản lý cán bộ đoàn</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Quản lý thông tin cán bộ đoàn
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {/* Menu cho union_worker */}
            {userRole === 'union_worker' && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Điểm danh</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/student/attendance"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Điểm danh
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Quản lý điểm danh cho các hoạt động
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/student/attendance"
                        >
                          <div className="text-sm font-medium leading-none">Điểm danh cho hoạt động</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Quản lý điểm danh cho các hoạt động
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/student/attendance-history"
                        >
                          <div className="text-sm font-medium leading-none">Lịch sử điểm danh hoạt động</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Xem lịch sử điểm danh đã phân công
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/student/dashboard"
                        >
                          <div className="text-sm font-medium leading-none">Thống kê điểm danh</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Xem thống kê điểm danh của các hoạt động
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />

        {/* Notifications for logged-in users */}
        {!isPublic && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Thông báo">
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-2 text-sm text-center">
                Không có thông báo mới
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isPublic ? (
              <DropdownMenuItem asChild>
                <Link href="/auth/login" className="flex items-center">
                  Đăng nhập
                </Link>
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuLabel>Thông tin cá nhân</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userRole === 'student' && (
                  <DropdownMenuItem asChild>
                    <Link href="/student/profile" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Thông tin cá nhân
                    </Link>
                  </DropdownMenuItem>
                )}
                {userRole === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Cài đặt
                    </Link>
                  </DropdownMenuItem>
                )}
                {userRole === 'union_worker' && (
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Hồ sơ
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/auth/logout" className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}