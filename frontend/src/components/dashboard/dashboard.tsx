'use client';

import React from 'react';
import { 
  MotivationalMessage,
  MetricsGrid, 
  TodayHabits, 
  RecentAchievements,
  CelebrationOverlay,
  useDashboard 
} from './index';

const motivationalMessages = [
  "El progreso, no la perfección",
  "Cada día cuenta",
  "Pequeños pasos, grandes cambios",
  "Tu futuro yo te lo agradecerá",
  "La constancia vence al talento",
  "Hoy es el día perfecto para empezar",
];

/**
 * Dashboard component displays the main dashboard with habit tracking, metrics, and achievements
 * 
 * @example
 * ```tsx
 * <Dashboard />
 * ```
 */
const Dashboard: React.FC = () => {
  const { state, actions } = useDashboard();

  if (!state.mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <main className="p-6 space-y-6">
        <MotivationalMessage 
          messages={motivationalMessages}
          currentIndex={state.currentMessageIndex}
        />

        <MetricsGrid userStats={state.userStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TodayHabits 
            habits={state.todayHabits}
            onHabitToggle={actions.toggleHabit}
            className="lg:col-span-2"
          />

          <RecentAchievements badges={state.recentBadges} />
        </div>
      </main>

      <CelebrationOverlay 
        isVisible={state.celebrationVisible}
        points={15}
      />
    </div>
  );
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;