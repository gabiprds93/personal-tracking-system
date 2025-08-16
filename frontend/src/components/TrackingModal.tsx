'use client';

import { useState, useEffect } from 'react';
import { Tracking, TrackingType } from '@/types';
import { TRACKING_CATEGORIES, FREQUENCIES } from '@/utils/constants';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tracking: Omit<Tracking, 'id' | 'createdAt'>) => void;
  tracking?: Tracking; // Si se proporciona, es modo edición
}

export default function TrackingModal({ 
  isOpen, 
  onClose, 
  onSave, 
  tracking 
}: TrackingModalProps) {
  const [formData, setFormData] = useState({
    type: 'habitos' as TrackingType,
    title: '',
    description: '',
    goal: '',
    targetValue: '',
    isActive: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Inicializar formulario cuando se abre en modo edición
  useEffect(() => {
    if (tracking) {
      setFormData({
        type: tracking.type,
        title: tracking.title,
        description: tracking.description || '',
        goal: tracking.goal || '',
        targetValue: tracking.targetValue?.toString() || '',
        isActive: tracking.isActive
      });
    } else {
      setFormData({
        type: 'habitos',
        title: '',
        description: '',
        goal: '',
        targetValue: '',
        isActive: true
      });
    }
    setErrors({});
  }, [tracking, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (formData.title.length > 100) {
      newErrors.title = 'El título no puede tener más de 100 caracteres';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'La descripción no puede tener más de 500 caracteres';
    }

    if (formData.targetValue && isNaN(Number(formData.targetValue))) {
      newErrors.targetValue = 'El valor objetivo debe ser un número';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const trackingData = {
      type: formData.type,
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      goal: formData.goal.trim() || undefined,
      targetValue: formData.targetValue ? Number(formData.targetValue) : undefined,
      isActive: formData.isActive,
      items: tracking?.items || [],
      currentValue: tracking?.currentValue || 0
    };

    onSave(trackingData);
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {tracking ? 'Editar Seguimiento' : 'Nuevo Seguimiento'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de seguimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Seguimiento
            </label>
            <div className="grid grid-cols-2 gap-3">
              {TRACKING_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleInputChange('type', category.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.type === category.id
                      ? `${category.color} border-current text-white`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Ejercicio diario"
              maxLength={100}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe tu seguimiento..."
              rows={3}
              maxLength={500}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length}/500 caracteres
            </p>
          </div>

          {/* Meta */}
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
              Meta (opcional)
            </label>
            <input
              type="text"
              id="goal"
              value={formData.goal}
              onChange={(e) => handleInputChange('goal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Hacer ejercicio 5 días a la semana"
            />
          </div>

          {/* Valor objetivo */}
          <div>
            <label htmlFor="targetValue" className="block text-sm font-medium text-gray-700 mb-2">
              Valor Objetivo (opcional)
            </label>
            <input
              type="number"
              id="targetValue"
              value={formData.targetValue}
              onChange={(e) => handleInputChange('targetValue', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.targetValue ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: 30 (minutos, días, etc.)"
              min="0"
            />
            {errors.targetValue && (
              <p className="mt-1 text-sm text-red-600">{errors.targetValue}</p>
            )}
          </div>

          {/* Estado activo */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => handleInputChange('isActive', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Seguimiento activo
            </label>
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-4">
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
              {tracking ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
