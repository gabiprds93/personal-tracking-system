import { ReactNode, HTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

// Core data interfaces
export interface HabitTrendData {
  date: string;
  completed: number;
  total: number;
  rate: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface WeeklyComparisonData {
  week: string;
  thisMonth: number;
  lastMonth: number;
}

export interface TimeOfDayData {
  hour: string;
  habits: number;
}

export interface StreakData {
  date: string;
  streak: number;
}

export interface HeatmapData {
  date: string;
  count: number;
  day: number;
  week: number;
}

export interface DayAnalysis {
  day: string;
  rate: number;
  color: string;
}

export interface KeyMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor: string;
}

export interface InsightCard {
  id: string;
  type: 'pattern' | 'recommendation' | 'improvement' | 'strength';
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  icon: string;
}

export interface PredictionData {
  title: string;
  description: string;
  items: string[];
}

export interface MilestoneData {
  name: string;
  remaining: string;
}

// Chart configuration interfaces
export interface ChartConfig {
  width: string | number;
  height: string | number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

// Time range and filter types
export type TimeRange = '7d' | '30d' | '90d' | '1y';
export type MetricType = 'completion' | 'streak' | 'consistency' | 'performance';
export type TabValue = 'overview' | 'trends' | 'patterns' | 'insights';

// Component props interfaces
export interface AnalyticsHeaderProps extends HTMLAttributes<HTMLElement> {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  className?: string;
}

export interface KeyMetricsProps extends HTMLAttributes<HTMLDivElement> {
  metrics: KeyMetric[];
  className?: string;
}

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  metric: KeyMetric;
  className?: string;
}

export interface CompletionTrendChartProps extends HTMLAttributes<HTMLDivElement> {
  data: HabitTrendData[];
  className?: string;
}

export interface CategoryDistributionChartProps extends HTMLAttributes<HTMLDivElement> {
  data: CategoryData[];
  className?: string;
}

export interface ConsistencyHeatmapProps extends HTMLAttributes<HTMLDivElement> {
  data: HeatmapData[];
  getHeatmapColor: (count: number) => string;
  className?: string;
}

export interface WeeklyComparisonChartProps extends HTMLAttributes<HTMLDivElement> {
  data: WeeklyComparisonData[];
  className?: string;
}

export interface StreakEvolutionChartProps extends HTMLAttributes<HTMLDivElement> {
  data: StreakData[];
  className?: string;
}

export interface TimePatternChartProps extends HTMLAttributes<HTMLDivElement> {
  data: TimeOfDayData[];
  className?: string;
}

export interface BestDaysAnalysisProps extends HTMLAttributes<HTMLDivElement> {
  data: DayAnalysis[];
  className?: string;
}

export interface PersonalInsightsProps extends HTMLAttributes<HTMLDivElement> {
  insights: InsightCard[];
  className?: string;
}

export interface PredictionsProps extends HTMLAttributes<HTMLDivElement> {
  predictions: PredictionData;
  milestones: MilestoneData[];
  className?: string;
}

export interface AnalyticsTabsProps extends HTMLAttributes<HTMLDivElement> {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
  children: ReactNode;
  className?: string;
}

// Hook interfaces
export interface UseAnalyticsReturn {
  state: AnalyticsState;
  actions: AnalyticsActions;
}

export interface AnalyticsState {
  loading: boolean;
  timeRange: TimeRange;
  selectedMetric: MetricType;
  activeTab: TabValue;
  
  // Data
  habitTrendData: HabitTrendData[];
  categoryData: CategoryData[];
  weeklyComparisonData: WeeklyComparisonData[];
  timeOfDayData: TimeOfDayData[];
  streakData: StreakData[];
  heatmapData: HeatmapData[];
  keyMetrics: KeyMetric[];
  dayAnalysis: DayAnalysis[];
  insights: InsightCard[];
  predictions: PredictionData;
  milestones: MilestoneData[];
}

export interface AnalyticsActions {
  // Filter and view actions
  setTimeRange: (range: TimeRange) => void;
  setSelectedMetric: (metric: MetricType) => void;
  setActiveTab: (tab: TabValue) => void;
  
  // Data refresh actions
  refreshData: () => void;
  
  // Utility actions
  formatDate: (dateStr: string) => string;
  formatHour: (hour: string) => string;
  getHeatmapColor: (count: number) => string;
  
  // Export actions
  exportData: (format: 'csv' | 'json' | 'pdf') => void;
}

// Utility types
export type ChartDataPoint = HabitTrendData | CategoryData | WeeklyComparisonData | TimeOfDayData | StreakData;
export type FilterableData<T> = T & { timeRange?: TimeRange };

// Analytics configuration
export interface AnalyticsConfig {
  defaultTimeRange: TimeRange;
  defaultMetric: MetricType;
  defaultTab: TabValue;
  chartColors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
  };
  heatmapIntensityLevels: number;
}