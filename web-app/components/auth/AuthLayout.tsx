import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from '@/components/layout/ModeToggle';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Auth Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/logo.png" 
                alt="EDU Attendance" 
                width={32} 
                height={32}
                className="rounded-sm"
              />
              <span className="font-bold">EDU Attendance</span>
            </Link>
            <ModeToggle />
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Image/Info (only on desktop) */}
      <div className="hidden md:block bg-muted">
        <div className="h-full flex items-center justify-center p-8">
          <div className="max-w-lg space-y-4">
            <h1 className="text-3xl font-bold">Welcome to EDU Attendance</h1>
            <p className="text-muted-foreground">
              A comprehensive student attendance management system for educational institutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 