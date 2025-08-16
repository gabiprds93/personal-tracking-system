import { UserData, Tracking, TrackingItem } from '@/types';

// Clave para almacenar datos en localStorage
const STORAGE_KEY = 'personal-tracking-data';

// Datos iniciales por defecto
const defaultUserData: UserData = {
  trackings: [],
  reminderSettings: {
    enabled: true,
    time: '09:00',
    days: [1, 2, 3, 4, 5, 6, 0], // Todos los días
    message: '¡Es hora de revisar tus objetivos del día!'
  },
  preferences: {
    theme: 'light',
    language: 'es',
    notifications: true
  }
};

/**
 * Guarda los datos del usuario en localStorage
 */
export const saveUserData = (data: UserData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error al guardar datos:', error);
  }
};

/**
 * Carga los datos del usuario desde localStorage
 */
export const loadUserData = (): UserData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Convertir fechas de string a Date objects
      data.trackings = data.trackings.map((tracking: any) => ({
        ...tracking,
        createdAt: new Date(tracking.createdAt),
        items: tracking.items.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          completedAt: item.completedAt ? new Date(item.completedAt) : undefined,
          targetDate: item.targetDate ? new Date(item.targetDate) : undefined
        }))
      }));
      return data;
    }
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
  return defaultUserData;
};

/**
 * Actualiza un seguimiento específico
 */
export const updateTracking = (trackingId: string, updates: Partial<Tracking>): void => {
  const data = loadUserData();
  const trackingIndex = data.trackings.findIndex(t => t.id === trackingId);
  
  if (trackingIndex !== -1) {
    data.trackings[trackingIndex] = { ...data.trackings[trackingIndex], ...updates };
    saveUserData(data);
  }
};

/**
 * Agrega un nuevo seguimiento
 */
export const addTracking = (tracking: Tracking): void => {
  const data = loadUserData();
  data.trackings.push(tracking);
  saveUserData(data);
};

/**
 * Elimina un seguimiento
 */
export const deleteTracking = (trackingId: string): void => {
  const data = loadUserData();
  data.trackings = data.trackings.filter(t => t.id !== trackingId);
  saveUserData(data);
};

/**
 * Actualiza un item específico de un seguimiento
 */
export const updateTrackingItem = (trackingId: string, itemId: string, updates: Partial<TrackingItem>): void => {
  const data = loadUserData();
  const tracking = data.trackings.find(t => t.id === trackingId);
  
  if (tracking) {
    const itemIndex = tracking.items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      tracking.items[itemIndex] = { ...tracking.items[itemIndex], ...updates };
      saveUserData(data);
    }
  }
};

/**
 * Agrega un nuevo item a un seguimiento
 */
export const addTrackingItem = (trackingId: string, item: TrackingItem): void => {
  const data = loadUserData();
  const tracking = data.trackings.find(t => t.id === trackingId);
  
  if (tracking) {
    tracking.items.push(item);
    saveUserData(data);
  }
};

/**
 * Actualiza las configuraciones de recordatorios
 */
export const updateReminderSettings = (settings: Partial<UserData['reminderSettings']>): void => {
  const data = loadUserData();
  data.reminderSettings = { ...data.reminderSettings, ...settings };
  saveUserData(data);
};

/**
 * Actualiza las preferencias del usuario
 */
export const updatePreferences = (preferences: Partial<UserData['preferences']>): void => {
  const data = loadUserData();
  data.preferences = { ...data.preferences, ...preferences };
  saveUserData(data);
};
