"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Calendar, Target, PieChartIcon, Activity, Clock, Flame, Award } from "lucide-react"

// Mock data for charts
const habitTrendData = [
  { date: "2024-03-01", completed: 4, total: 6, rate: 67 },
  { date: "2024-03-02", completed: 5, total: 6, rate: 83 },
  { date: "2024-03-03", completed: 6, total: 6, rate: 100 },
  { date: "2024-03-04", completed: 3, total: 6, rate: 50 },
  { date: "2024-03-05", completed: 5, total: 6, rate: 83 },
  { date: "2024-03-06", completed: 4, total: 6, rate: 67 },
  { date: "2024-03-07", completed: 6, total: 6, rate: 100 },
  { date: "2024-03-08", completed: 5, total: 6, rate: 83 },
  { date: "2024-03-09", completed: 4, total: 6, rate: 67 },
  { date: "2024-03-10", completed: 6, total: 6, rate: 100 },
  { date: "2024-03-11", completed: 5, total: 6, rate: 83 },
  { date: "2024-03-12", completed: 4, total: 6, rate: 67 },
  { date: "2024-03-13", completed: 5, total: 6, rate: 83 },
  { date: "2024-03-14", completed: 6, total: 6, rate: 100 },
  { date: "2024-03-15", completed: 4, total: 6, rate: 67 },
  { date: "2024-03-16", completed: 5, total: 6, rate: 83 },
  { date: "2024-03-17", completed: 6, total: 6, rate: 100 },
  { date: "2024-03-18", completed: 4, total: 6, rate: 67 },
]

const categoryData = [
  { name: "Salud", value: 35, color: "#ef4444" },
  { name: "Aprendizaje", value: 25, color: "#3b82f6" },
  { name: "Bienestar", value: 20, color: "#8b5cf6" },
  { name: "Productividad", value: 15, color: "#10b981" },
  { name: "Ejercicio", value: 5, color: "#f59e0b" },
]

const weeklyComparisonData = [
  { week: "Sem 1", thisMonth: 85, lastMonth: 78 },
  { week: "Sem 2", thisMonth: 92, lastMonth: 85 },
  { week: "Sem 3", thisMonth: 88, lastMonth: 82 },
  { week: "Sem 4", thisMonth: 95, lastMonth: 88 },
]

const timeOfDayData = [
  { hour: "6:00", habits: 2 },
  { hour: "7:00", habits: 4 },
  { hour: "8:00", habits: 3 },
  { hour: "9:00", habits: 1 },
  { hour: "12:00", habits: 2 },
  { hour: "18:00", habits: 3 },
  { hour: "19:00", habits: 2 },
  { hour: "21:00", habits: 4 },
  { hour: "22:00", habits: 1 },
]

const streakData = [
  { date: "2024-01-01", streak: 0 },
  { date: "2024-01-15", streak: 5 },
  { date: "2024-02-01", streak: 12 },
  { date: "2024-02-15", streak: 8 },
  { date: "2024-03-01", streak: 15 },
  { date: "2024-03-15", streak: 23 },
  { date: "2024-03-18", streak: 7 },
]

// Generate heatmap data (GitHub-style)
const generateHeatmapData = () => {
  const data = []
  const startDate = new Date("2024-01-01")
  const endDate = new Date("2024-03-18")

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const completionRate = Math.floor(Math.random() * 5) // 0-4 intensity levels
    data.push({
      date: d.toISOString().split("T")[0],
      count: completionRate,
      day: d.getDay(),
      week: Math.floor((d.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)),
    })
  }
  return data
}

