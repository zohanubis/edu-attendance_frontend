"use client";

import { Settings, LogOut, Menu, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebarStore } from "@/store/sidebar-store";

export function StudentNavbar() {
  const { toggle, isOpen } = useSidebarStore();
  
  return (
    <div className="flex items-center justify-between p-4 border-b w-full sticky top-0 z-10 bg-background">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggle} 
          className="mr-2"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/" className="flex items-center w-full">
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
        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
          Trang chủ
        </Link>
        <Link href="/activities" className="text-sm font-medium hover:text-primary transition-colors">
          Hoạt động
        </Link>
        <Link href="/student/history" className="text-sm font-medium hover:text-primary transition-colors">
          Lịch sử điểm danh
        </Link>
      </div>

      <div className="flex items-center space-x-4">
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
        
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <span>Sinh viên</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.64245 9.99395 7.35753 9.99395 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/student/profile" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Thông tin cá nhân
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/logout" className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}