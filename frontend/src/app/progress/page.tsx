'use client';

import { useState, useEffect } from 'react';
import { UserData, Tracking } from '@/types';
import { loadUserData, saveUserData } from '@/utils/storage';
import { calculateProgressStats, calculateOverallStats } from '@/utils/calculations';
import { TRACKING_CATEGORIES, CHART_COLORS } from '@/utils/constants';
import Navigation from '@/components/Navigation';
import StatsCard from '@/components/StatsCard';
import ProgressBar from '@/components/ProgressBar';
import SettingsModal from '@/components/SettingsModal';

export default function ProgressPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  // Cargar datos al inicializar
  useEffect(() => {
    const data = loadUserData();
    setUserData(data);
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

  const overallStats = calculateOverallStats(userData.trackings);
  const activeTrackings = userData.trackings.filter(t => t.isActive);

  // Calcular estadísticas por categoría
  const categoryStats = TRACKING_CATEGORIES.map(category => {
    const categoryTrackings = activeTrackings.filter(t => t.type === category.id);
    const stats = categoryTrackings.map(t => calculateProgressStats(t));
    
    const totalItems = stats.reduce((sum, s) => sum + s.totalItems, 0);
    const completedItems = stats.reduce((sum, s) => sum + s.completedItems, 0);
    const completionRate = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    const totalStreak = stats.reduce((sum, s) => sum + s.currentStreak, 0);
    const bestStreak = Math.max(...stats.map(s => s.bestStreak), 0);

    return {
      category,
      trackings: categoryTrackings.length,
      totalItems,
      completedItems,
      completionRate,
      totalStreak,
      bestStreak
    };
  }).filter(stat => stat.trackings > 0);

  const handleUpdateSettings = (settings: Partial<UserData>) => {
    setUserData(prev => prev ? { ...prev, ...settings } : null);
  };

  // Componente de gráfico simple de barras
  const SimpleBarChart = ({ data, title }: { data: Array<{ label: string; value: number; color: string }>, title: string }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-20 text-sm text-gray-600 truncate">{item.label}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${Math.min(item.value, 100)}%` }}
              />
            </div>
            <div className="w-12 text-sm font-medium text-gray-900 text-right">
              {Math.round(item.value)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onSettingsClick={() => setIsSettingsModalOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Progreso
          </h1>
          <p className="text-gray-600 mb-4">
            Analiza tu progreso y estadísticas detalladas
          </p>
        </div>

        {/* Estadísticas generales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Progreso General"
            value={`${Math.round(overallStats.overallCompletionRate)}%`}
            subtitle="Tasa de cumplimiento"
            icon="📈"
            color="bg-blue-500"
          />
          <StatsCard
            title="Seguimientos Activos"
            value={overallStats.totalTrackings}
            subtitle="En progreso"
            icon="📊"
            color="bg-green-500"
          />
          <StatsCard
            title="Items Completados"
            value={overallStats.totalCompleted}
            subtitle="De un total de {overallStats.totalItems}"
            icon="✅"
            color="bg-purple-500"
          />
          <StatsCard
            title="Promedio de Racha"
            value={activeTrackings.length > 0 
              ? Math.round(activeTrackings.reduce((sum, t) => {
                  const stats = calculateProgressStats(t);
                  return sum + stats.currentStreak;
                }, 0) / activeTrackings.length)
              : 0
            }
            subtitle="Días consecutivos"
            icon="🔥"
            color="bg-red-500"
          />
        </div>

        {/* Selector de período */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Período:</span>
            <div className="flex space-x-2">
              {[
                { value: 'week', label: 'Semana' },
                { value: 'month', label: 'Mes' },
                { value: 'year', label: 'Año' }
              ].map((period) => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value as 'week' | 'month' | 'year')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    selectedPeriod === period.value
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gráficos y estadísticas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Progreso por categoría */}
          <SimpleBarChart
            title="Progreso por Categoría"
            data={categoryStats.map((stat, index) => ({
              label: stat.category.name,
              value: stat.completionRate,
              color: CHART_COLORS[index % CHART_COLORS.length]
            }))}
          />

          {/* Mejores rachas */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mejores Rachas</h3>
            <div className="space-y-4">
              {categoryStats
                .sort((a, b) => b.bestStreak - a.bestStreak)
                .slice(0, 5)
                .map((stat, index) => (
                  <div key={stat.category.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{stat.category.icon}</span>
                      <span className="text-sm font-medium text-gray-900">{stat.category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{stat.bestStreak}</div>
                      <div className="text-xs text-gray-600">días</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Detalle por seguimiento */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Detalle por Seguimiento
          </h2>
          
          {activeTrackings.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-600">No tienes seguimientos activos para mostrar estadísticas</p>
            </div>
          ) : (
            <div className="space-y-6">
              {activeTrackings.map((tracking) => {
                const stats = calculateProgressStats(tracking);
                const category = TRACKING_CATEGORIES.find(cat => cat.id === tracking.type);
                
                return (
                  <div key={tracking.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category?.color || 'bg-gray-500'}`}>
                          <span className="text-white text-sm">{category?.icon || '📊'}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{tracking.title}</h3>
                          <p className="text-sm text-gray-600">{category?.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{Math.round(stats.completionRate)}%</div>
                        <div className="text-sm text-gray-600">completado</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{stats.totalItems}</div>
                        <div className="text-sm text-gray-600">Total Items</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{stats.completedItems}</div>
                        <div className="text-sm text-gray-600">Completados</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{stats.currentStreak}</div>
                        <div className="text-sm text-gray-600">Racha Actual</div>
                      </div>
                    </div>
                    
                    <ProgressBar
                      progress={stats.completionRate}
                      color="blue"
                      size="md"
                    />
                  </div>
                );
              })}
            </div>
          )}
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
