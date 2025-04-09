import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Các đường dẫn công khai không yêu cầu xác thực
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
];

// Các đường dẫn bắt đầu bằng các tiền tố này sẽ được coi là công khai
const publicPathPrefixes = [
  '/public',
  '/activities',
  '/posts',
];

// Kiểm tra xem đường dẫn có phải là công khai không
function isPublicPath(path: string): boolean {
  if (publicPaths.includes(path)) return true;
  
  return publicPathPrefixes.some(prefix => path.startsWith(prefix));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Chuyển hướng từ root path đến /public
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/public', request.url));
  }
  
  // Nếu đường dẫn bắt đầu bằng /(public), chuyển hướng đến /public
  if (pathname.includes('/(public)')) {
    const newPathname = pathname.replace('/(public)', '/public');
    return NextResponse.redirect(new URL(newPathname, request.url));
  }
  
  // Kiểm tra xác thực cho các đường dẫn không công khai
  const isPublic = isPublicPath(pathname);
  const token = request.cookies.get('auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value;
  
  // Nếu đường dẫn không công khai và không có token, chuyển hướng đến trang đăng nhập
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // Nếu người dùng đã đăng nhập và truy cập vào trang công khai như activities hoặc posts
  // thì chuyển hướng đến trang tương ứng với role của họ
  if (token && userRole && (pathname === '/activities' || pathname === '/posts' || pathname.startsWith('/activities/') || pathname.startsWith('/posts/'))) {
    // Giữ nguyên đường dẫn nhưng thêm prefix của role
    if (userRole === 'student') {
      // Nếu đã ở trang student thì không cần chuyển hướng
      if (!pathname.startsWith('/student')) {
        return NextResponse.redirect(new URL(`/student${pathname}`, request.url));
      }
    } else if (userRole === 'admin') {
      if (!pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL(`/admin${pathname}`, request.url));
      }
    } else if (userRole === 'union_worker') {
      if (!pathname.startsWith('/union_worker')) {
        return NextResponse.redirect(new URL(`/union_worker${pathname}`, request.url));
      }
    }
  }
  
  return NextResponse.next();
}

// Chỉ áp dụng middleware cho các đường dẫn cụ thể
export const config = {
  matcher: [
    // Áp dụng cho tất cả các đường dẫn ngoại trừ các tài nguyên tĩnh
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};