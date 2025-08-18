'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, CheckCircle2 } from "lucide-react";
import { cn } from '@/lib/utils';
import { WeeklyChallengeProps } from '../profile.types';

/**
 * WeeklyChallenge displays the current weekly challenge with tasks and progress
 * 
 * @param challenge - Weekly challenge data
 * @param className - Additional CSS classes
 */
const WeeklyChallenge: React.FC<WeeklyChallengeProps> = ({
  challenge,
  className,
  ...props
}) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Desafío Semanal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{challenge.title}</h3>
              <p className="text-muted-foreground">{challenge.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{challenge.progress}%</div>
              <p className="text-xs text-muted-foreground">Completado</p>
            </div>
          </div>

          <Progress value={challenge.progress} className="h-3" />

          <div className="space-y-3">
            {challenge.tasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className={cn(
                      "w-5 h-5",
                      task.completed >= task.target 
                        ? "text-green-500 fill-current" 
                        : "text-gray-400"
                    )}
                  />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {task.completed}/{task.target} completado
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">+{task.points} pts</Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{challenge.reward.icon}</div>
              <div>
                <h4 className="font-medium">Recompensa del Desafío</h4>
                <p className="text-sm text-muted-foreground">
                  +{challenge.reward.points} puntos + Insignia "{challenge.reward.badge}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

WeeklyChallenge.displayName = 'WeeklyChallenge';

export default WeeklyChallenge;