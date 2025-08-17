// Form validation utilities
export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export const validateHabit = (data: {
  name: string
  category: string
  icon: string
  frequency: string
  difficulty: number
  targetDays?: number[]
}): ValidationResult => {
  const errors: Record<string, string> = {}

  // Name validation
  if (!data.name?.trim()) {
    errors.name = 'El nombre del hábito es requerido'
  } else if (data.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres'
  } else if (data.name.trim().length > 50) {
    errors.name = 'El nombre no puede exceder 50 caracteres'
  }

  // Category validation
  if (!data.category) {
    errors.category = 'La categoría es requerida'
  }

  // Icon validation
  if (!data.icon) {
    errors.icon = 'El icono es requerido'
  }

  // Frequency validation
  if (!data.frequency) {
    errors.frequency = 'La frecuencia es requerida'
  }

  // Custom frequency validation
  if (data.frequency === 'custom' && (!data.targetDays || data.targetDays.length === 0)) {
    errors.targetDays = 'Debes seleccionar al menos un día para la frecuencia personalizada'
  }

  // Difficulty validation
  if (!data.difficulty || data.difficulty < 1 || data.difficulty > 3) {
    errors.difficulty = 'La dificultad debe ser entre 1 y 3'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateGoal = (data: {
  title: string
  description: string
  category: string
  targetDate: string
  milestones: string[]
}): ValidationResult => {
  const errors: Record<string, string> = {}

  // Title validation
  if (!data.title?.trim()) {
    errors.title = 'El título de la meta es requerido'
  } else if (data.title.trim().length < 5) {
    errors.title = 'El título debe tener al menos 5 caracteres'
  } else if (data.title.trim().length > 100) {
    errors.title = 'El título no puede exceder 100 caracteres'
  }

  // Description validation
  if (data.description && data.description.length > 500) {
    errors.description = 'La descripción no puede exceder 500 caracteres'
  }

  // Category validation
  if (!data.category) {
    errors.category = 'La categoría es requerida'
  }

  // Target date validation
  if (!data.targetDate) {
    errors.targetDate = 'La fecha límite es requerida'
  } else {
    const targetDate = new Date(data.targetDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (targetDate <= today) {
      errors.targetDate = 'La fecha límite debe ser en el futuro'
    }
    
    // Check if date is too far in the future (5 years)
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 5)
    if (targetDate > maxDate) {
      errors.targetDate = 'La fecha límite no puede ser más de 5 años en el futuro'
    }
  }

  // Milestones validation
  const validMilestones = data.milestones?.filter(m => m.trim()) || []
  if (validMilestones.length > 10) {
    errors.milestones = 'No puedes tener más de 10 hitos'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): ValidationResult => {
  const errors: Record<string, string> = {}

  if (!password) {
    errors.password = 'La contraseña es requerida'
  } else {
    if (password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres'
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.password = 'La contraseña debe contener al menos una letra minúscula'
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.password = 'La contraseña debe contener al menos una letra mayúscula'
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.password = 'La contraseña debe contener al menos un número'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}