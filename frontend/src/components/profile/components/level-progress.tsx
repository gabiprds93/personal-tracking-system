'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Crown } from "lucide-react";
import { cn } from '@/lib/utils';
import { LevelProgressProps } from '../profile.types';

/**
 * LevelProgress displays user's current level and progress to next level
 * 
 * @param currentLevel - Current user level information
 * @param nextLevel - Next level information (null if max level)
 * @param userStats - User statistics
 * @param progressToNext - Progress percentage to next level
 * @param className - Additional CSS classes
 */
const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  nextLevel,
  userStats,
  progressToNext,
  className,
  ...props
}) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          Progreso de Nivel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  currentLevel.bgColor
                )}
              >
                <Crown className={cn("w-6 h-6", currentLevel.color)} />
              </div>
              <div>
                <h3 className="font-semibold">{currentLevel.name}</h3>
                <p className="text-sm text-muted-foreground">Nivel {currentLevel.level}</p>
              </div>
            </div>
            {nextLevel && (
              <div className="text-right">
                <p className="text-sm font-medium">
                  {nextLevel.minPoints - userStats.totalPoints} puntos para {nextLevel.name}
                </p>
                <p className="text-xs text-muted-foreground">Nivel {nextLevel.level}</p>
              </div>
            )}
          </div>
          {nextLevel && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{currentLevel.minPoints} pts</span>
                <span>{Math.round(progressToNext)}%</span>
                <span>{nextLevel.minPoints} pts</span>
              </div>
              <Progress value={progressToNext} className="h-3" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

LevelProgress.displayName = 'LevelProgress';

export default LevelProgress;