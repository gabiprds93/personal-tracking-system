"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Target,
  Flame,
  TrendingUp,
  Calendar,
  Star,
  Award,
  CheckCircle2,
  Plus,
  Moon,
  Sun,
  Settings,
  Flag,
  User,
  BarChart3,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

// Motivational messages
const motivationalMessages = [
  "El progreso, no la perfección",
  "Cada día cuenta",
  "Pequeños pasos, grandes cambios",
  "Tu futuro yo te lo agradecerá",
  "La constancia vence al talento",
  "Hoy es el día perfecto para empezar",
]

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [celebrationVisible, setCelebrationVisible] = useState(false)

  // Mock data for demonstration
  const userStats = {
    totalPoints: 2847,
    level: 12,
    currentStreak: 7,
    longestStreak: 23,
    completionRate: 87,
    todayCompleted: 4,
    todayTotal: 6,
  }

  const todayHabits = [
    { id: 1, name: "Ejercicio matutino", completed: true, category: "Salud", points: 15 },
    { id: 2, name: "Leer 30 minutos", completed: true, category: "Aprendizaje", points: 10 },
    { id: 3, name: "Meditar", completed: true, category: "Bienestar", points: 12 },
    { id: 4, name: "Beber 8 vasos de agua", completed: true, category: "Salud", points: 8 },
    { id: 5, name: "Escribir en diario", completed: false, category: "Bienestar", points: 10 },
    { id: 6, name: "Estudiar programación", completed: false, category: "Aprendizaje", points: 20 },
  ]

  const recentBadges = [
    { name: "Racha de Fuego", description: "7 días consecutivos", icon: "🔥" },
    { name: "Multitarea", description: "5+ hábitos en un día", icon: "⚡" },
    { name: "Madrugador", description: "Ejercicio antes de las 7am", icon: "🌅" },
  ]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % motivationalMessages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleHabit = (habitId: number) => {
    // Mock celebration animation with points
    setCelebrationVisible(true)
    setTimeout(() => setCelebrationVisible(false), 2000)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-sans">Personal Tracker</h1>
                <p className="text-sm text-muted-foreground font-serif">
                  Nivel {userStats.level} • {userStats.totalPoints} puntos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/habits">
                <Button variant="ghost" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Hábitos
                </Button>
              </Link>
              <Link href="/goals">
                <Button variant="ghost" className="gap-2">
                  <Flag className="w-4 h-4" />
                  Metas
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="ghost" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" className="gap-2">
                  <User className="w-4 h-4" />
                  Perfil
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Link href="/habits">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Nuevo Hábito
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Motivational Message */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-medium font-serif text-primary transition-all duration-500">
              "{motivationalMessages[currentMessage]}"
            </p>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Racha Actual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-sans">{userStats.currentStreak}</div>
              <p className="text-xs text-muted-foreground">días consecutivos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Progreso Hoy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-sans">
                {userStats.todayCompleted}/{userStats.todayTotal}
              </div>
              <Progress value={(userStats.todayCompleted / userStats.todayTotal) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                Tasa de Éxito
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-sans">{userStats.completionRate}%</div>
              <p className="text-xs text-muted-foreground">este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                Mejor Racha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-sans">{userStats.longestStreak}</div>
              <p className="text-xs text-muted-foreground">días máximo</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Habits */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Hábitos de Hoy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayHabits.map((habit) => (
                  <div
                    key={habit.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                      habit.completed
                        ? "bg-primary/5 border-primary/20"
                        : "bg-card border-border hover:border-primary/30"
                    }`}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-8 h-8 p-0 ${habit.completed ? "text-primary" : "text-muted-foreground"}`}
                      onClick={() => toggleHabit(habit.id)}
                    >
                      <CheckCircle2 className={`w-5 h-5 ${habit.completed ? "fill-current" : ""}`} />
                    </Button>
                    <div className="flex-1">
                      <p className={`font-medium ${habit.completed ? "line-through text-muted-foreground" : ""}`}>
                        {habit.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {habit.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">+{habit.points} puntos</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Achievements */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Logros Recientes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20"
                  >
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <p className="font-medium text-sm">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                ))}
                <Link href="/profile">
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Trophy className="w-4 h-4" />
                    Ver Todos los Logros
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Enhanced Celebration Animation */}
      {celebrationVisible && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-bounce text-6xl">🎉</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold animate-pulse">
              +15 puntos
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
