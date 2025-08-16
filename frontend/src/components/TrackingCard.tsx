'use client';

import { Tracking } from '@/types';
import { calculateProgressStats } from '@/utils/calculations';
import { TRACKING_CATEGORIES } from '@/utils/constants';
import ProgressBar from './ProgressBar';

interface TrackingCardProps {
  tracking: Tracking;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggle?: () => void;
  onClick?: () => void;
}

export default function TrackingCard({ 
  tracking, 
  onEdit, 
  onDelete, 
  onToggle, 
  onClick 
}: TrackingCardProps) {
  const stats = calculateProgressStats(tracking);
  const category = TRACKING_CATEGORIES.find(cat => cat.id === tracking.type);
  
  const getStatusColor = () => {
    if (stats.completionRate >= 80) return 'text-green-600';
    if (stats.completionRate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusText = () => {
    if (stats.completionRate >= 80) return 'Excelente';
    if (stats.completionRate >= 60) return 'Bueno';
    return 'Necesita mejorar';
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer ${
        onClick ? 'hover:scale-105' : ''
      } ${!tracking.isActive ? 'opacity-60' : ''}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category?.color || 'bg-gray-500'}`}>
            <span className="text-white text-lg">{category?.icon || '📊'}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{tracking.title}</h3>
            <p className="text-sm text-gray-600">{category?.name}</p>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex items-center space-x-2">
          {onToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className={`p-2 rounded-md transition-colors ${
                tracking.isActive 
                  ? 'text-green-600 hover:bg-green-50' 
                  : 'text-gray-400 hover:bg-gray-50'
              }`}
              title={tracking.isActive ? 'Desactivar' : 'Activar'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
          
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Editar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Eliminar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Descripción */}
      {tracking.description && (
        <p className="text-sm text-gray-600 mb-4">{tracking.description}</p>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
          <p className="text-xs text-gray-600">Total Items</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{stats.completedItems}</p>
          <p className="text-xs text-gray-600">Completados</p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <ProgressBar 
          progress={stats.completionRate} 
          color="blue"
          size="md"
        />
      </div>

      {/* Estado y racha */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">Racha:</span>
            <span className="font-semibold text-blue-600">{stats.currentStreak} días</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">Mejor:</span>
            <span className="font-semibold text-purple-600">{stats.bestStreak} días</span>
          </div>
        </div>
      </div>

      {/* Fecha de creación */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Creado el {tracking.createdAt.toLocaleDateString('es-ES')}
        </p>
      </div>
    </div>
  );
}
