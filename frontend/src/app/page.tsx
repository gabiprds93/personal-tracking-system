'use client';

import { useState, useEffect } from 'react';
import { UserData, Tracking } from '@/types';
import { loadUserData, saveUserData } from '@/utils/storage';
import { calculateOverallStats, getTodayPendingItems, getTodayCompletedItems } from '@/utils/calculations';
import { MOTIVATIONAL_MESSAGES } from '@/utils/constants';
import Navigation from '@/components/Navigation';
import StatsCard from '@/components/StatsCard';
import TrackingCard from '@/components/TrackingCard';
import TrackingModal from '@/components/TrackingModal';
import SettingsModal from '@/components/SettingsModal';
import ProgressBar from '@/components/ProgressBar';

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingTracking, setEditingTracking] = useState<Tracking | null>(null);
  const [motivationalMessage, setMotivationalMessage] = useState('');

  // Cargar datos al inicializar
  useEffect(() => {
    const data = loadUserData();
    setUserData(data);
    
    // Seleccionar mensaje motivacional aleatorio
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
    setMotivationalMessage(MOTIVATIONAL_MESSAGES[randomIndex]);
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
  const todayPendingItems = getTodayPendingItems(userData.trackings);
  const todayCompletedItems = getTodayCompletedItems(userData.trackings);
  const activeTrackings = userData.trackings.filter(t => t.isActive);

  const handleCreateTracking = (trackingData: Omit<Tracking, 'id' | 'createdAt'>) => {
    const newTracking: Tracking = {
      ...trackingData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setUserData(prev => prev ? {
      ...prev,
      trackings: [...prev.trackings, newTracking]
    } : null);
  };

  const handleUpdateTracking = (trackingData: Omit<Tracking, 'id' | 'createdAt'>) => {
    if (!editingTracking) return;
    
    setUserData(prev => prev ? {
      ...prev,
      trackings: prev.trackings.map(t => 
        t.id === editingTracking.id 
          ? { ...t, ...trackingData }
          : t
      )
    } : null);
  };

  const handleDeleteTracking = (trackingId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este seguimiento?')) {
      setUserData(prev => prev ? {
        ...prev,
        trackings: prev.trackings.filter(t => t.id !== trackingId)
      } : null);
    }
  };

  const handleToggleTracking = (trackingId: string) => {
    setUserData(prev => prev ? {
      ...prev,
      trackings: prev.trackings.map(t => 
        t.id === trackingId 
          ? { ...t, isActive: !t.isActive }
          : t
      )
    } : null);
  };

  const handleUpdateSettings = (settings: Partial<UserData>) => {
    setUserData(prev => prev ? { ...prev, ...settings } : null);
  };

  const openEditModal = (tracking: Tracking) => {
    setEditingTracking(tracking);
    setIsTrackingModalOpen(true);
  };

  const closeTrackingModal = () => {
    setIsTrackingModalOpen(false);
    setEditingTracking(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onSettingsClick={() => setIsSettingsModalOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 mb-4">
            {motivationalMessage}
          </p>
          
          {/* Botón para crear nuevo seguimiento */}
          <button
            onClick={() => setIsTrackingModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Seguimiento
          </button>
        </div>

        {/* Estadísticas generales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Seguimientos Activos"
            value={overallStats.totalTrackings}
            subtitle="En progreso"
            icon="📊"
            color="bg-blue-500"
          />
          <StatsCard
            title="Items Totales"
            value={overallStats.totalItems}
            subtitle="En todos los seguimientos"
            icon="📝"
            color="bg-green-500"
          />
          <StatsCard
            title="Completados Hoy"
            value={todayCompletedItems.length}
            subtitle="De items pendientes"
            icon="✅"
            color="bg-purple-500"
          />
          <StatsCard
            title="Progreso General"
            value={`${Math.round(overallStats.overallCompletionRate)}%`}
            subtitle="Tasa de cumplimiento"
            icon="📈"
            color="bg-yellow-500"
          />
        </div>

        {/* Progreso de hoy */}
        {todayPendingItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Progreso de Hoy
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Items completados: {todayCompletedItems.length} / {todayPendingItems.length + todayCompletedItems.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round((todayCompletedItems.length / (todayPendingItems.length + todayCompletedItems.length)) * 100)}%
                </span>
              </div>
              <ProgressBar
                progress={(todayCompletedItems.length / (todayPendingItems.length + todayCompletedItems.length)) * 100}
                color="green"
                size="lg"
              />
            </div>
          </div>
        )}

        {/* Seguimientos activos */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Seguimientos Activos
          </h2>
          
          {activeTrackings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tienes seguimientos activos
              </h3>
              <p className="text-gray-600 mb-4">
                Crea tu primer seguimiento para comenzar a mejorar tu vida
              </p>
              <button
                onClick={() => setIsTrackingModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Crear Primer Seguimiento
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTrackings.map((tracking) => (
                <TrackingCard
                  key={tracking.id}
                  tracking={tracking}
                  onEdit={() => openEditModal(tracking)}
                  onDelete={() => handleDeleteTracking(tracking.id)}
                  onToggle={() => handleToggleTracking(tracking.id)}
                  onClick={() => {
                    // Aquí se podría navegar a la página de detalle del seguimiento
                    console.log('Navegar a seguimiento:', tracking.id);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Seguimientos inactivos */}
        {userData.trackings.filter(t => !t.isActive).length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Seguimientos Inactivos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.trackings
                .filter(t => !t.isActive)
                .map((tracking) => (
                  <TrackingCard
                    key={tracking.id}
                    tracking={tracking}
                    onEdit={() => openEditModal(tracking)}
                    onDelete={() => handleDeleteTracking(tracking.id)}
                    onToggle={() => handleToggleTracking(tracking.id)}
                  />
                ))}
            </div>
          </div>
        )}
      </main>

      {/* Modales */}
      <TrackingModal
        isOpen={isTrackingModalOpen}
        onClose={closeTrackingModal}
        onSave={editingTracking ? handleUpdateTracking : handleCreateTracking}
        tracking={editingTracking || undefined}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        userData={userData}
        onSave={handleUpdateSettings}
      />
    </div>
  );
}
