'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { DashboardHeaderProps } from '../dashboard.types';

/**
 * DashboardHeader displays the main header for the dashboard page
 * 
 * @param className - Additional CSS classes to apply
 */
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <header className={cn("border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50", className)} {...props}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-sans">Dashboard Personal</h1>
            <p className="text-muted-foreground font-serif">Tu progreso diario y logros</p>
          </div>
        </div>
      </div>
    </header>
  );
};

DashboardHeader.displayName = 'DashboardHeader';

export default DashboardHeader;