'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LevelProgress,
  QuickStats,
  RecentAchievements,
  BadgeSection,
  WeeklyChallenge,
  StatsGrid
} from './components';
import { useProfile } from './hooks/use-profile';

/**
 * Profile component displays user profile with achievements, badges, challenges and stats
 * 
 * @example
 * ```tsx
 * <Profile />
 * ```
 */
const Profile: React.FC = () => {
  const { state, actions } = useProfile();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-sans">Mi Perfil</h1>
              <p className="text-muted-foreground font-serif">
                Logros, insignias y progreso personal
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div 
                className={`px-3 py-1 rounded-full ${state.currentLevel.bgColor} ${state.currentLevel.color} font-medium`}
              >
                {state.currentLevel.name}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{state.userStats.totalPoints} puntos</div>
                <div className="text-xs text-muted-foreground">Nivel {state.currentLevel.level}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="badges">Insignias</TabsTrigger>
            <TabsTrigger value="challenges">Desafíos</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <LevelProgress
              currentLevel={state.currentLevel}
              nextLevel={state.nextLevel}
              userStats={state.userStats}
              progressToNext={state.progressToNext}
            />

            <QuickStats userStats={state.userStats} />

            <RecentAchievements badges={state.unlockedBadges} />
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <BadgeSection
              unlockedBadges={state.unlockedBadges}
              lockedBadges={state.lockedBadges}
              onBadgeClick={actions.triggerCelebration}
            />
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <WeeklyChallenge challenge={state.weeklyChallenge} />
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <StatsGrid userStats={state.userStats} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Celebration Animation */}
      {state.celebrationVisible && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg p-8 shadow-2xl animate-bounce max-w-sm mx-4">
            {state.newBadgeUnlocked ? (
              <div className="text-center">
                <div className="text-6xl mb-4">{state.newBadgeUnlocked.icon}</div>
                <h3 className="text-xl font-bold mb-2">¡Nueva Insignia!</h3>
                <p className="text-lg font-medium text-primary">{state.newBadgeUnlocked.name}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {state.newBadgeUnlocked.description}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold">¡Felicitaciones!</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Profile.displayName = 'Profile';

export default Profile;