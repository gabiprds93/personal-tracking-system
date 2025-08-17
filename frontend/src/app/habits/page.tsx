"use client"

import { useState, useEffect } from "react"
import { HabitsStorage } from "@/lib/storage"
import { validateHabit } from "@/lib/validations"

// Types
interface Habit {
  id: number
  name: string
  category: string
  icon: string
  frequency: string
  difficulty: number
  targetDays: number[]
  createdAt: string
  streak: number
  completedToday: boolean
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Heart,
  Dumbbell,
  Brain,
  Briefcase,
  Book,
  Droplets,
  Moon,
  Coffee,
  Target,
  CheckCircle2,
  Clock,
  Repeat,
} from "lucide-react"

// Habit categories with icons and colors
const categories = [
  { id: "salud", name: "Salud", icon: Heart, color: "text-red-500 bg-red-50 border-red-200" },
  { id: "ejercicio", name: "Ejercicio", icon: Dumbbell, color: "text-orange-500 bg-orange-50 border-orange-200" },
  { id: "bienestar", name: "Bienestar", icon: Moon, color: "text-purple-500 bg-purple-50 border-purple-200" },
  { id: "aprendizaje", name: "Aprendizaje", icon: Book, color: "text-blue-500 bg-blue-50 border-blue-200" },
  { id: "productividad", name: "Productividad", icon: Briefcase, color: "text-green-500 bg-green-50 border-green-200" },
]

// Available icons for habits
const habitIcons = [
  { id: "heart", icon: Heart, name: "Corazón" },
  { id: "dumbbell", icon: Dumbbell, name: "Ejercicio" },
  { id: "brain", icon: Brain, name: "Cerebro" },
  { id: "book", icon: Book, name: "Libro" },
  { id: "coffee", icon: Coffee, name: "Café" },
  { id: "droplets", icon: Droplets, name: "Agua" },
  { id: "moon", icon: Moon, name: "Luna" },
  { id: "target", icon: Target, name: "Objetivo" },
]

// Frequency options
const frequencies = [
  { id: "daily", name: "Diario", description: "Todos los días" },
  { id: "weekly", name: "Semanal", description: "Una vez por semana" },
  { id: "custom", name: "Personalizado", description: "Días específicos" },
]

// Difficulty levels
const difficulties = [
  { id: 1, name: "Fácil", points: 5, color: "text-green-600" },
  { id: 2, name: "Medio", points: 10, color: "text-yellow-600" },
  { id: 3, name: "Difícil", points: 15, color: "text-red-600" },
]

