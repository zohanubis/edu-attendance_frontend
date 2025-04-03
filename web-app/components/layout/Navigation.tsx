import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LogOut, User, Home, CalendarDays, FileText, BookOpen, Settings, Users, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  roles?: Array<'student' | 'union_worker' | 'admin' | 'public'>;
};

interface NavigationProps {
  userRole?: 'student' | 'union_worker' | 'admin' | null;
}

export function Navigation({ userRole }: NavigationProps) {
  const pathname = usePathname();

  // Tất cả các navigation items với thông tin về vai trò được phép truy cập
  const allNavItems: NavItem[] = [  
    // Public và tất cả các vai trò khác đều có thể truy cập
    { label: 'Trang chủ', href: '/', icon: <Home className="mr-2 h-4 w-4" />, roles: ['public', 'student', 'union_worker', 'admin'] },
    { label: 'Hoạt động', href: '/activities', icon: <CalendarDays className="mr-2 h-4 w-4" />, roles: ['public', 'student', 'union_worker', 'admin'] },
    { label: 'Bài viết', href: '/posts', icon: <FileText className="mr-2 h-4 w-4" />, roles: ['public', 'student', 'union_worker', 'admin'] },
    
    // Chỉ student mới có thể truy cập
    { label: 'Lịch sử', href: '/student/history', icon: <CalendarDays className="mr-2 h-4 w-4" />, roles: ['student'] },
    { label: 'Hồ sơ', href: '/student/profile', icon: <User className="mr-2 h-4 w-4" />, roles: ['student'] },
    
    // Chỉ union_worker mới có thể truy cập
    { label: 'Điểm danh', href: '/union_worker/attendance', icon: <BookOpen className="mr-2 h-4 w-4" />, roles: ['union_worker'] },
    { label: 'Lịch sử', href: '/union_worker/history', icon: <CalendarDays className="mr-2 h-4 w-4" />, roles: ['union_worker'] },
    
    // Chỉ admin mới có thể truy cập
    { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="mr-2 h-4 w-4" />, roles: ['admin'] },
    { label: 'Quản lý hoạt động', href: '/admin/activities', icon: <CalendarDays className="mr-2 h-4 w-4" />, roles: ['admin'] },
    { label: 'Quản lý bài viết', href: '/admin/posts', icon: <FileText className="mr-2 h-4 w-4" />, roles: ['admin'] },
    { label: 'Quản lý cán bộ', href: '/admin/union_workers', icon: <Users className="mr-2 h-4 w-4" />, roles: ['admin'] },
    { label: 'Quản lý sinh viên', href: '/admin/students', icon: <Users className="mr-2 h-4 w-4" />, roles: ['admin'] },
    { label: 'Cài đặt', href: '/admin/settings', icon: <Settings className="mr-2 h-4 w-4" />, roles: ['admin'] },
  ];

  // Lọc các mục navigation dựa trên vai trò người dùng
  const currentRole = userRole || 'public';
  const navItems = allNavItems.filter(item => 
    item.roles?.includes(currentRole as 'public' | 'student' | 'union_worker' | 'admin')
  );

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
      
      <div className="ml-auto">
        {userRole ? (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/logout">
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/login">Đăng nhập</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}