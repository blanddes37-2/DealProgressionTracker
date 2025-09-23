import { DealStage, DEAL_STAGES } from '@/types/deal';
import DealStageIcon from './DealStageIcon';

interface CompactProgressBarProps {
  currentStage: DealStage;
  className?: string;
}

export default function CompactProgressBar({ currentStage, className = '' }: CompactProgressBarProps) {
  const currentIndex = DEAL_STAGES.indexOf(currentStage);
  
  // For compact view, show only key milestone stages to save space
  const keyStages = [
    'Prospecting',
    'Active Discussions', 
    'Site Approved',
    'LOI',
    'IC Approved',
    'In Legal',
    'Executed'
  ] as DealStage[];
  
  // Handle terminal states (On Hold, Dead, Withdrawn) by showing current stage if it's one of them
  const stagesToShow = keyStages.includes(currentStage) 
    ? keyStages 
    : [...keyStages, currentStage];
  
  const compactCurrentIndex = stagesToShow.indexOf(currentStage);
  
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {stagesToShow.map((stage, index) => {
        const isPast = index < compactCurrentIndex;
        const isCurrent = index === compactCurrentIndex;
        const isFuture = index > compactCurrentIndex;
        
        return (
          <div key={stage} className="flex items-center">
            <div className="flex flex-col items-center">
              <div 
                className={`
                  relative h-4 w-4 rounded-full border transition-all duration-200
                  ${isCurrent ? 'ring-1 ring-primary ring-offset-1' : ''}
                  ${isPast ? 'bg-muted border-muted' : ''}
                  ${isFuture ? 'bg-background border-border' : ''}
                `}
                title={stage} // Show full stage name on hover
              >
                {isCurrent && (
                  <DealStageIcon 
                    stage={stage} 
                    className="absolute inset-0 h-4 w-4" 
                  />
                )}
                {isPast && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  </div>
                )}
              </div>
              {/* Only show abbreviated text for current stage to save space */}
              {isCurrent && (
                <span className="mt-0.5 text-[10px] font-medium text-center max-w-12 leading-tight text-foreground">
                  {stage === 'Active Discussions' ? 'Active' : 
                   stage === 'Site Approved' ? 'Site' :
                   stage === 'IC Approved' ? 'IC' : 
                   stage === 'In Legal' ? 'Legal' :
                   stage.split(' ')[0]}
                </span>
              )}
            </div>
            
            {index < stagesToShow.length - 1 && (
              <div 
                className={`
                  h-0.5 w-3 transition-all duration-200
                  ${index < compactCurrentIndex ? 'bg-muted' : 'bg-border'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}