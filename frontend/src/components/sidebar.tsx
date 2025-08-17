"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Plus, Star, Flame } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  // Mock data - esto vendría de un contexto o estado global
  const userStats = {
    totalPoints: 2847,
    level: 12,
    currentStreak: 7,
    todayCompleted: 4,
    todayTotal: 6
  }

  const recentAchievements = [
    { name: "Racha de Fuego", icon: "🔥", date: "Hace 2 días" },
    { name: "Multitarea", icon: "⚡", date: "Hace 1 semana" }
  ]

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
            <p className="text-sm text-muted-foreground">
              Nivel {userStats.level} • {userStats.totalPoints} pts
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="mb-6">
          <CardContent className="p-4">
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

        {/* Recent Achievements */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 text-sm">Logros Recientes</h3>
            <div className="space-y-2">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-lg">{achievement.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}