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
              <div className="space-y-4">
                {state.filteredGoals.map((goal) => {
                  const categoryInfo = actions.getCategoryInfo(goal.category);
                  const status = actions.getGoalStatus(goal);
                  const daysRemaining = actions.getDaysRemaining(goal.targetDate);

                  return (
                    <div
                      key={goal.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md rounded-lg ${
                        state.selectedGoal?.id === goal.id ? "ring-2 ring-primary/20 bg-primary/5" : ""
                      }`}
                      onClick={() => actions.setSelectedGoal(goal)}
                    >
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg border flex items-center justify-center ${categoryInfo?.color}`}
                            >
                              {categoryInfo?.icon && <categoryInfo.icon className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-sans font-semibold">{goal.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{goal.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button
                              className="p-2 hover:bg-gray-100 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                actions.editGoal(goal);
                              }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                actions.deleteGoal(goal.id);
                              }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>
                              {status.name}
                            </span>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              <span>
                                {daysRemaining > 0
                                  ? `${daysRemaining} días restantes`
                                  : daysRemaining === 0
                                    ? "Vence hoy"
                                    : `Venció hace ${Math.abs(daysRemaining)} días`}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progreso</span>
                              <span className="font-medium">{goal.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${goal.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>
                              {goal.milestones.filter((m) => m.completed).length} de {goal.milestones.length} hitos
                            </span>
                            <span>{goal.notes.length} notas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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