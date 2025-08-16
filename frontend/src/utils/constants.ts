import { TrackingCategory } from '@/types';

// Categorías de seguimiento disponibles
export const TRACKING_CATEGORIES: TrackingCategory[] = [
  {
    id: 'habitos',
    name: 'Hábitos',
    description: 'Seguimiento de hábitos diarios y rutinas',
    icon: '🔄',
    color: 'bg-blue-500'
  },
  {
    id: 'metas',
    name: 'Metas',
    description: 'Objetivos a largo plazo y metas personales',
    icon: '🎯',
    color: 'bg-green-500'
  },
  {
    id: 'salud',
    name: 'Salud',
    description: 'Actividad física, alimentación y bienestar',
    icon: '💪',
    color: 'bg-red-500'
  },
  {
    id: 'aprendizaje',
    name: 'Aprendizaje',
    description: 'Estudios, cursos y desarrollo de habilidades',
    icon: '📚',
    color: 'bg-purple-500'
  },
  {
    id: 'finanzas',
    name: 'Finanzas',
    description: 'Gastos, ahorros y objetivos financieros',
    icon: '💰',
    color: 'bg-yellow-500'
  },
  {
    id: 'productividad',
    name: 'Productividad',
    description: 'Tareas, proyectos y eficiencia personal',
    icon: '⚡',
    color: 'bg-indigo-500'
  }
];

// Frecuencias disponibles para items
export const FREQUENCIES = [
  { value: 'daily', label: 'Diario' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensual' }
];

// Estados de items
export const ITEM_STATUSES = [
  { value: 'pending', label: 'Pendiente', color: 'text-gray-500' },
  { value: 'completed', label: 'Completado', color: 'text-green-600' },
  { value: 'skipped', label: 'Omitido', color: 'text-red-500' }
];

// Mensajes motivacionales
export const MOTIVATIONAL_MESSAGES = [
  '¡Cada pequeño paso cuenta hacia tu meta!',
  'La consistencia es la clave del éxito',
  'Hoy es un nuevo día para mejorar',
  'Tú tienes el poder de cambiar tu vida',
  'Cada día es una oportunidad para crecer',
  'Pequeños cambios, grandes resultados',
  'Tu futuro se construye hoy',
  'La disciplina te llevará donde la motivación no puede',
  'Cada logro es una victoria personal',
  'Tú eres más fuerte de lo que crees'
];

// Configuración de recordatorios
export const REMINDER_TIMES = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00'
];

// Días de la semana
export const DAYS_OF_WEEK = [
  { value: 0, label: 'Domingo', short: 'Dom' },
  { value: 1, label: 'Lunes', short: 'Lun' },
  { value: 2, label: 'Martes', short: 'Mar' },
  { value: 3, label: 'Miércoles', short: 'Mié' },
  { value: 4, label: 'Jueves', short: 'Jue' },
  { value: 5, label: 'Viernes', short: 'Vie' },
  { value: 6, label: 'Sábado', short: 'Sáb' }
];

// Colores para gráficos y elementos visuales
export const CHART_COLORS = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#06B6D4', // cyan-500
  '#84CC16', // lime-500
  '#F97316'  // orange-500
];

// Configuración de notificaciones
export const NOTIFICATION_CONFIG = {
  title: 'Sistema de Seguimiento Personal',
  options: {
    body: '¡Es hora de revisar tus objetivos del día!',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'tracking-reminder',
    requireInteraction: false,
    silent: false
  }
};

// Configuración de localStorage
export const STORAGE_KEYS = {
  USER_DATA: 'personal-tracking-data',
  THEME: 'personal-tracking-theme',
  LANGUAGE: 'personal-tracking-language'
};

// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'Sistema de Seguimiento Personal',
  version: '1.0.0',
  description: 'Aplicación para realizar seguimiento en tiempo real de aspectos importantes de tu vida',
  maxItemsPerTracking: 50,
  maxTrackings: 20,
  defaultReminderTime: '09:00',
  defaultReminderMessage: '¡Es hora de revisar tus objetivos del día!'
};
