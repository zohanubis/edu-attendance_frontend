import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from '@/components/layout/ModeToggle';
import { Navigation } from '@/components/layout/Navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  userRole?: 'student' | 'union_worker' | 'admin' | null;
}

export function Header({ userRole }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <Navigation userRole={userRole} />
        </div>

        <div className="flex items-center space-x-4 ml-auto md:ml-0">
          <ModeToggle />
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden">
              <div className="py-4">
                <Navigation userRole={userRole} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
} 