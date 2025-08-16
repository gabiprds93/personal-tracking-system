import { useState, useEffect, useCallback } from 'react';
import { UserData } from '@/types';
import { NOTIFICATION_CONFIG } from '@/utils/constants';

export const useNotifications = (userData: UserData | null) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  // Verificar soporte de notificaciones
  useEffect(() => {
    setIsSupported('Notification' in window);
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Solicitar permisos
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error al solicitar permisos de notificación:', error);
      return false;
    }
  }, [isSupported]);

  // Enviar notificación
  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (!isSupported || permission !== 'granted') return false;

    try {
      const notification = new Notification(title, {
        ...NOTIFICATION_CONFIG.options,
        ...options
      });

      // Limpiar notificación después de 5 segundos
      setTimeout(() => {
        notification.close();
      }, 5000);

      return true;
    } catch (error) {
      console.error('Error al enviar notificación:', error);
      return false;
    }
  }, [isSupported, permission]);

  // Enviar recordatorio
  const sendReminder = useCallback(() => {
    if (!userData?.reminderSettings.enabled) return false;

    const message = userData.reminderSettings.message || NOTIFICATION_CONFIG.options.body;
    
    return sendNotification(NOTIFICATION_CONFIG.title, {
      body: message,
      tag: 'tracking-reminder'
    });
  }, [userData, sendNotification]);

  // Verificar si es hora de enviar recordatorio
  const checkReminderTime = useCallback(() => {
    if (!userData?.reminderSettings.enabled) return;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const currentDay = now.getDay();
    
    const { time, days } = userData.reminderSettings;
    
    // Verificar si es la hora correcta y el día correcto
    if (currentTime === time && days.includes(currentDay)) {
      sendReminder();
    }
  }, [userData, sendReminder]);

  // Configurar verificación periódica
  useEffect(() => {
    if (!userData?.reminderSettings.enabled) return;

    // Verificar cada minuto
    const interval = setInterval(checkReminderTime, 60000);
    
    return () => clearInterval(interval);
  }, [userData, checkReminderTime]);

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    sendReminder,
    checkReminderTime
  };
};
