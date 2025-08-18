'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { MotivationalMessageProps } from '../dashboard.types';

/**
 * MotivationalMessage displays rotating inspirational messages
 * 
 * @param messages - Array of motivational messages to display
 * @param currentIndex - Current message index
 * @param className - Additional CSS classes to apply
 */
const MotivationalMessage: React.FC<MotivationalMessageProps> = ({
  messages,
  currentIndex,
  className,
  ...props
}) => {
  return (
    <Card 
      className={cn(
        "bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20",
        className
      )}
      {...props}
    >
      <CardContent className="p-6 text-center">
        <p className="text-lg font-medium font-serif text-primary transition-all duration-500">
          "{messages[currentIndex]}"
        </p>
      </CardContent>
    </Card>
  );
};

MotivationalMessage.displayName = 'MotivationalMessage';

export default MotivationalMessage;