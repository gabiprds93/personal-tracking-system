'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LevelProgress,
  QuickStats,
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

  if (state.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold mb-2">Error al cargar perfil</h3>
          <p className="text-muted-foreground mb-4">{state.error}</p>
          <button 
            onClick={actions.refreshData}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-sans">Mi Perfil</h1>
              <p className="text-muted-foreground font-serif">
                Progreso personal y estadísticas
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
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

    </div>
  );
};

Profile.displayName = 'Profile';

export default Profile;