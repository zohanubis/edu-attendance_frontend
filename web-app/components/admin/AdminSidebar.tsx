"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Calendar, FileText, Users, UsersRound } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';

export function AdminSidebar() {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [open, setOpen] = React.useState(false);
  
  const sidebarItems = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: <Home className="h-5 w-5" />
    },
    {
      title: 'Hoạt động',
      href: '/admin/activities',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: 'Bài viết',
      href: '/admin/posts',
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: 'Sinh viên',
      href: '/admin/students',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: 'Cộng tác đoàn',
      href: '/admin/union_workers',
      icon: <UsersRound className="h-5 w-5" />
    }
  ];

  const sidebar = (
    <div className="w-64 border-r min-h-screen bg-background">
      <ScrollArea className="h-screen">
        <div className="p-4">
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
      <>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed left-4 top-4 z-40"
          onClick={() => setOpen(true)}
        >
          <Home className="h-5 w-5" />
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="p-0 w-64">
            {sidebar}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return sidebar;
}
