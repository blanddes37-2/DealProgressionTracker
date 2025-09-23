import DealStageIcon from '../DealStageIcon';
import { DEAL_STAGES } from '@/types/deal';

export default function DealStageIconExample() {
  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Deal Stage Icons</h3>
      <div className="grid grid-cols-5 gap-4">
        {DEAL_STAGES.map((stage) => (
          <div key={stage} className="flex flex-col items-center space-y-2">
            <DealStageIcon stage={stage} className="h-8 w-8" showTooltip />
            <span className="text-xs text-muted-foreground text-center">{stage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}