const heatmapData = generateHeatmapData()

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("completion")

  const getHeatmapColor = (count) => {
    const colors = [
      "bg-gray-100", // 0
      "bg-green-200", // 1
      "bg-green-300", // 2
      "bg-green-400", // 3
      "bg-green-500", // 4
    ]
    return colors[count] || colors[0]
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
  }

  const formatHour = (hour) => {
    return hour.replace(":00", "h")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-sans">Analytics y Reportes</h1>
              <p className="text-muted-foreground font-serif">Analiza tu progreso y descubre patrones en tus hábitos</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 días</SelectItem>
                  <SelectItem value="30d">30 días</SelectItem>
                  <SelectItem value="90d">90 días</SelectItem>
                  <SelectItem value="1y">1 año</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
            <TabsTrigger value="patterns">Patrones</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Tasa de Éxito
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-green-600">+5% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    Racha Promedio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.3</div>
                  <p className="text-xs text-green-600">+2.1 días</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    Hábitos Activos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">sin cambios</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    Mejor Día
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Lun</div>
                  <p className="text-xs text-muted-foreground">92% éxito</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Completion Rate Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Tendencia de Completación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={habitTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip
                        labelFormatter={(value) => formatDate(value)}
                        formatter={(value) => [`${value}%`, "Tasa de Completación"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="rate"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5" />
                    Distribución por Categoría
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Mapa de Consistencia (últimos 3 meses)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-53 gap-1">
                    {heatmapData.map((day, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-sm ${getHeatmapColor(day.count)} border border-gray-200`}
                        title={`${day.date}: ${day.count} hábitos completados`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Menos</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded-sm ${getHeatmapColor(level)} border border-gray-200`}
                        />
                      ))}
                    </div>
                    <span>Más</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Comparación Semanal</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar dataKey="thisMonth" fill="hsl(var(--primary))" name="Este Mes" />
                      <Bar dataKey="lastMonth" fill="hsl(var(--muted))" name="Mes Anterior" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Streak Evolution */}
              <Card>
                <CardHeader>
                  <CardTitle>Evolución de Rachas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={streakData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(value) => formatDate(value)}
                        formatter={(value) => [`${value} días`, "Racha"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="streak"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Patterns Tab */}
          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Time of Day Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Patrones Horarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={timeOfDayData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" tickFormatter={formatHour} />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(value) => `${value}`}
                        formatter={(value) => [`${value} hábitos`, "Completados"]}
                      />
                      <Bar dataKey="habits" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Best Days Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Mejores Días de la Semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { day: "Lunes", rate: 92, color: "bg-green-500" },
                      { day: "Martes", rate: 88, color: "bg-green-400" },
                      { day: "Miércoles", rate: 85, color: "bg-yellow-400" },
                      { day: "Jueves", rate: 90, color: "bg-green-400" },
                      { day: "Viernes", rate: 82, color: "bg-yellow-400" },
                      { day: "Sábado", rate: 78, color: "bg-orange-400" },
                      { day: "Domingo", rate: 75, color: "bg-orange-400" },
                    ].map((item) => (
                      <div key={item.day} className="flex items-center gap-3">
                        <div className="w-20 text-sm font-medium">{item.day}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.rate}%` }} />
                        </div>
                        <div className="w-12 text-sm font-medium text-right">{item.rate}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Insights Personalizados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">💡 Patrón Detectado</h4>
                    <p className="text-sm text-blue-800">
                      Tienes un 15% más de éxito completando hábitos los lunes. Considera programar hábitos más
                      desafiantes ese día.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">🎯 Recomendación</h4>
                    <p className="text-sm text-green-800">
                      Tu mejor horario es entre 7-8 AM. Intenta mover más hábitos a esta franja horaria para mejorar tu
                      consistencia.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">⚠️ Área de Mejora</h4>
                    <p className="text-sm text-yellow-800">
                      Los fines de semana muestran una caída del 12% en completación. Considera ajustar tus expectativas
                      o crear rutinas específicas.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">🏆 Fortaleza</h4>
                    <p className="text-sm text-purple-800">
                      Excelente consistencia en hábitos de salud (95%). Tu disciplina en esta área puede servir de
                      modelo para otras categorías.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Predicciones y Metas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Proyección Mensual</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Basado en tu tendencia actual, es probable que alcances:
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• 89% de tasa de completación este mes</li>
                      <li>• Racha máxima de 15-18 días</li>
                      <li>• 2,850+ puntos totales</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Próximos Hitos</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Nivel 13</span>
                        <span className="text-sm text-muted-foreground">153 puntos restantes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Racha de 30 días</span>
                        <span className="text-sm text-muted-foreground">23 días restantes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">100 hábitos completados</span>
                        <span className="text-sm text-muted-foreground">44 restantes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
