"use client"

import React from 'react';
import { useAnalytics } from './hooks/use-analytics';
import {
  AnalyticsHeader,
  KeyMetrics,
  CompletionTrendChart,
  CategoryDistributionChart,
  ConsistencyHeatmap,
  WeeklyComparisonChart,
  StreakEvolutionChart,
  TimePatternChart,
  BestDaysAnalysis,
  PersonalInsights,
  Predictions,
  AnalyticsTabs,
  OverviewTab,
  TrendsTab,
  PatternsTab,
  InsightsTab
} from './components';

/**
 * Analytics component - Main analytics dashboard
 * Displays comprehensive analytics, charts, and insights for habit tracking
 */
const Analytics: React.FC = () => {
  const { state, actions } = useAnalytics();

  if (state.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnalyticsHeader 
        timeRange={state.timeRange}
        onTimeRangeChange={actions.setTimeRange}
      />

      <main className="container mx-auto px-4 py-6">
        <AnalyticsTabs 
          activeTab={state.activeTab}
          onTabChange={actions.setActiveTab}
        >
          {/* Overview Tab */}
          <OverviewTab>
            {/* Key Metrics */}
            <KeyMetrics metrics={state.keyMetrics} />

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CompletionTrendChart data={state.habitTrendData} />
              <CategoryDistributionChart data={state.categoryData} />
            </div>

            {/* Heatmap */}
            <ConsistencyHeatmap 
              data={state.heatmapData}
              getHeatmapColor={actions.getHeatmapColor}
            />
          </OverviewTab>

          {/* Trends Tab */}
          <TrendsTab>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeeklyComparisonChart data={state.weeklyComparisonData} />
              <StreakEvolutionChart data={state.streakData} />
            </div>
          </TrendsTab>

          {/* Patterns Tab */}
          <PatternsTab>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TimePatternChart data={state.timeOfDayData} />
              <BestDaysAnalysis data={state.dayAnalysis} />
            </div>
          </PatternsTab>

          {/* Insights Tab */}
          <InsightsTab>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PersonalInsights insights={state.insights} />
              <Predictions 
                predictions={state.predictions}
                milestones={state.milestones}
              />
            </div>
          </InsightsTab>
        </AnalyticsTabs>
      </main>
    </div>
  );
};

Analytics.displayName = 'Analytics';

export default Analytics;