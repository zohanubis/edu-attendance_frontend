"use client";

import { StudentSidebar } from '@/components/student/StudentSidebar';
import { StudentNavbar } from '@/components/student/StudentNavbar';
import { useSidebarStore } from '@/store/sidebar-store';
import { cn } from '@/lib/utils';

interface StudentLayoutProps {
  children: React.ReactNode;
  userRole?: 'student' | 'union_worker';
}

export function StudentLayout({ children, userRole = 'student' }: StudentLayoutProps) {
  const { isOpen } = useSidebarStore();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex flex-1">
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isOpen ? "block" : "hidden"
        )}>
          <StudentSidebar userRole={userRole} />
        </div>
        <div className="flex-1">
          <StudentNavbar />
          <main className="container py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}