// Tipos para el Sistema de Seguimiento Personal

// Tipos de seguimiento disponibles
export type TrackingType = 
  | 'habitos' 
  | 'metas' 
  | 'salud' 
  | 'aprendizaje' 
  | 'finanzas' 
  | 'productividad';

// Información de un tipo de seguimiento
export interface TrackingCategory {
  id: TrackingType;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Estado de un item de seguimiento
export type ItemStatus = 'pending' | 'completed' | 'skipped';

// Item individual de seguimiento
export interface TrackingItem {
  id: string;
  title: string;
  description?: string;
  status: ItemStatus;
  createdAt: Date;
  completedAt?: Date;
  targetDate?: Date;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number; // Racha actual
  bestStreak: number; // Mejor racha histórica
}

// Seguimiento completo de una categoría
export interface Tracking {
  id: string;
  type: TrackingType;
  title: string;
  description?: string;
  items: TrackingItem[];
  createdAt: Date;
  isActive: boolean;
  goal?: string;
  targetValue?: number;
  currentValue: number;
}

// Estadísticas de progreso
export interface ProgressStats {
  totalItems: number;
  completedItems: number;
  completionRate: number;
  currentStreak: number;
  bestStreak: number;
  weeklyProgress: number[];
  monthlyProgress: number[];
}

// Configuración de recordatorios
export interface ReminderSettings {
  enabled: boolean;
  time: string; // HH:mm format
  days: number[]; // 0-6 (domingo-sábado)
  message: string;
}

// Usuario y sus datos
export interface UserData {
  trackings: Tracking[];
  reminderSettings: ReminderSettings;
  preferences: {
    theme: 'light' | 'dark';
    language: 'es' | 'en';
    notifications: boolean;
  };
}
