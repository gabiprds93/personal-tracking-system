import { useState, useEffect, useCallback } from 'react';
import { Target, Flame, Activity, Award } from 'lucide-react';
import { analyticsApi } from '@/lib/api';
import { 
  UseAnalyticsReturn, 
  AnalyticsState, 
  AnalyticsActions, 
  TimeRange, 
  MetricType, 
  TabValue,
  HabitTrendData,
  CategoryData,
  WeeklyComparisonData,
  TimeOfDayData,
  StreakData,
  HeatmapData,
  KeyMetric,
  DayAnalysis,
  InsightCard,
  PredictionData,
  MilestoneData
} from '../analytics.types';

/**
 * Custom hook for managing analytics state and actions
 * 
 * @returns Object containing state and actions for analytics management
 */
export const useAnalytics = (): UseAnalyticsReturn => {
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('completion');
  const [activeTab, setActiveTab] = useState<TabValue>('overview');
  
  // Real data from API
  const [habitTrendData, setHabitTrendData] = useState<HabitTrendData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [keyMetrics, setKeyMetrics] = useState<KeyMetric[]>([]);

  // Load analytics data from API
  const loadAnalyticsData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch data in parallel
      const [trendsResponse, categoriesResponse, metricsResponse] = await Promise.all([
        analyticsApi.getTrends(timeRange),
        analyticsApi.getCategories(),
        analyticsApi.getMetrics()
      ]);

      if (trendsResponse.success && trendsResponse.data) {
        setHabitTrendData(trendsResponse.data);
      }

      if (categoriesResponse.success && categoriesResponse.data) {
        setCategoryData(categoriesResponse.data);
      }

      if (metricsResponse.success && metricsResponse.data) {
        // Transform backend metrics to frontend format
        const transformedMetrics = metricsResponse.data.map((metric: any) => ({
          ...metric,
          icon: getIconComponent(metric.icon),
          iconColor: metric.iconColor || 'text-primary'
        }));
        setKeyMetrics(transformedMetrics);
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  // Helper function to map icon strings to components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'check-circle':
      case 'target':
        return Target;
      case 'flame':
        return Flame;
      case 'trending-up':
      case 'activity':
        return Activity;
      case 'star':
      case 'award':
        return Award;
      default:
        return Target;
    }
  };

  // Load data on component mount and when timeRange changes
  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData, timeRange]);

  // Mock data for features not yet implemented in backend
  const mockHabitTrendData: HabitTrendData[] = [
    { date: "2024-03-01", completed: 4, total: 6, rate: 67 },
    { date: "2024-03-02", completed: 5, total: 6, rate: 83 },
    { date: "2024-03-03", completed: 6, total: 6, rate: 100 },
    { date: "2024-03-04", completed: 3, total: 6, rate: 50 },
    { date: "2024-03-05", completed: 5, total: 6, rate: 83 },
    { date: "2024-03-06", completed: 4, total: 6, rate: 67 },
    { date: "2024-03-07", completed: 6, total: 6, rate: 100 },
    { date: "2024-03-08", completed: 5, total: 6, rate: 83 },
    { date: "2024-03-09", completed: 4, total: 6, rate: 67 },
    { date: "2024-03-10", completed: 6, total: 6, rate: 100 },
    { date: "2024-03-11", completed: 5, total: 6, rate: 83 },
    { date: "2024-03-12", completed: 4, total: 6, rate: 67 },
    { date: "2024-03-13", completed: 5, total: 6, rate: 83 },
    { date: "2024-03-14", completed: 6, total: 6, rate: 100 },
    { date: "2024-03-15", completed: 4, total: 6, rate: 67 },
    { date: "2024-03-16", completed: 5, total: 6, rate: 83 },
    { date: "2024-03-17", completed: 6, total: 6, rate: 100 },
    { date: "2024-03-18", completed: 4, total: 6, rate: 67 },
  ];

  const mockCategoryData: CategoryData[] = [
    { name: "Salud", value: 35, color: "#ef4444" },
    { name: "Aprendizaje", value: 25, color: "#3b82f6" },
    { name: "Bienestar", value: 20, color: "#8b5cf6" },
    { name: "Productividad", value: 15, color: "#10b981" },
    { name: "Ejercicio", value: 5, color: "#f59e0b" },
  ];

  const weeklyComparisonData: WeeklyComparisonData[] = [
    { week: "Sem 1", thisMonth: 85, lastMonth: 78 },
    { week: "Sem 2", thisMonth: 92, lastMonth: 85 },
    { week: "Sem 3", thisMonth: 88, lastMonth: 82 },
    { week: "Sem 4", thisMonth: 95, lastMonth: 88 },
  ];

  const timeOfDayData: TimeOfDayData[] = [
    { hour: "6:00", habits: 2 },
    { hour: "7:00", habits: 4 },
    { hour: "8:00", habits: 3 },
    { hour: "9:00", habits: 1 },
    { hour: "12:00", habits: 2 },
    { hour: "18:00", habits: 3 },
    { hour: "19:00", habits: 2 },
    { hour: "21:00", habits: 4 },
    { hour: "22:00", habits: 1 },
  ];

  const streakData: StreakData[] = [
    { date: "2024-01-01", streak: 0 },
    { date: "2024-01-15", streak: 5 },
    { date: "2024-02-01", streak: 12 },
    { date: "2024-02-15", streak: 8 },
    { date: "2024-03-01", streak: 15 },
    { date: "2024-03-15", streak: 23 },
    { date: "2024-03-18", streak: 7 },
  ];

  // Generate heatmap data (GitHub-style)
  const generateHeatmapData = (): HeatmapData[] => {
    const data: HeatmapData[] = [];
    const startDate = new Date("2024-01-01");
    const endDate = new Date("2024-03-18");

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const completionRate = Math.floor(Math.random() * 5); // 0-4 intensity levels
      data.push({
        date: d.toISOString().split("T")[0],
        count: completionRate,
        day: d.getDay(),
        week: Math.floor((d.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)),
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  const mockKeyMetrics: KeyMetric[] = [
    {
      id: 'success-rate',
      title: 'Tasa de Éxito',
      value: '87%',
      change: '+5% vs mes anterior',
      changeType: 'positive',
      icon: Target,
      iconColor: 'text-primary'
    },
    {
      id: 'average-streak',
      title: 'Racha Promedio',
      value: '12.3',
      change: '+2.1 días',
      changeType: 'positive',
      icon: Flame,
      iconColor: 'text-orange-500'
    },
    {
      id: 'active-habits',
      title: 'Hábitos Activos',
      value: 6,
      change: 'sin cambios',
      changeType: 'neutral',
      icon: Activity,
      iconColor: 'text-blue-500'
    },
    {
      id: 'best-day',
      title: 'Mejor Día',
      value: 'Lun',
      change: '92% éxito',
      changeType: 'neutral',
      icon: Award,
      iconColor: 'text-yellow-500'
    }
  ];

  const dayAnalysis: DayAnalysis[] = [
    { day: "Lunes", rate: 92, color: "bg-green-500" },
    { day: "Martes", rate: 88, color: "bg-green-400" },
    { day: "Miércoles", rate: 85, color: "bg-yellow-400" },
    { day: "Jueves", rate: 90, color: "bg-green-400" },
    { day: "Viernes", rate: 82, color: "bg-yellow-400" },
    { day: "Sábado", rate: 78, color: "bg-orange-400" },
    { day: "Domingo", rate: 75, color: "bg-orange-400" },
  ];

  const insights: InsightCard[] = [
    {
      id: '1',
      type: 'pattern',
      title: 'Patrón Detectado',
      description: 'Tienes un 15% más de éxito completando hábitos los lunes. Considera programar hábitos más desafiantes ese día.',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      icon: '💡'
    },
    {
      id: '2',
      type: 'recommendation',
      title: 'Recomendación',
      description: 'Tu mejor horario es entre 7-8 AM. Intenta mover más hábitos a esta franja horaria para mejorar tu consistencia.',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      icon: '🎯'
    },
    {
      id: '3',
      type: 'improvement',
      title: 'Área de Mejora',
      description: 'Los fines de semana muestran una caída del 12% en completación. Considera ajustar tus expectativas o crear rutinas específicas.',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      icon: '⚠️'
    },
    {
      id: '4',
      type: 'strength',
      title: 'Fortaleza',
      description: 'Excelente consistencia en hábitos de salud (95%). Tu disciplina en esta área puede servir de modelo para otras categorías.',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800',
      icon: '🏆'
    }
  ];

  const predictions: PredictionData = {
    title: 'Proyección Mensual',
    description: 'Basado en tu tendencia actual, es probable que alcances:',
    items: [
      '89% de tasa de completación este mes',
      'Racha máxima de 15-18 días',
      '2,850+ puntos totales'
    ]
  };

  const milestones: MilestoneData[] = [
    { name: 'Nivel 13', remaining: '153 puntos restantes' },
    { name: 'Racha de 30 días', remaining: '23 días restantes' },
    { name: '100 hábitos completados', remaining: '44 restantes' }
  ];

  const state: AnalyticsState = {
    loading,
    timeRange,
    selectedMetric,
    activeTab,
    habitTrendData: habitTrendData.length > 0 ? habitTrendData : mockHabitTrendData,
    categoryData: categoryData.length > 0 ? categoryData : mockCategoryData,
    weeklyComparisonData,
    timeOfDayData,
    streakData,
    heatmapData,
    keyMetrics: keyMetrics.length > 0 ? keyMetrics : mockKeyMetrics,
    dayAnalysis,
    insights,
    predictions,
    milestones
  };

  const actions: AnalyticsActions = {
    // Filter and view actions
    setTimeRange: (newTimeRange: TimeRange) => {
      setTimeRange(newTimeRange);
      // Data will be reloaded via useEffect dependency
    },
    setSelectedMetric,
    setActiveTab,
    
    // Data refresh actions
    refreshData: () => {
      loadAnalyticsData();
    },
    
    // Utility actions
    formatDate: (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
    },
    formatHour: (hour: string) => {
      return hour.replace(":00", "h");
    },
    getHeatmapColor: (count: number) => {
      const colors = [
        "bg-gray-100", // 0
        "bg-green-200", // 1
        "bg-green-300", // 2
        "bg-green-400", // 3
        "bg-green-500", // 4
      ];
      return colors[count] || colors[0];
    },
    
    // Export actions
    exportData: (format: 'csv' | 'json' | 'pdf') => {
      console.log(`Exporting data in ${format} format`);
      // TODO: Implement data export
    }
  };

  return { state, actions };
};