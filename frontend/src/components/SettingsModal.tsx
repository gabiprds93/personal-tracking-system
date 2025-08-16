'use client';

import { useState, useEffect } from 'react';
import { UserData } from '@/types';
import { REMINDER_TIMES, DAYS_OF_WEEK } from '@/utils/constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  onSave: (settings: Partial<UserData>) => void;
}

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  userData, 
  onSave 
}: SettingsModalProps) {
  const [formData, setFormData] = useState({
    reminderSettings: {
      enabled: true,
      time: '09:00',
      days: [1, 2, 3, 4, 5, 6, 0],
      message: ''
    },
    preferences: {
      theme: 'light' as 'light' | 'dark',
      language: 'es' as 'es' | 'en',
      notifications: true
    }
  });

  const [activeTab, setActiveTab] = useState<'reminders' | 'preferences'>('reminders');

  // Inicializar formulario
  useEffect(() => {
    if (userData) {
      setFormData({
        reminderSettings: { ...userData.reminderSettings },
        preferences: { ...userData.preferences }
      });
    }
  }, [userData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      reminderSettings: formData.reminderSettings,
      preferences: formData.preferences
    });
    onClose();
  };

  const handleReminderDayToggle = (day: number) => {
    const currentDays = formData.reminderSettings.days;
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day].sort();
    
    setFormData(prev => ({
      ...prev,
      reminderSettings: {
        ...prev.reminderSettings,
        days: newDays
      }
    }));
  };

  const handleInputChange = (section: 'reminderSettings' | 'preferences', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Configuración</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('reminders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reminders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recordatorios
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'preferences'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Preferencias
            </button>
          </nav>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6">
          {activeTab === 'reminders' && (
            <div className="space-y-6">
              {/* Habilitar recordatorios */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Recordatorios</h3>
                  <p className="text-sm text-gray-600">
                    Recibe notificaciones para mantenerte al día con tus objetivos
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.reminderSettings.enabled}
                    onChange={(e) => handleInputChange('reminderSettings', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {formData.reminderSettings.enabled && (
                <>
                  {/* Hora del recordatorio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hora del recordatorio
                    </label>
                    <select
                      value={formData.reminderSettings.time}
                      onChange={(e) => handleInputChange('reminderSettings', 'time', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {REMINDER_TIMES.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Días de la semana */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Días de la semana
                    </label>
                    <div className="grid grid-cols-7 gap-2">
                      {DAYS_OF_WEEK.map((day) => (
                        <button
                          key={day.value}
                          type="button"
                          onClick={() => handleReminderDayToggle(day.value)}
                          className={`p-2 text-sm font-medium rounded-md transition-colors ${
                            formData.reminderSettings.days.includes(day.value)
                              ? 'bg-blue-100 text-blue-700 border border-blue-300'
                              : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                          }`}
                        >
                          {day.short}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mensaje personalizado */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje personalizado
                    </label>
                    <input
                      type="text"
                      value={formData.reminderSettings.message}
                      onChange={(e) => handleInputChange('reminderSettings', 'message', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="¡Es hora de revisar tus objetivos del día!"
                      maxLength={100}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Mensaje que aparecerá en las notificaciones
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              {/* Tema */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tema
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('preferences', 'theme', 'light')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.preferences.theme === 'light'
                        ? 'bg-blue-500 border-current text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>☀️</span>
                      <span className="font-medium">Claro</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('preferences', 'theme', 'dark')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.preferences.theme === 'dark'
                        ? 'bg-blue-500 border-current text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>🌙</span>
                      <span className="font-medium">Oscuro</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Idioma */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idioma
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('preferences', 'language', 'es')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.preferences.language === 'es'
                        ? 'bg-blue-500 border-current text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>🇪🇸</span>
                      <span className="font-medium">Español</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('preferences', 'language', 'en')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.preferences.language === 'en'
                        ? 'bg-blue-500 border-current text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>🇺🇸</span>
                      <span className="font-medium">English</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Notificaciones */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Notificaciones del navegador</h3>
                  <p className="text-sm text-gray-600">
                    Permite que la aplicación envíe notificaciones
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferences.notifications}
                    onChange={(e) => handleInputChange('preferences', 'notifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
