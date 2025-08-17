import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6", 
  lg: "w-8 h-8"
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <Loader2 
      className={cn(
        "animate-spin text-muted-foreground",
        sizeClasses[size],
        className
      )} 
    />
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    </div>
  )
}

export function LoadingCard({ 
  title = "Cargando...",
  className 
}: { 
  title?: string
  className?: string 
}) {
  return (
    <div className={cn("border rounded-lg p-6", className)}>
      <div className="flex items-center justify-center space-x-3">
        <LoadingSpinner />
        <span className="text-muted-foreground">{title}</span>
      </div>
    </div>
  )
}