"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Award,
  Flame,
  Target,
  Zap,
  Crown,
  Medal,
  Gift,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Lock,
} from "lucide-react"

// Level system configuration
const levels = [
  { level: 1, name: "Principiante", minPoints: 0, maxPoints: 99, color: "text-gray-600", bgColor: "bg-gray-100" },
  { level: 2, name: "Novato", minPoints: 100, maxPoints: 299, color: "text-green-600", bgColor: "bg-green-100" },
  { level: 3, name: "Aprendiz", minPoints: 300, maxPoints: 599, color: "text-blue-600", bgColor: "bg-blue-100" },
  { level: 4, name: "Competente", minPoints: 600, maxPoints: 999, color: "text-purple-600", bgColor: "bg-purple-100" },
  { level: 5, name: "Experto", minPoints: 1000, maxPoints: 1999, color: "text-orange-600", bgColor: "bg-orange-100" },
  { level: 6, name: "Maestro", minPoints: 2000, maxPoints: 3999, color: "text-red-600", bgColor: "bg-red-100" },
  { level: 7, name: "Leyenda", minPoints: 4000, maxPoints: 9999, color: "text-yellow-600", bgColor: "bg-yellow-100" },
  { level: 8, name: "Mítico", minPoints: 10000, maxPoints: 99999, color: "text-pink-600", bgColor: "bg-pink-100" },
]

// Badge definitions
const availableBadges = [
  {
    id: "streak_7",
    name: "Racha de Fuego",
    description: "Completa hábitos por 7 días consecutivos",
    icon: "🔥",
    category: "streaks",
    requirement: "7 días consecutivos",
    unlocked: true,
    unlockedAt: "2024-03-15",
  },
  {
    id: "streak_30",
    name: "Llama Eterna",
    description: "Mantén una racha de 30 días",
    icon: "🌟",
    category: "streaks",
    requirement: "30 días consecutivos",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "streak_100",
    name: "Fénix Imparable",
    description: "Alcanza 100 días consecutivos",
    icon: "🦅",
    category: "streaks",
    requirement: "100 días consecutivos",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "multitask",
    name: "Multitarea",
    description: "Completa 5+ hábitos en un solo día",
    icon: "⚡",
    category: "daily",
    requirement: "5+ hábitos en un día",
    unlocked: true,
    unlockedAt: "2024-03-10",
  },
  {
    id: "early_bird",
    name: "Madrugador",
    description: "Completa ejercicio antes de las 7am",
    icon: "🌅",
    category: "habits",
    requirement: "Ejercicio antes de 7am",
    unlocked: true,
    unlockedAt: "2024-03-08",
  },
  {
    id: "consistency",
    name: "Constancia",
    description: "Completa el 90% de hábitos en un mes",
    icon: "💎",
    category: "monthly",
    requirement: "90% completado mensual",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "goal_crusher",
    name: "Destructor de Metas",
    description: "Completa 3 metas en un mes",
    icon: "🎯",
    category: "goals",
    requirement: "3 metas completadas",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "perfectionist",
    name: "Perfeccionista",
    description: "Semana perfecta: 100% de hábitos",
    icon: "✨",
    category: "weekly",
    requirement: "Semana 100% perfecta",
    unlocked: false,
    unlockedAt: null,
  },
]

// Weekly challenges
const weeklyChallenge = {
  id: "week_12_2024",
  title: "Semana de Bienestar",
  description: "Enfócate en tu bienestar físico y mental esta semana",
  startDate: "2024-03-18",
  endDate: "2024-03-24",
  progress: 60,
  tasks: [
    { id: 1, title: "Medita 5 días", completed: 3, target: 5, points: 50 },
    { id: 2, title: "Ejercicio 4 días", completed: 2, target: 4, points: 60 },
    { id: 3, title: "8 horas de sueño 6 días", completed: 4, target: 6, points: 40 },
    { id: 4, title: "Leer 30 min diarios", completed: 5, target: 7, points: 35 },
  ],
  reward: {
    points: 200,
    badge: "Guerrero del Bienestar",
    icon: "🧘‍♀️",
  },
}

