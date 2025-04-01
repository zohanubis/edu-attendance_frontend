"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Calendar, FileText, ClipboardList, User, BookOpen } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSidebarStore } from '@/store/sidebar-store';

interface StudentSidebarProps {
  userRole?: 'student' | 'union_worker';
}

export function StudentSidebar({ userRole = 'student' }: StudentSidebarProps) {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen } = useSidebarStore();
  
  const commonItems = [
    {
      title: 'Trang chủ',
      href: '/',
      icon: <Home className="h-5 w-5" />
    },
    {
      title: 'Hoạt động',
      href: '/activities',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: 'Tài liệu',
      href: '/posts',
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      title: 'Lịch sử điểm danh',
      href: '/student/history',
      icon: <ClipboardList className="h-5 w-5" />
    },
    {
      title: 'Thông tin cá nhân',
      href: '/student/profile',
      icon: <User className="h-5 w-5" />
    }
  ];

  const unionWorkerItems = [
    {
      title: 'Điểm danh',
      href: '/union_worker/attendance',
      icon: <ClipboardList className="h-5 w-5" />
    }
  ];

  // Determine which items to show based on user role
  const sidebarItems = userRole === 'union_worker' 
    ? [...commonItems, ...unionWorkerItems]
    : commonItems;

  const sidebar = (
    <div className="border-r h-full bg-background overflow-hidden">
      <ScrollArea className="h-full">
        <div className="p-4">
          <div className="mb-4 px-4 py-2">
            <h2 className="text-lg font-semibold">EDU Attendance</h2>
            <p className="text-sm text-muted-foreground">
              {userRole === 'union_worker' ? 'Cộng tác đoàn' : 'Sinh viên'}
            </p>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center py-3 px-4 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => {
        if (!open) {
          useSidebarStore.getState().close();
        }
      }}>
        <SheetContent side="left" className="p-0 w-64">
          {sidebar}
        </SheetContent>
      </Sheet>
    );
  }

  return isOpen ? sidebar : null;
}