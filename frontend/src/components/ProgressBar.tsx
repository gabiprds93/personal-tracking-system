interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo';
  animated?: boolean;
}

export default function ProgressBar({ 
  progress, 
  label, 
  showPercentage = true, 
  size = 'md',
  color = 'blue',
  animated = true 
}: ProgressBarProps) {
  // Asegurar que el progreso esté entre 0 y 100
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  // Configuración de colores
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500'
  };
  
  // Configuración de tamaños
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-600">
              {Math.round(clampedProgress)}%
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div 
          className={`${colorClasses[color]} rounded-full transition-all duration-500 ${
            animated ? 'ease-out' : ''
          }`}
          style={{ 
            width: `${clampedProgress}%`,
            transition: animated ? 'width 0.5s ease-out' : 'none'
          }}
        />
      </div>
    </div>
  );
}
