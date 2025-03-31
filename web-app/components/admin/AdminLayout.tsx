"use client";

import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { useSidebarStore } from '@/store/sidebar-store';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isOpen } = useSidebarStore();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex flex-1">
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isOpen ? "block" : "hidden"
        )}>
          <AdminSidebar />
        </div>
        <div className="flex-1">
          <AdminNavbar />
          <main className="container py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}