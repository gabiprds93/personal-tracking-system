'use client';

import { useState, useEffect } from 'react';
import { UserData, Tracking, TrackingType } from '@/types';
import { loadUserData, saveUserData } from '@/utils/storage';
import { TRACKING_CATEGORIES } from '@/utils/constants';
import Navigation from '@/components/Navigation';
import TrackingCard from '@/components/TrackingCard';
import TrackingModal from '@/components/TrackingModal';
import SettingsModal from '@/components/SettingsModal';

export default function TrackingsPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingTracking, setEditingTracking] = useState<Tracking | null>(null);
  const [filterType, setFilterType] = useState<TrackingType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filtrar seguimientos
  const filteredTrackings = userData.trackings.filter(tracking => {
    // Filtro por tipo
    if (filterType !== 'all' && tracking.type !== filterType) {
      return false;
    }
    
    // Filtro por estado
    if (filterStatus === 'active' && !tracking.isActive) {
      return false;
    }
    if (filterStatus === 'inactive' && tracking.isActive) {
      return false;
    }
    
    // Filtro por búsqueda
    if (searchTerm && !tracking.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

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
            Seguimientos
          </h1>
          <p className="text-gray-600 mb-4">
            Gestiona todos tus seguimientos y objetivos
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

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar seguimientos..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro por tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as TrackingType | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los tipos</option>
                {TRACKING_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>

            {/* Estadísticas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total
              </label>
              <div className="text-2xl font-bold text-gray-900">
                {filteredTrackings.length}
              </div>
              <div className="text-sm text-gray-600">
                de {userData.trackings.length} seguimientos
              </div>
            </div>
          </div>
        </div>

        {/* Lista de seguimientos */}
        <div>
          {filteredTrackings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron seguimientos
              </h3>
              <p className="text-gray-600 mb-4">
                {userData.trackings.length === 0 
                  ? 'No tienes seguimientos creados. Crea tu primer seguimiento para comenzar.'
                  : 'Intenta ajustar los filtros de búsqueda.'
                }
              </p>
              {userData.trackings.length === 0 && (
                <button
                  onClick={() => setIsTrackingModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Crear Primer Seguimiento
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrackings.map((tracking) => (
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
