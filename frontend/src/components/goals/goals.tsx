"use client"

import React from 'react';
import { useGoals } from './hooks/use-goals';
import GoalsHeader from './components/goals-header';
import GoalsFilters from './components/goals-filters';
import GoalsList from './components/goals-list';
import GoalDetails from './components/goal-details';
import GoalForm from './components/goal-form';
import EmptyState from './components/empty-state';

/**
 * Goals component - Main goals management dashboard
 * Displays goals with SMART objectives tracking, milestones, and notes
 */
const Goals: React.FC = () => {
  const { state, actions } = useGoals();

  if (state.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando metas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GoalsHeader onAddGoal={actions.openDialog} />

      <main className="container mx-auto px-4 py-6">
        <GoalsFilters
          searchTerm={state.searchTerm}
          selectedCategory={state.selectedCategory}
          selectedStatus={state.selectedStatus}
          onSearchChange={actions.setSearchTerm}
          onCategoryChange={actions.setSelectedCategory}
          onStatusChange={actions.setSelectedStatus}
          categories={state.categories}
          statuses={state.statuses}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Goals List */}
          <div className="lg:col-span-2">
            {state.filteredGoals.length === 0 ? (
              <EmptyState
                searchTerm={state.searchTerm}
                selectedCategory={state.selectedCategory}
                selectedStatus={state.selectedStatus}
                onAddGoal={actions.openDialog}
              />
            ) : (
              <GoalsList
                goals={state.filteredGoals}
                selectedGoal={state.selectedGoal}
                onSelectGoal={actions.setSelectedGoal}
                onEditGoal={actions.editGoal}
                onDeleteGoal={actions.deleteGoal}
                onAddGoal={actions.openDialog}
                getCategoryInfo={actions.getCategoryInfo}
                getGoalStatus={actions.getGoalStatus}
                getDaysRemaining={actions.getDaysRemaining}
              />
            )}
          </div>

          {/* Goal Details */}
          <div>
            <GoalDetails
              goal={state.selectedGoal}
              onToggleMilestone={actions.toggleMilestone}
              onAddNote={actions.addNote}
            />
          </div>
        </div>

        {/* Goal Form Dialog */}
        <GoalForm
          isOpen={state.isDialogOpen}
          goal={state.editingGoal}
          formData={state.formData}
          formErrors={state.formErrors}
          categories={state.categories}
          onClose={actions.closeDialog}
          onSubmit={actions.submitForm}
          onFormChange={actions.updateFormData}
        />
      </main>
    </div>
  );
};

Goals.displayName = 'Goals';

export default Goals;