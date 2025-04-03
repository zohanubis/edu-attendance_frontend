"use client";

import { Menu, User } from "lucide-react";
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

export function PublicNavbar() {
  return (
    <div className="flex items-center justify-between p-4 border-b w-screen sticky top-0 z-10 bg-background ">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="https://huit.edu.vn/Images/Documents/N00CT/logo-huit-web-chinh-moi-mau-xanh-02.svg"
            alt="HUIT Logo"
            width={160} // Giảm kích thước logo
            height={50} 
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
        <Link href="/posts" className="text-sm font-medium hover:text-primary transition-colors">
          Tài liệu
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/auth/login" className="flex items-center">
                Đăng nhập
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
