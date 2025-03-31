import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

interface NavigationProps {
  userRole?: 'student' | 'union_worker' | 'admin' | null;
}

export function Navigation({ userRole }: NavigationProps) {
  const pathname = usePathname();

  // Navigation items for different roles
  const publicNavItems: NavItem[] = [
    { label: 'Activities', href: '/activities' },
    { label: 'Posts', href: '/posts' },
  ];

  const studentNavItems: NavItem[] = [
    ...publicNavItems,
    { label: 'Attendance', href: '/student/attendance' },
    { label: 'History', href: '/student/history' },
    { label: 'Profile', href: '/student/profile', icon: <User className="mr-2 h-4 w-4" /> },
  ];

  const unionWorkerNavItems: NavItem[] = [
    ...publicNavItems,
    { label: 'Attendance', href: '/union_worker/attendance' },
    { label: 'History', href: '/union_worker/history' },
    { label: 'Profile', href: '/union_worker/profile', icon: <User className="mr-2 h-4 w-4" /> },
  ];

  const adminNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Activities', href: '/admin/activities' },
    { label: 'Posts', href: '/admin/posts' },
    { label: 'Union Workers', href: '/admin/union_workers' },
    { label: 'Students', href: '/admin/students' },
    { label: 'Settings', href: '/admin/settings' },
  ];

  // Determine which nav items to use based on user role
  let navItems: NavItem[] = publicNavItems;
  if (userRole === 'student') {
    navItems = studentNavItems;
  } else if (userRole === 'union_worker') {
    navItems = unionWorkerNavItems;
  } else if (userRole === 'admin') {
    navItems = adminNavItems;
  }

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
      
      {userRole && (
        <Button variant="ghost" size="sm" className="ml-auto" asChild>
          <Link href="/auth/logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      )}

      {!userRole && (
        <Button variant="outline" size="sm" className="ml-auto" asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      )}
    </nav>
  );
} 