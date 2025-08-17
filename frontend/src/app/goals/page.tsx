"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Target,
  Calendar,
  CheckCircle2,
  Flag,
  BookOpen,
  TrendingUp,
  Award,
  CheckSquare,
} from "lucide-react"
import { format, differenceInDays, parseISO } from "date-fns"
import { es } from "date-fns/locale"

// Goal categories
const goalCategories = [
  { id: "salud", name: "Salud", icon: Target, color: "text-red-500 bg-red-50 border-red-200" },
  { id: "carrera", name: "Carrera", icon: TrendingUp, color: "text-blue-500 bg-blue-50 border-blue-200" },
  { id: "aprendizaje", name: "Aprendizaje", icon: BookOpen, color: "text-purple-500 bg-purple-50 border-purple-200" },
  { id: "personal", name: "Personal", icon: Award, color: "text-green-500 bg-green-50 border-green-200" },
  { id: "financiero", name: "Financiero", icon: TrendingUp, color: "text-yellow-500 bg-yellow-50 border-yellow-200" },
]

// Goal status
const goalStatuses = [
  { id: "active", name: "Activa", color: "bg-blue-100 text-blue-800" },
  { id: "completed", name: "Completada", color: "bg-green-100 text-green-800" },
  { id: "paused", name: "Pausada", color: "bg-yellow-100 text-yellow-800" },
  { id: "overdue", name: "Vencida", color: "bg-red-100 text-red-800" },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Aprender React Avanzado",
      description:
        "Dominar conceptos avanzados de React incluyendo hooks personalizados, context API y optimización de rendimiento",
      category: "aprendizaje",
      targetDate: "2024-06-30",
      progress: 65,
      status: "active",
      createdAt: "2024-01-15",
      milestones: [
        { id: 1, title: "Completar curso de hooks", completed: true, completedAt: "2024-02-15" },
        { id: 2, title: "Construir proyecto con Context API", completed: true, completedAt: "2024-03-10" },
        { id: 3, title: "Optimizar aplicación existente", completed: false, completedAt: null },
        { id: 4, title: "Crear tutorial para otros", completed: false, completedAt: null },
      ],
      notes: [
        { id: 1, content: "Excelente progreso con los hooks personalizados", date: "2024-02-20" },
        { id: 2, content: "Context API más complejo de lo esperado, pero muy útil", date: "2024-03-12" },
      ],
    },
    {
      id: 2,
      title: "Correr 10K en menos de 50 minutos",
      description: "Mejorar mi tiempo de carrera de 10K desde 55 minutos actuales hasta menos de 50 minutos",
      category: "salud",
      targetDate: "2024-05-15",
      progress: 40,
      status: "active",
      createdAt: "2024-02-01",
      milestones: [
        { id: 1, title: "Correr 5K sin parar", completed: true, completedAt: "2024-02-20" },
        { id: 2, title: "Completar primer 10K", completed: true, completedAt: "2024-03-05" },
        { id: 3, title: "Reducir tiempo a 52 minutos", completed: false, completedAt: null },
        { id: 4, title: "Alcanzar meta de 50 minutos", completed: false, completedAt: null },
      ],
      notes: [
        { id: 1, content: "Primera semana difícil, pero ya veo mejoras", date: "2024-02-08" },
        { id: 2, content: "¡Logré mi primer 10K! Tiempo: 54 minutos", date: "2024-03-05" },
      ],
    },
    {
      id: 3,
      title: "Ahorrar $10,000 para emergencias",
      description: "Crear un fondo de emergencia sólido ahorrando $500 mensuales durante 20 meses",
      category: "financiero",
      targetDate: "2025-01-31",
      progress: 25,
      status: "active",
      createdAt: "2024-01-01",
      milestones: [
        { id: 1, title: "Ahorrar primeros $1,000", completed: true, completedAt: "2024-02-28" },
        { id: 2, title: "Alcanzar $2,500", completed: true, completedAt: "2024-03-31" },
        { id: 3, title: "Llegar a $5,000", completed: false, completedAt: null },
        { id: 4, title: "Completar $10,000", completed: false, completedAt: null },
      ],
      notes: [{ id: 1, content: "Automaticé las transferencias, mucho más fácil", date: "2024-01-15" }],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [selectedGoal, setSelectedGoal] = useState(null)

  // Form state for new/edit goal
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    targetDate: "",
    milestones: ["", "", "", ""],
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      targetDate: "",
      milestones: ["", "", "", ""],
    })
    setEditingGoal(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.category || !formData.targetDate) return

    const goalData = {
      ...formData,
      id: editingGoal ? editingGoal.id : Date.now(),
      progress: editingGoal ? editingGoal.progress : 0,
      status: editingGoal ? editingGoal.status : "active",
      createdAt: editingGoal ? editingGoal.createdAt : new Date().toISOString().split("T")[0],
      milestones: formData.milestones
        .filter((m) => m.trim())
        .map((milestone, index) => ({
          id: index + 1,
          title: milestone,
          completed: false,
          completedAt: null,
        })),
      notes: editingGoal ? editingGoal.notes : [],
    }

    if (editingGoal) {
      setGoals(goals.map((g) => (g.id === editingGoal.id ? goalData : g)))
    } else {
      setGoals([...goals, goalData])
    }

    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEdit = (goal) => {
    setFormData({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      targetDate: goal.targetDate,
      milestones: [
        ...goal.milestones.map((m) => m.title),
        ...Array(Math.max(0, 4 - goal.milestones.length)).fill(""),
      ].slice(0, 4),
    })
    setEditingGoal(goal)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (goalId) => {
    setGoals(goals.filter((g) => g.id !== goalId))
    if (selectedGoal?.id === goalId) {
      setSelectedGoal(null)
    }
  }

  const toggleMilestone = (goalId, milestoneId) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.map((milestone) => {
            if (milestone.id === milestoneId) {
              return {
                ...milestone,
                completed: !milestone.completed,
                completedAt: !milestone.completed ? new Date().toISOString().split("T")[0] : null,
              }
            }
            return milestone
          })

          const completedCount = updatedMilestones.filter((m) => m.completed).length
          const newProgress = Math.round((completedCount / updatedMilestones.length) * 100)

          return {
            ...goal,
            milestones: updatedMilestones,
            progress: newProgress,
            status: newProgress === 100 ? "completed" : goal.status,
          }
        }
        return goal
      }),
    )
  }

  const addNote = (goalId, noteContent) => {
    if (!noteContent.trim()) return

    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            notes: [
              ...goal.notes,
              {
                id: Date.now(),
                content: noteContent,
                date: new Date().toISOString().split("T")[0],
              },
            ],
          }
        }
        return goal
      }),
    )
  }

  const getGoalStatus = (goal) => {
    if (goal.status === "completed") return goalStatuses.find((s) => s.id === "completed")
    if (goal.status === "paused") return goalStatuses.find((s) => s.id === "paused")

    const today = new Date()
    const targetDate = parseISO(goal.targetDate)
    const isOverdue = today > targetDate && goal.progress < 100

    return isOverdue ? goalStatuses.find((s) => s.id === "overdue") : goalStatuses.find((s) => s.id === "active")
  }

  const getDaysRemaining = (targetDate) => {
    const today = new Date()
    const target = parseISO(targetDate)
    return differenceInDays(target, today)
  }

  const filteredGoals = goals.filter((goal) => {
    const matchesSearch =
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || goal.category === selectedCategory
    const goalStatus = getGoalStatus(goal)
    const matchesStatus = selectedStatus === "all" || goalStatus.id === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getCategoryInfo = (categoryId) => goalCategories.find((c) => c.id === categoryId)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-sans">Seguimiento de Metas</h1>
              <p className="text-muted-foreground font-serif">Gestiona tus objetivos SMART y hitos importantes</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={resetForm}>
                  <Plus className="w-4 h-4" />
                  Nueva Meta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingGoal ? "Editar Meta" : "Crear Nueva Meta"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título de la meta</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ej: Aprender React Avanzado"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción detallada</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe específicamente qué quieres lograr y cómo lo medirás..."
                      rows={3}
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
                          {goalCategories.map((category) => {
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
                      <Label htmlFor="targetDate">Fecha límite</Label>
                      <Input
                        id="targetDate"
                        type="date"
                        value={formData.targetDate}
                        onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Hitos intermedios (opcional)</Label>
                    <div className="space-y-2">
                      {formData.milestones.map((milestone, index) => (
                        <Input
                          key={index}
                          value={milestone}
                          onChange={(e) => {
                            const newMilestones = [...formData.milestones]
                            newMilestones[index] = e.target.value
                            setFormData({ ...formData, milestones: newMilestones })
                          }}
                          placeholder={`Hito ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingGoal ? "Actualizar Meta" : "Crear Meta"}
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
              placeholder="Buscar metas..."
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
              {goalCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {goalStatuses.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Goals List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredGoals.map((goal) => {
              const categoryInfo = getCategoryInfo(goal.category)
              const status = getGoalStatus(goal)
              const daysRemaining = getDaysRemaining(goal.targetDate)
              const Icon = categoryInfo?.icon

              return (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedGoal?.id === goal.id ? "ring-2 ring-primary/20 bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedGoal(goal)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg border flex items-center justify-center ${categoryInfo?.color}`}
                        >
                          {Icon && <Icon className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-sans">{goal.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{goal.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(goal)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(goal.id)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <Badge className={status.color}>{status.name}</Badge>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {daysRemaining > 0
                              ? `${daysRemaining} días restantes`
                              : daysRemaining === 0
                                ? "Vence hoy"
                                : `Venció hace ${Math.abs(daysRemaining)} días`}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progreso</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {goal.milestones.filter((m) => m.completed).length} de {goal.milestones.length} hitos
                        </span>
                        <span>{goal.notes.length} notas</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {filteredGoals.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No se encontraron metas</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                    ? "Intenta ajustar tus filtros de búsqueda"
                    : "Comienza creando tu primera meta SMART"}
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Meta
                </Button>
              </div>
            )}
          </div>

          {/* Goal Details */}
          <div>
            {selectedGoal ? (
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="w-5 h-5" />
                    Detalles de la Meta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">{selectedGoal.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedGoal.description}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <CheckSquare className="w-4 h-4" />
                      Hitos ({selectedGoal.milestones.filter((m) => m.completed).length}/
                      {selectedGoal.milestones.length})
                    </h4>
                    {selectedGoal.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-6 h-6 p-0"
                          onClick={() => toggleMilestone(selectedGoal.id, milestone.id)}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 ${milestone.completed ? "text-primary fill-current" : "text-muted-foreground"}`}
                          />
                        </Button>
                        <span className={`text-sm ${milestone.completed ? "line-through text-muted-foreground" : ""}`}>
                          {milestone.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Notas y Reflexiones
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedGoal.notes.map((note) => (
                        <div key={note.id} className="p-2 bg-muted/50 rounded text-sm">
                          <p>{note.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(parseISO(note.date), "dd MMM yyyy", { locale: es })}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Agregar nota..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addNote(selectedGoal.id, e.target.value)
                            e.target.value = ""
                          }
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-24">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Selecciona una meta para ver sus detalles, hitos y notas</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
