import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GoalFormProps } from '../goals.types';

/**
 * GoalForm provides a modal form for creating and editing goals
 * 
 * @param isOpen - Whether the form modal is open
 * @param goal - Goal being edited (null for new goal)
 * @param formData - Current form data
 * @param formErrors - Form validation errors
 * @param categories - Available goal categories
 * @param onClose - Callback fired when form is closed
 * @param onSubmit - Callback fired when form is submitted
 * @param onFormChange - Callback fired when form data changes
 */
const GoalForm: React.FC<GoalFormProps> = ({
  isOpen,
  goal,
  formData,
  formErrors,
  categories,
  onClose,
  onSubmit,
  onFormChange
}) => {
  const handleInputChange = (field: string, value: string) => {
    onFormChange({ [field]: value });
  };

  const handleMilestoneChange = (index: number, value: string) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index] = value;
    onFormChange({ milestones: newMilestones });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{goal ? "Editar Meta" : "Crear Nueva Meta"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título de la meta</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ej: Aprender React Avanzado"
              required
            />
            {formErrors.title && (
              <p className="text-sm text-red-600">{formErrors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción detallada</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe específicamente qué quieres lograr y cómo lo medirás..."
              rows={3}
            />
            {formErrors.description && (
              <p className="text-sm text-red-600">{formErrors.description}</p>
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
                          {Icon && <Icon className="w-4 h-4" />}
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
              <Label htmlFor="targetDate">Fecha límite</Label>
              <Input
                id="targetDate"
                type="date"
                value={formData.targetDate}
                onChange={(e) => handleInputChange('targetDate', e.target.value)}
                required
              />
              {formErrors.targetDate && (
                <p className="text-sm text-red-600">{formErrors.targetDate}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Hitos intermedios (opcional)</Label>
            <div className="space-y-2">
              {formData.milestones.map((milestone, index) => (
                <Input
                  key={index}
                  value={milestone}
                  onChange={(e) => handleMilestoneChange(index, e.target.value)}
                  placeholder={`Hito ${index + 1}`}
                />
              ))}
            </div>
            {formErrors.milestones && (
              <p className="text-sm text-red-600">{formErrors.milestones}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {goal ? "Actualizar Meta" : "Crear Meta"}
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

GoalForm.displayName = 'GoalForm';

export default GoalForm;