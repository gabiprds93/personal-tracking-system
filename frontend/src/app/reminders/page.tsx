'use client';

import { useState, useEffect } from 'react';
import { UserData } from '@/types';
import { loadUserData, saveUserData } from '@/utils/storage';
import { REMINDER_TIMES, DAYS_OF_WEEK } from '@/utils/constants';
import Navigation from '@/components/Navigation';
import SettingsModal from '@/components/SettingsModal';

export default function RemindersPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  // Cargar datos al inicializar
  useEffect(() => {
    const data = loadUserData();
    setUserData(data);
    
    // Verificar permisos de notificación
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Guardar datos cuando cambien
  useEffect(() => {
    if (userData) {
      saveUserData(userData);
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleUpdateSettings = (settings: Partial<UserData>) => {
    setUserData(prev => prev ? { ...prev, ...settings } : null);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        // Actualizar preferencias del usuario
        setUserData(prev => prev ? {
          ...prev,
          preferences: { ...prev.preferences, notifications: true }
        } : null);
      }
    }
  };

  const testNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const message = userData.reminderSettings.message || '¡Es hora de revisar tus objetivos del día!';
      
      new Notification('Sistema de Seguimiento Personal', {
        body: message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'test-notification'
      });
    }
  };

  const getNotificationStatusText = () => {
    switch (notificationPermission) {
      case 'granted':
        return 'Permitidas';
      case 'denied':
        return 'Bloqueadas';
      default:
        return 'No configuradas';
    }
  };

  const getNotificationStatusColor = () => {
    switch (notificationPermission) {
      case 'granted':
        return 'text-green-600 bg-green-100';
      case 'denied':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onSettingsClick={() => setIsSettingsModalOpen(true)} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recordatorios
          </h1>
          <p className="text-gray-600 mb-4">
            Configura tus recordatorios y notificaciones para mantenerte al día
          </p>
        </div>

        {/* Estado de notificaciones */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Estado de Notificaciones</h2>
              <p className="text-sm text-gray-600">
                Permisos del navegador para recibir notificaciones
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getNotificationStatusColor()}`}>
              {getNotificationStatusText()}
            </span>
          </div>

          {notificationPermission === 'default' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Permisos de notificación requeridos
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Para recibir recordatorios, necesitas permitir las notificaciones del navegador.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={requestNotificationPermission}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Permitir Notificaciones
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {notificationPermission === 'denied' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Notificaciones bloqueadas
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Las notificaciones están bloqueadas. Para habilitarlas, ve a la configuración de tu navegador y permite las notificaciones para este sitio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {notificationPermission === 'granted' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Notificaciones habilitadas
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Las notificaciones están habilitadas. Recibirás recordatorios según tu configuración.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={testNotification}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                      Probar Notificación
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Configuración actual */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuración Actual</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Estado de recordatorios */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Estado</h3>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  userData.reminderSettings.enabled ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <span className="text-sm text-gray-900">
                  {userData.reminderSettings.enabled ? 'Habilitados' : 'Deshabilitados'}
                </span>
              </div>
            </div>

            {/* Hora */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Hora</h3>
              <span className="text-sm text-gray-900">{userData.reminderSettings.time}</span>
            </div>

            {/* Días */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Días</h3>
              <div className="flex flex-wrap gap-1">
                {DAYS_OF_WEEK.map((day) => (
                  <span
                    key={day.value}
                    className={`px-2 py-1 text-xs rounded ${
                      userData.reminderSettings.days.includes(day.value)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {day.short}
                  </span>
                ))}
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Mensaje</h3>
              <p className="text-sm text-gray-900">
                {userData.reminderSettings.message || '¡Es hora de revisar tus objetivos del día!'}
              </p>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">¿Cómo funcionan los recordatorios?</h2>
          <div className="space-y-3 text-sm text-blue-800">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-800 text-xs font-bold">1</span>
              </div>
              <p>Los recordatorios se envían según la hora y días que hayas configurado.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-800 text-xs font-bold">2</span>
              </div>
              <p>Necesitas tener el navegador abierto para recibir las notificaciones.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-800 text-xs font-bold">3</span>
              </div>
              <p>Puedes personalizar el mensaje que aparecerá en las notificaciones.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-800 text-xs font-bold">4</span>
              </div>
              <p>Los recordatorios te ayudarán a mantener la consistencia en tus objetivos.</p>
            </div>
          </div>
        </div>

        {/* Botón para editar configuración */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Editar Configuración
          </button>
        </div>
      </main>

      {/* Modales */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        userData={userData}
        onSave={handleUpdateSettings}
      />
    </div>
  );
}
