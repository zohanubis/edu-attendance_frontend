"use client";

import { Settings, LogOut, Menu, Bell, User } from "lucide-react";
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

interface NavbarProps {
  userRole?: 'student' | 'union_worker' | 'admin' | null;
}

export function Navbar({ userRole }: NavbarProps) {
  const { toggle, isOpen } = useSidebarStore();
  
  // Xác định nếu đây là public view (không có role)
  const isPublic = !userRole;

  return (
    <div className="flex items-center justify-between p-4 border-b w-full sticky top-0 z-10 bg-background">
      <div className="flex items-center">
        {!isPublic && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggle} 
            className="mr-2"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
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

      <div className="hidden md:flex items-center justify-center flex-1 space-x-6">
        {/* Common links for all roles */}
        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
          Trang chủ
        </Link>
        <Link href="/activities" className="text-sm font-medium hover:text-primary transition-colors">
          Hoạt động
        </Link>

        {/* Role-specific links */}
        {userRole === 'student' && (
          <Link href="/student/history" className="text-sm font-medium hover:text-primary transition-colors">
            Lịch sử điểm danh
          </Link>
        )}

        {userRole === 'admin' && (
          <>
            <Link href="/admin/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/activities" className="text-sm font-medium hover:text-primary transition-colors">
              Quản lý hoạt động
            </Link>
          </>
        )}

        {userRole === 'union_worker' && (
          <>
            <Link href="/union_worker/attendance" className="text-sm font-medium hover:text-primary transition-colors">
              Điểm danh
            </Link>
            <Link href="/union_worker/history" className="text-sm font-medium hover:text-primary transition-colors">
              Lịch sử
            </Link>
          </>
        )}

        {/* Public-only links */}
        {isPublic && (
          <Link href="/posts" className="text-sm font-medium hover:text-primary transition-colors">
            Tài liệu
          </Link>
        )}
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