// Days of the week for custom frequency
const weekDays = [
  { id: 0, name: "Dom", fullName: "Domingo" },
  { id: 1, name: "Lun", fullName: "Lunes" },
  { id: 2, name: "Mar", fullName: "Martes" },
  { id: 3, name: "Mié", fullName: "Miércoles" },
  { id: 4, name: "Jue", fullName: "Jueves" },
  { id: 5, name: "Vie", fullName: "Viernes" },
  { id: 6, name: "Sáb", fullName: "Sábado" },
]

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)

  // Load habits from localStorage on mount
  useEffect(() => {
    const savedHabits = HabitsStorage.get()
    if (savedHabits.length === 0) {
      // Initialize with default habits if none exist
      const defaultHabits = [
        {
          id: 1,
          name: "Ejercicio matutino",
          category: "ejercicio",
          icon: "dumbbell",
          frequency: "daily",
          difficulty: 2,
          targetDays: [],
          createdAt: new Date().toISOString(),
          streak: 7,
          completedToday: true,
        },
        {
          id: 2,
          name: "Leer 30 minutos",
          category: "aprendizaje",
          icon: "book",
          frequency: "daily",
          difficulty: 1,
          targetDays: [],
          createdAt: new Date().toISOString(),
          streak: 12,
          completedToday: true,
        },
        {
          id: 3,
          name: "Meditar",
          category: "bienestar",
          icon: "moon",
          frequency: "daily",
          difficulty: 2,
          targetDays: [],
          createdAt: new Date().toISOString(),
          streak: 5,
          completedToday: false,
        },
      ]
      setHabits(defaultHabits)
      HabitsStorage.set(defaultHabits)
    } else {
      setHabits(savedHabits)
    }
    setLoading(false)
  }, [])

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    if (!loading && habits.length > 0) {
      HabitsStorage.set(habits)
    }
  }, [habits, loading])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState(null)

  // Form state for new/edit habit
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    icon: "",
    frequency: "daily",
    difficulty: 1,
    targetDays: [],
  })
  
  const [formErrors, setFormErrors] = useState({})

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      icon: "",
      frequency: "daily",
      difficulty: 1,
      targetDays: [],
    })
    setEditingHabit(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors({})

    // Validate form data
    const validation = validateHabit(formData)
    if (!validation.isValid) {
      setFormErrors(validation.errors)
      return
    }

    const habitData = {
      ...formData,
      id: editingHabit ? editingHabit.id : Date.now(),
      createdAt: editingHabit ? editingHabit.createdAt : new Date().toISOString(),
      streak: editingHabit ? editingHabit.streak : 0,
      completedToday: editingHabit ? editingHabit.completedToday : false,
    }

    if (editingHabit) {
      setHabits(habits.map((h) => (h.id === editingHabit.id ? habitData : h)))
    } else {
      setHabits([...habits, habitData])
    }

    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEdit = (habit) => {
    setFormData({
      name: habit.name,
      category: habit.category,
      icon: habit.icon,
      frequency: habit.frequency,
      difficulty: habit.difficulty,
      targetDays: habit.targetDays,
    })
    setEditingHabit(habit)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (habitId) => {
    setHabits(habits.filter((h) => h.id !== habitId))
  }

  const toggleHabitCompletion = (habitId) => {
    setHabits(
      habits.map((h) =>
        h.id === habitId
          ? {
              ...h,
              completedToday: !h.completedToday,
              streak: !h.completedToday ? h.streak + 1 : Math.max(0, h.streak - 1),
            }
          : h,
      ),
    )
  }

  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || habit.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryInfo = (categoryId) => categories.find((c) => c.id === categoryId)
  const getIconComponent = (iconId) => habitIcons.find((i) => i.id === iconId)?.icon
  const getDifficultyInfo = (difficultyId) => difficulties.find((d) => d.id === difficultyId)

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-sans">Gestión de Hábitos</h1>
              <p className="text-muted-foreground font-serif">Administra y personaliza tus hábitos diarios</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={resetForm}>
                  <Plus className="w-4 h-4" />
                  Nuevo Hábito
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingHabit ? "Editar Hábito" : "Crear Nuevo Hábito"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del hábito</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Ejercicio matutino"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Categoría</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => {
                            const Icon = category.icon
                            return (
                              <SelectItem key={category.id} value={category.id}>
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4" />
                                  {category.name}
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Icono</Label>
                      <Select
                        value={formData.icon}
                        onValueChange={(value) => setFormData({ ...formData, icon: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un icono" />
                        </SelectTrigger>
                        <SelectContent>
                          {habitIcons.map((iconItem) => {
                            const Icon = iconItem.icon
                            return (
                              <SelectItem key={iconItem.id} value={iconItem.id}>
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4" />
                                  {iconItem.name}
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Frecuencia</Label>
                      <Select
                        value={formData.frequency}
                        onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencies.map((freq) => (
                            <SelectItem key={freq.id} value={freq.id}>
                              <div>
                                <div className="font-medium">{freq.name}</div>
                                <div className="text-xs text-muted-foreground">{freq.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Dificultad</Label>
                      <Select
                        value={formData.difficulty.toString()}
                        onValueChange={(value) => setFormData({ ...formData, difficulty: Number.parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {difficulties.map((diff) => (
                            <SelectItem key={diff.id} value={diff.id.toString()}>
                              <div className="flex items-center gap-2">
                                <span className={diff.color}>{diff.name}</span>
                                <span className="text-xs text-muted-foreground">+{diff.points} puntos</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.frequency === "custom" && (
                    <div className="space-y-2">
                      <Label>Días de la semana</Label>
                      <div className="flex gap-2 flex-wrap">
                        {weekDays.map((day) => (
                          <Button
                            key={day.id}
                            type="button"
                            variant={formData.targetDays.includes(day.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              const newTargetDays = formData.targetDays.includes(day.id)
                                ? formData.targetDays.filter((d) => d !== day.id)
                                : [...formData.targetDays, day.id]
                              setFormData({ ...formData, targetDays: newTargetDays })
                            }}
                          >
                            {day.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingHabit ? "Actualizar Hábito" : "Crear Hábito"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar hábitos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Habits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHabits.map((habit) => {
            const categoryInfo = getCategoryInfo(habit.category)
            const IconComponent = getIconComponent(habit.icon)
            const difficultyInfo = getDifficultyInfo(habit.difficulty)

            return (
              <Card
                key={habit.id}
                className={`relative transition-all duration-200 hover:shadow-md ${habit.completedToday ? "ring-2 ring-primary/20 bg-primary/5" : ""}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg border flex items-center justify-center ${categoryInfo?.color}`}
                      >
                        {IconComponent && <IconComponent className="w-5 h-5" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-sans">{habit.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {categoryInfo?.name}
                          </Badge>
                          <span className={`text-xs font-medium ${difficultyInfo?.color}`}>
                            +{difficultyInfo?.points} pts
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(habit)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(habit.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {habit.frequency === "daily"
                            ? "Diario"
                            : habit.frequency === "weekly"
                              ? "Semanal"
                              : "Personalizado"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Repeat className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{habit.streak} días</span>
                      </div>
                    </div>

                    <Button
                      variant={habit.completedToday ? "default" : "outline"}
                      className="w-full gap-2"
                      onClick={() => toggleHabitCompletion(habit.id)}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${habit.completedToday ? "fill-current" : ""}`} />
                      {habit.completedToday ? "Completado hoy" : "Marcar como completado"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredHabits.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No se encontraron hábitos</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedCategory !== "all"
                ? "Intenta ajustar tus filtros de búsqueda"
                : "Comienza creando tu primer hábito"}
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Crear Hábito
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
