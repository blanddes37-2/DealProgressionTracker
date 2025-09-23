import { WeeklyHistory } from '@/types/deal';
import DealStageIcon from './DealStageIcon';

interface WeeklyProgressionProps {
  weeklyHistory: WeeklyHistory[];
  className?: string;
}

export default function WeeklyProgression({ weeklyHistory, className = '' }: WeeklyProgressionProps) {
  // Ensure we have exactly 4 weeks, fill with empty if needed
  const weeks = [...weeklyHistory];
  while (weeks.length < 4) {
    weeks.push({ week: '', stage: 'Prospecting' });
  }
  weeks.splice(4); // Limit to 4 weeks
  
  return (
    <div className={`space-y-2 ${className}`}>
      <h4 className="text-xs font-medium text-muted-foreground">4-Week History</h4>
      <div className="grid grid-cols-4 gap-2">
        {weeks.map((weekData, index) => {
          const weekLabel = index === 0 ? 'Current' : `Week -${index}`;
          const isEmpty = !weekData.week;
          
          return (
            <div key={index} className="flex flex-col items-center space-y-1">
              <span className="text-xs text-muted-foreground font-medium">
                {weekLabel}
              </span>
              {!isEmpty ? (
                <DealStageIcon 
                  stage={weekData.stage} 
                  className="h-5 w-5" 
                  showTooltip 
                />
              ) : (
                <div className="h-5 w-5 rounded-full bg-muted border border-border" />
              )}
              {!isEmpty && (
                <span className="text-xs text-muted-foreground text-center max-w-12 leading-tight">
                  {weekData.stage.split(' ')[0]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}