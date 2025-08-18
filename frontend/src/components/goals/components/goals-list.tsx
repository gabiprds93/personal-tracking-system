import React from 'react';
import { cn } from '@/lib/utils';
import { GoalsListProps } from '../goals.types';
import GoalCard from './goal-card';
import EmptyState from './empty-state';

/**
 * GoalsList displays a list of goals with filtering and selection
 * 
 * @param goals - Array of goals to display
 * @param selectedGoal - Currently selected goal
 * @param onSelectGoal - Callback fired when a goal is selected
 * @param onEditGoal - Callback fired when a goal edit is requested
 * @param onDeleteGoal - Callback fired when a goal deletion is requested
 * @param onAddGoal - Callback fired when add goal is clicked
 * @param className - Additional CSS classes
 */
const GoalsList: React.FC<GoalsListProps> = ({ 
  goals,
  selectedGoal,
  onSelectGoal,
  onEditGoal,
  onDeleteGoal,
  onAddGoal,
  className,
  ...props 
}) => {
  // This will be passed properly from the parent component with real data
  const getDaysRemaining = (targetDate: string): number => {
    const today = new Date();
    const target = new Date(targetDate);
    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getGoalStatus = (goal: any) => {
    // This will be replaced with proper status logic from the hook
    return { id: goal.status, name: goal.status, color: "" };
  };

  const getCategoryInfo = (categoryId: string) => {
    // This will be replaced with proper category logic from the hook
    return { id: categoryId, name: categoryId, icon: null, color: "" };
  };

  if (goals.length === 0) {
    return (
      <EmptyState 
        searchTerm=""
        selectedCategory="all"
        selectedStatus="all"
        onAddGoal={onAddGoal}
        className={className}
        {...props}
      />
    );
  }

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          isSelected={selectedGoal?.id === goal.id}
          onSelect={onSelectGoal}
          onEdit={onEditGoal}
          onDelete={onDeleteGoal}
          category={getCategoryInfo(goal.category)}
          status={getGoalStatus(goal)}
          daysRemaining={getDaysRemaining(goal.targetDate)}
        />
      ))}
    </div>
  );
};

GoalsList.displayName = 'GoalsList';

export default GoalsList;