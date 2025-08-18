import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { AnalyticsTabsProps, TabValue } from '../analytics.types';

/**
 * AnalyticsTabs provides navigation between different analytics views
 * 
 * @param activeTab - Currently active tab
 * @param onTabChange - Callback fired when tab changes
 * @param children - Tab content components
 * @param className - Additional CSS classes
 */
const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ 
  activeTab,
  onTabChange,
  children,
  className,
  ...props 
}) => {
  const handleTabChange = (value: string) => {
    onTabChange(value as TabValue);
  };

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={handleTabChange}
      className={cn("space-y-6", className)} 
      {...props}
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Resumen</TabsTrigger>
        <TabsTrigger value="trends">Tendencias</TabsTrigger>
        <TabsTrigger value="patterns">Patrones</TabsTrigger>
        <TabsTrigger value="insights">Insights</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

AnalyticsTabs.displayName = 'AnalyticsTabs';

/**
 * Individual tab content components for cleaner organization
 */
const OverviewTab: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <TabsContent value="overview" className="space-y-6">
    {children}
  </TabsContent>
);

OverviewTab.displayName = 'OverviewTab';

const TrendsTab: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <TabsContent value="trends" className="space-y-6">
    {children}
  </TabsContent>
);

TrendsTab.displayName = 'TrendsTab';

const PatternsTab: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <TabsContent value="patterns" className="space-y-6">
    {children}
  </TabsContent>
);

PatternsTab.displayName = 'PatternsTab';

const InsightsTab: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <TabsContent value="insights" className="space-y-6">
    {children}
  </TabsContent>
);

InsightsTab.displayName = 'InsightsTab';

export default AnalyticsTabs;
export { OverviewTab, TrendsTab, PatternsTab, InsightsTab };