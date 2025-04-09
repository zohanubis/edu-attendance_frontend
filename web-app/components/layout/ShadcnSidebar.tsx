"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSidebarStore } from '@/store/sidebar-store';
import { studentItems, unionWorkerItems, adminItems } from '@/config/sidebar-items';
import { CheckCircle, ClipboardList, ChevronDown } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';

interface ShadcnSidebarProps {
  userRole: 'admin' | 'student' | 'union_worker';
  isUnionWorker?: boolean;
}

export function ShadcnSidebar({ userRole, isUnionWorker = false }: ShadcnSidebarProps) {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, toggle } = useSidebarStore();
  
  // Xác định xem có hiển thị menu công tác đoàn hay không
  // Nếu userRole là union_worker hoặc isUnionWorker là true thì hiển thị
  const showUnionWorkerMenu = userRole === 'union_worker' || isUnionWorker;

  // Lấy các menu item dựa trên vai trò người dùng
  const getStudentItems = () => {
    return studentItems;
  };

  const getUnionWorkerItems = () => {
    // Lấy các menu item chỉ dành cho công tác đoàn (bỏ qua các item chung với sinh viên)
    return unionWorkerItems.filter(item => !studentItems.some(studentItem => studentItem.href === item.href));
  };

  const getAdminItems = () => {
    return adminItems;
  };

  // Xác định các menu item dựa trên vai trò
  const studentMenuItems = userRole === 'admin' ? getAdminItems() : getStudentItems();
  const unionWorkerMenuItems = getUnionWorkerItems();

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

  return (
    <SidebarProvider defaultOpen={isOpen} open={isOpen} onOpenChange={(open) => {
      if (open) {
        useSidebarStore.getState().open();
      } else {
        useSidebarStore.getState().close();
      }
    }}>
      {/* SidebarProvider bao bọc toàn bộ nội dung để đảm bảo useSidebar hoạt động đúng */}
      <Sidebar>
        <SidebarHeader>
          <div className="px-4 py-2 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">EDU Attendance</h2>
                {showUnionWorkerMenu && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span className="text-xs">Công tác đoàn</span>
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{getRoleTitle()}</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {/* Nhóm menu chính */}
          <SidebarGroup>
            <SidebarGroupLabel>
              {userRole === 'admin' ? 'Quản trị' : 'Sinh viên'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Hiển thị các menu item cơ bản */}
                {studentMenuItems
                  .filter(item => item.title !== 'Lịch sử điểm danh') // Loại bỏ mục điểm danh để xử lý riêng
                  .map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                      >
                        <Link href={item.href}>
                          {item.icon}
                          <span className="ml-3">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                }

                {/* Menu điểm danh với submenu */}
                {userRole === 'student' && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={pathname.includes('/student/history') || 
                               (isUnionWorker && (pathname.includes('/student/attendance') || 
                                                  pathname.includes('/student/dashboard')))}
                    >
                      <ClipboardList className="h-5 w-5" />
                      <span className="ml-3">Điểm danh</span>
                      <SidebarMenuAction showOnHover>
                        <ChevronDown className="h-4 w-4" />
                      </SidebarMenuAction>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === '/student/history'}
                        >
                          <Link href="/student/history">
                            Lịch sử điểm danh
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                      {/* Submenu cho cán bộ đoàn */}
                      {isUnionWorker && (
                        <>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === '/student/attendance'}
                            >
                              <Link href="/student/attendance">
                                Điểm danh cho hoạt động
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === '/student/attendance-history'}
                            >
                              <Link href="/student/attendance-history">
                                Lịch sử điểm danh hoạt động
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === '/student/dashboard'}
                            >
                              <Link href="/student/dashboard">
                                Thống kê điểm danh
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </>
                      )}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Nhóm menu công tác đoàn (chỉ hiển thị nếu là cán bộ đoàn) */}
          {userRole === 'union_worker' && (
            <SidebarGroup>
              <SidebarGroupLabel>
                Công tác đoàn
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {/* Menu điểm danh với submenu cho union_worker */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={pathname.includes('/student/attendance') || 
                               pathname.includes('/student/attendance-history') || 
                               pathname.includes('/student/dashboard')}
                    >
                      <ClipboardList className="h-5 w-5" />
                      <span className="ml-3">Điểm danh</span>
                      <SidebarMenuAction showOnHover>
                        <ChevronDown className="h-4 w-4" />
                      </SidebarMenuAction>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === '/student/attendance'}
                        >
                          <Link href="/student/attendance">
                            Điểm danh cho hoạt động
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === '/student/attendance-history'}
                        >
                          <Link href="/student/attendance-history">
                            Lịch sử điểm danh hoạt động
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === '/student/dashboard'}
                        >
                          <Link href="/student/dashboard">
                            Thống kê điểm danh
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          
          {/* Nhóm menu admin */}
          {userRole === 'admin' && (
            <SidebarGroup>
              <SidebarGroupLabel>
                Quản lý
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                      >
                        <Link href={item.href}>
                          {item.icon}
                          <span className="ml-3">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
        {isMobile && (
          <SidebarFooter>
            <div className="px-4 py-2 text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} EDU Attendance
            </div>
          </SidebarFooter>
        )}
      </Sidebar>
    </SidebarProvider>
  );
}