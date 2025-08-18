'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Sidebar } from '@/components/sidebar';
import { MobileNavigation } from '@/components/navigation';
import { LoadingSpinner } from '@/components/loading-spinner';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  const { loading, isAuthenticated } = useAuth();
  const isLoginPage = pathname === '/login';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isLoginPage || !isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 md:ml-80">
        {/* Mobile Navigation */}
        <div className="md:hidden sticky top-0 z-50 bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <MobileNavigation />
            <h1 className="font-bold">Personal Tracker</h1>
            <div></div>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

LayoutWrapper.displayName = 'LayoutWrapper';

export default LayoutWrapper;