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
          category={{ id: goal.category, name: goal.category, icon: null, color: "" }}
          status={{ id: goal.status, name: goal.status, color: "" }}
          daysRemaining={0}
        />
      ))}
    </div>
  );
};

GoalsList.displayName = 'GoalsList';

export default GoalsList;