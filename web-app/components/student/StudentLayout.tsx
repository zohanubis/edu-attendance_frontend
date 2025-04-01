"use client";

import { StudentSidebar } from '@/components/student/StudentSidebar';
import { StudentNavbar } from '@/components/student/StudentNavbar';
import { useSidebarStore } from '@/store/sidebar-store';
import { cn } from '@/lib/utils';
import { Home, CalendarDays, User, FileText, Menu, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface StudentLayoutProps {
  children: React.ReactNode;
  userRole?: 'student' | 'union_worker';
}

export function StudentLayout({ children, userRole = 'student' }: StudentLayoutProps) {
  const { isOpen } = useSidebarStore();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <StudentNavbar />
      <div className="flex flex-1 h-[calc(100vh-64px)]">
        <div className={cn(
          "h-full transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-0"
        )}>
          <StudentSidebar userRole={userRole} />
        </div>
        <div className="flex-1 overflow-auto">
          <main className={cn(
            "py-6 px-4 transition-all duration-300",
            isOpen ? "ml-0" : "ml-0"
          )}>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}