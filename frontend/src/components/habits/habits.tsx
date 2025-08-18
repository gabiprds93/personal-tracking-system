"use client"

import React from 'react';
import { useHabits } from './hooks/use-habits';
import HabitsHeader from './components/habits-header';
import HabitsFilters from './components/habits-filters';
import HabitsGrid from './components/habits-grid';
import HabitForm from './components/habit-form';

/**
 * Habits component - Main habits management dashboard
 * Displays habits with tracking, completion, and management features
 */
const Habits: React.FC = () => {
  const { state, actions } = useHabits();

  return (
    <div className="min-h-screen bg-background">
      <HabitsHeader onAddHabit={actions.openDialog} />

      <main className="container mx-auto px-4 py-6">
        <HabitsFilters
          searchTerm={state.searchTerm}
          selectedCategory={state.selectedCategory}
          onSearchChange={actions.setSearchTerm}
          onCategoryChange={actions.setSelectedCategory}
        />

        <HabitsGrid
          habits={state.filteredHabits}
          onEditHabit={actions.editHabit}
          onDeleteHabit={actions.deleteHabit}
          onToggleCompletion={actions.toggleCompletion}
          onAddHabit={actions.openDialog}
        />

        <HabitForm
          isOpen={state.isDialogOpen}
          habit={state.editingHabit}
          formData={state.formData}
          formErrors={state.formErrors}
          onClose={actions.closeDialog}
          onSubmit={actions.submitForm}
          onFormChange={actions.updateFormData}
        />
      </main>
    </div>
  );
};

Habits.displayName = 'Habits';

export default Habits;