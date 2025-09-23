import { DealStage, DEAL_STAGES } from '@/types/deal';
import DealStageIcon from './DealStageIcon';

interface ProgressBarProps {
  currentStage: DealStage;
  className?: string;
}

export default function ProgressBar({ currentStage, className = '' }: ProgressBarProps) {
  const currentIndex = DEAL_STAGES.indexOf(currentStage);
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {DEAL_STAGES.map((stage, index) => {
        const isPast = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isFuture = index > currentIndex;
        
        return (
          <div key={stage} className="flex items-center">
            <div className="flex flex-col items-center">
              <div 
                className={`
                  relative h-6 w-6 rounded-full border-2 transition-all duration-200
                  ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}
                  ${isPast ? 'bg-muted border-muted' : ''}
                  ${isFuture ? 'bg-background border-border' : ''}
                `}
              >
                {isCurrent && (
                  <DealStageIcon 
                    stage={stage} 
                    className="absolute inset-0 h-6 w-6" 
                  />
                )}
                {isPast && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                  </div>
                )}
              </div>
              <span className={`
                mt-1 text-xs font-medium text-center max-w-16
                ${isCurrent ? 'text-foreground' : ''}
                ${isPast ? 'text-muted-foreground' : ''}
                ${isFuture ? 'text-muted-foreground' : ''}
              `}>
                {stage.split(' ')[0]}
              </span>
            </div>
            
            {index < DEAL_STAGES.length - 1 && (
              <div 
                className={`
                  h-0.5 w-8 mx-2 transition-all duration-200
                  ${index < currentIndex ? 'bg-muted' : 'bg-border'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}