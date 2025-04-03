"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

interface MainLayoutProps {
  children: ReactNode;
  userRole?: 'student' | 'union_worker' | 'admin' | null;
  sidebar?: ReactNode;
}

export function MainLayout({ children, userRole, sidebar }: MainLayoutProps) {
  const { isOpen } = useSidebarStore();
  const showSidebar = !!userRole && !!sidebar; // Chỉ hiển thị sidebar nếu có role và có sidebar component

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar userRole={userRole} />
      <div className="flex flex-1 h-[calc(100vh-64px)]">
        {showSidebar && (
          <div
            className={cn(
              "h-full transition-all duration-300 ease-in-out",
              isOpen ? "w-64" : "w-0"
            )}
          >
            {sidebar}
          </div>
        )}
        <div className="flex-1 overflow-auto">
          <main
            className={cn(
              "py-6 px-4 transition-all duration-300",
              isOpen && showSidebar ? "ml-0" : "ml-0"
            )}
          >
            {children}
          </main>
        </div>
      </div>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EDU Attendance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}