import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Dumbbell, Brain, Book, Coffee, Droplets, Moon, Target } from "lucide-react";
import { HabitFormProps } from '../habits.types';

/**
 * HabitForm provides a modal form for creating and editing habits
 * 
 * @param isOpen - Whether the form modal is open
 * @param habit - Habit being edited (null for new habit)
 * @param formData - Current form data
 * @param formErrors - Form validation errors
 * @param onClose - Callback fired when form is closed
 * @param onSubmit - Callback fired when form is submitted
 * @param onFormChange - Callback fired when form data changes
 */
const HabitForm: React.FC<HabitFormProps> = ({
  isOpen,
  habit,
  formData,
  formErrors,
  onClose,
  onSubmit,
  onFormChange
}) => {
  // Mock data - these would come from the hook in the actual implementation
  const categories = [
    { id: "salud", name: "Salud", icon: Heart },
    { id: "ejercicio", name: "Ejercicio", icon: Dumbbell },
    { id: "bienestar", name: "Bienestar", icon: Moon },
    { id: "aprendizaje", name: "Aprendizaje", icon: Book },
    { id: "productividad", name: "Productividad", icon: Target },
  ];

  const habitIcons = [
    { id: "heart", icon: Heart, name: "Corazón" },
    { id: "dumbbell", icon: Dumbbell, name: "Ejercicio" },
    { id: "brain", icon: Brain, name: "Cerebro" },
    { id: "book", icon: Book, name: "Libro" },
    { id: "coffee", icon: Coffee, name: "Café" },
    { id: "droplets", icon: Droplets, name: "Agua" },
    { id: "moon", icon: Moon, name: "Luna" },
    { id: "target", icon: Target, name: "Objetivo" },
  ];

  const frequencies = [
    { id: "daily", name: "Diario", description: "Todos los días" },
    { id: "weekly", name: "Semanal", description: "Una vez por semana" },
    { id: "custom", name: "Personalizado", description: "Días específicos" },
  ];

  const difficulties = [
    { id: 1, name: "Fácil", points: 5, color: "text-green-600" },
    { id: 2, name: "Medio", points: 10, color: "text-yellow-600" },
    { id: 3, name: "Difícil", points: 15, color: "text-red-600" },
  ];

  const weekDays = [
    { id: 0, name: "Dom", fullName: "Domingo" },
    { id: 1, name: "Lun", fullName: "Lunes" },
    { id: 2, name: "Mar", fullName: "Martes" },
    { id: 3, name: "Mié", fullName: "Miércoles" },
    { id: 4, name: "Jue", fullName: "Jueves" },
    { id: 5, name: "Vie", fullName: "Viernes" },
    { id: 6, name: "Sáb", fullName: "Sábado" },
  ];

  const handleInputChange = (field: string, value: any) => {
    onFormChange({ [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{habit ? "Editar Hábito" : "Crear Nuevo Hábito"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del hábito</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ej: Ejercicio matutino"
              required
            />
            {formErrors.name && (
              <p className="text-sm text-red-600">{formErrors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {category.name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {formErrors.category && (
                <p className="text-sm text-red-600">{formErrors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Icono</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => handleInputChange('icon', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un icono" />
                </SelectTrigger>
                <SelectContent>
                  {habitIcons.map((iconItem) => {
                    const Icon = iconItem.icon;
                    return (
                      <SelectItem key={iconItem.id} value={iconItem.id}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {iconItem.name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {formErrors.icon && (
                <p className="text-sm text-red-600">{formErrors.icon}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Frecuencia</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => handleInputChange('frequency', value)}
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
              {formErrors.frequency && (
                <p className="text-sm text-red-600">{formErrors.frequency}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Dificultad</Label>
              <Select
                value={formData.difficulty.toString()}
                onValueChange={(value) => handleInputChange('difficulty', Number.parseInt(value))}
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
              {formErrors.difficulty && (
                <p className="text-sm text-red-600">{formErrors.difficulty}</p>
              )}
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
                        : [...formData.targetDays, day.id];
                      handleInputChange('targetDays', newTargetDays);
                    }}
                  >
                    {day.name}
                  </Button>
                ))}
              </div>
              {formErrors.targetDays && (
                <p className="text-sm text-red-600">{formErrors.targetDays}</p>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {habit ? "Actualizar Hábito" : "Crear Hábito"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

HabitForm.displayName = 'HabitForm';

export default HabitForm;