'use client';

import React, { createContext, useContext, useCallback, useState } from 'react';

interface StatsContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <StatsContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStatsRefresh() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStatsRefresh must be used within a StatsProvider');
  }
  return context;
}