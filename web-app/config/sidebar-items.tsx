import { Home, Calendar, FileText, ClipboardList, User, BookOpen, Users, UsersRound } from 'lucide-react';

export const commonItems = [
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
  }
];

export const studentItems = [
  ...commonItems,
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

export const unionWorkerItems = [
  ...commonItems,
  {
    title: 'Điểm danh',
    href: '/union_worker/attendance',
    icon: <ClipboardList className="h-5 w-5" />
  },
  {
    title: 'Lịch sử điểm danh',
    href: '/union_worker/history',
    icon: <FileText className="h-5 w-5" />
  },
  {
    title: 'Thông tin cá nhân',
    href: '/union_worker/profile',
    icon: <User className="h-5 w-5" />
  }
];

export const adminItems = [
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