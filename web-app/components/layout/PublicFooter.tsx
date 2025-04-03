import Link from 'next/link';

export function PublicFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EDU Attendance. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <Link href="/activities" className="hover:text-primary transition-colors">
            Hoạt động
          </Link>
          <Link href="/posts" className="hover:text-primary transition-colors">
            Tài liệu
          </Link>
        </div>
      </div>
    </footer>
  );
}