export default function ProfilePage() {
  const [userStats, setUserStats] = useState({
    totalPoints: 2847,
    level: 12,
    currentStreak: 7,
    longestStreak: 23,
    completionRate: 87,
    habitsCompleted: 156,
    goalsCompleted: 8,
    badgesEarned: 3,
    joinedDate: "2024-01-15",
  })

  const [celebrationVisible, setCelebrationVisible] = useState(false)
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState(null)

  // Calculate current level info
  const getCurrentLevel = (points) => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (points >= levels[i].minPoints) {
        return levels[i]
      }
    }
    return levels[0]
  }

  const getNextLevel = (points) => {
    const currentLevel = getCurrentLevel(points)
    const nextLevelIndex = levels.findIndex((l) => l.level === currentLevel.level) + 1
    return nextLevelIndex < levels.length ? levels[nextLevelIndex] : null
  }

  const currentLevel = getCurrentLevel(userStats.totalPoints)
  const nextLevel = getNextLevel(userStats.totalPoints)
  const progressToNext = nextLevel
    ? ((userStats.totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100

  const unlockedBadges = availableBadges.filter((badge) => badge.unlocked)
  const lockedBadges = availableBadges.filter((badge) => !badge.unlocked)

  const triggerCelebration = (badge = null) => {
    setCelebrationVisible(true)
    if (badge) setNewBadgeUnlocked(badge)
    setTimeout(() => {
      setCelebrationVisible(false)
      setNewBadgeUnlocked(null)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-sans">Mi Perfil</h1>
              <p className="text-muted-foreground font-serif">Logros, insignias y progreso personal</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full ${currentLevel.bgColor} ${currentLevel.color} font-medium`}>
                {currentLevel.name}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{userStats.totalPoints} puntos</div>
                <div className="text-xs text-muted-foreground">Nivel {currentLevel.level}</div>
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
            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Progreso de Nivel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full ${currentLevel.bgColor} flex items-center justify-center`}
                      >
                        <Crown className={`w-6 h-6 ${currentLevel.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{currentLevel.name}</h3>
                        <p className="text-sm text-muted-foreground">Nivel {currentLevel.level}</p>
                      </div>
                    </div>
                    {nextLevel && (
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {nextLevel.minPoints - userStats.totalPoints} puntos para {nextLevel.name}
                        </p>
                        <p className="text-xs text-muted-foreground">Nivel {nextLevel.level}</p>
                      </div>
                    )}
                  </div>
                  {nextLevel && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{currentLevel.minPoints} pts</span>
                        <span>{Math.round(progressToNext)}%</span>
                        <span>{nextLevel.minPoints} pts</span>
                      </div>
                      <Progress value={progressToNext} className="h-3" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{userStats.currentStreak}</div>
                  <p className="text-xs text-muted-foreground">Racha actual</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{userStats.habitsCompleted}</div>
                  <p className="text-xs text-muted-foreground">Hábitos completados</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{userStats.goalsCompleted}</div>
                  <p className="text-xs text-muted-foreground">Metas logradas</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{userStats.badgesEarned}</div>
                  <p className="text-xs text-muted-foreground">Insignias ganadas</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Logros Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {unlockedBadges.slice(0, 3).map((badge) => (
                    <div key={badge.id} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                      <div className="text-3xl">{badge.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{badge.name}</h4>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                      <Badge variant="secondary">
                        {new Date(badge.unlockedAt).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                        })}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Unlocked Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="w-5 h-5 text-yellow-500" />
                    Insignias Desbloqueadas ({unlockedBadges.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {unlockedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="p-3 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">{badge.icon}</div>
                          <h4 className="font-medium text-sm">{badge.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{badge.requirement}</p>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {new Date(badge.unlockedAt).toLocaleDateString("es-ES")}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Locked Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-gray-500" />
                    Por Desbloquear ({lockedBadges.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {lockedBadges.map((badge) => (
                      <div key={badge.id} className="p-3 border rounded-lg bg-gray-50 border-gray-200 opacity-75">
                        <div className="text-center">
                          <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
                          <h4 className="font-medium text-sm text-gray-600">{badge.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{badge.requirement}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 text-xs bg-transparent"
                            onClick={() => triggerCelebration(badge)}
                          >
                            Ver Progreso
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Desafío Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{weeklyChallenge.title}</h3>
                      <p className="text-muted-foreground">{weeklyChallenge.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{weeklyChallenge.progress}%</div>
                      <p className="text-xs text-muted-foreground">Completado</p>
                    </div>
                  </div>

                  <Progress value={weeklyChallenge.progress} className="h-3" />

                  <div className="space-y-3">
                    {weeklyChallenge.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle2
                            className={`w-5 h-5 ${
                              task.completed >= task.target ? "text-green-500 fill-current" : "text-gray-400"
                            }`}
                          />
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {task.completed}/{task.target} completado
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">+{task.points} pts</Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{weeklyChallenge.reward.icon}</div>
                      <div>
                        <h4 className="font-medium">Recompensa del Desafío</h4>
                        <p className="text-sm text-muted-foreground">
                          +{weeklyChallenge.reward.points} puntos + Insignia "{weeklyChallenge.reward.badge}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Puntos Totales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Desde {userStats.joinedDate}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Flame className="w-4 h-4" />
                    Mejor Racha
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.longestStreak}</div>
                  <p className="text-xs text-muted-foreground">días consecutivos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Tasa de Éxito
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.completionRate}%</div>
                  <p className="text-xs text-muted-foreground">promedio general</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Días Activo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68</div>
                  <p className="text-xs text-muted-foreground">desde que te uniste</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Próxima Recompensa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">153</div>
                  <p className="text-xs text-muted-foreground">puntos restantes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Rango Global
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#247</div>
                  <p className="text-xs text-muted-foreground">de todos los usuarios</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Celebration Animation */}
      {celebrationVisible && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg p-8 shadow-2xl animate-bounce max-w-sm mx-4">
            {newBadgeUnlocked ? (
              <div className="text-center">
                <div className="text-6xl mb-4">{newBadgeUnlocked.icon}</div>
                <h3 className="text-xl font-bold mb-2">¡Nueva Insignia!</h3>
                <p className="text-lg font-medium text-primary">{newBadgeUnlocked.name}</p>
                <p className="text-sm text-muted-foreground mt-2">{newBadgeUnlocked.description}</p>
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
  )
}
