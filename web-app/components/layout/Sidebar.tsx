"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSidebarStore } from '@/store/sidebar-store';
import { studentItems, unionWorkerItems, adminItems } from '@/config/sidebar-items';

interface SidebarProps {
  userRole: 'admin' | 'student' | 'union_worker';
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen } = useSidebarStore();

  // Get sidebar items based on user role
  const getSidebarItems = () => {
    switch (userRole) {
      case 'admin':
        return adminItems;
      case 'union_worker':
        return unionWorkerItems;
      case 'student':
      default:
        return studentItems;
    }
  };

  const sidebarItems = getSidebarItems();

  const getRoleTitle = () => {
    switch (userRole) {
      case 'admin':
        return 'Quản trị viên';
      case 'union_worker':
        return 'Cộng tác đoàn';
      case 'student':
      default:
        return 'Sinh viên';
    }
  };

  const sidebar = (
    <div className="border-r h-full bg-background overflow-hidden">
      <ScrollArea className="h-full">
        <div className="p-4">
          <div className="mb-4 px-4 py-2">
            <h2 className="text-lg font-semibold">EDU Attendance</h2>
            <p className="text-sm text-muted-foreground">{getRoleTitle()}</p>
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