"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Plus, Star, Flame, Loader2, AlertCircle } from "lucide-react"
import { useProfile } from "@/components/profile/hooks/use-profile"
import Link from "next/link"

export function Sidebar() {
  const { state } = useProfile();
  const { userStats, loading, error, currentLevel } = state;

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-background border-r border-border overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Trophy className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Personal Tracker</h1>
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="text-sm text-muted-foreground">Cargando...</span>
              </div>
            ) : error ? (
              <div className="flex items-center gap-2">
                <AlertCircle className="w-3 h-3 text-destructive" />
                <span className="text-sm text-destructive">Error</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {currentLevel.name} • {userStats.totalPoints} pts
              </p>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="mb-6">
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">Cargando estadísticas...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-4">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="ml-2 text-sm text-destructive">Error al cargar</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Racha</span>
                  </div>
                  <span className="font-bold">{userStats.currentStreak} días</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Hoy</span>
                  </div>
                  <span className="font-bold">
                    {userStats.todayCompleted}/{userStats.todayTotal}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mb-6">
          <Navigation />
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 mb-6">
          <Link href="/habits">
            <Button className="w-full gap-2" size="sm">
              <Plus className="w-4 h-4" />
              Nuevo Hábito
            </Button>
          </Link>
        </div>


      </div>
    </div>
  )
}