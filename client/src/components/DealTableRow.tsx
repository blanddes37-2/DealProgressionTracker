import { DealWithHistory } from '@/types/deal';
import { Badge } from '@/components/ui/badge';
import DealStageIcon from './DealStageIcon';
import ProgressBar from './ProgressBar';
import { TableRow, TableCell } from '@/components/ui/table';

interface DealTableRowProps {
  deal: DealWithHistory;
  onClick?: () => void;
}

export default function DealTableRow({ deal, onClick }: DealTableRowProps) {
  const handleClick = () => {
    console.log('Deal row clicked:', deal.id);
    onClick?.();
  };

  // Get current week and previous 3 weeks for history
  const getCurrentWeekLabel = (weeksAgo: number) => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - (today.getDay() + weeksAgo * 7));
    return `${weekStart.getMonth() + 1}/${weekStart.getDate()}`;
  };

  const getWeekHistory = (weekIndex: number) => {
    return deal.weeklyHistory[weekIndex] || null;
  };

  return (
    <TableRow 
      className="hover-elevate cursor-pointer"
      onClick={handleClick}
      data-testid={`row-deal-${deal.id}`}
    >
      <TableCell className="font-medium min-w-[200px]" data-testid={`text-address-${deal.id}`}>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{deal.address}</span>
          <span className="text-xs text-muted-foreground">{deal.city}, {deal.state}</span>
        </div>
      </TableCell>
      
      <TableCell className="min-w-[600px]">
        <div className="flex flex-col space-y-2">
          <Badge variant="secondary" className="text-xs w-fit" data-testid={`badge-status-${deal.id}`}>
            {deal.status}
          </Badge>
          <ProgressBar currentStage={deal.status} className="scale-75 origin-left" />
        </div>
      </TableCell>
      
      <TableCell className="text-sm" data-testid={`text-broker-${deal.id}`}>
        {deal.broker}
      </TableCell>
      
      <TableCell className="text-sm" data-testid={`text-brand-${deal.id}`}>
        {deal.brand}
      </TableCell>
      
      <TableCell className="text-sm" data-testid={`text-dealtype-${deal.id}`}>
        {deal.dealType}
      </TableCell>
      
      <TableCell className="text-sm text-right" data-testid={`text-rsf-${deal.id}`}>
        {deal.rsf}
      </TableCell>
      
      <TableCell className="min-w-[200px]" data-testid={`text-owner-${deal.id}`}>
        <div className="text-sm truncate">{deal.owner}</div>
      </TableCell>
      
      {/* Weekly History - 4 columns for current week and previous 3 weeks */}
      <TableCell className="text-center min-w-[60px]">
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xs text-muted-foreground font-medium">
            {getCurrentWeekLabel(0)}
          </span>
          {getWeekHistory(0) ? (
            <DealStageIcon stage={getWeekHistory(0)!.stage} className="h-4 w-4" showTooltip />
          ) : (
            <div className="h-4 w-4 rounded-full bg-muted border border-border" />
          )}
        </div>
      </TableCell>
      
      <TableCell className="text-center min-w-[60px]">
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xs text-muted-foreground font-medium">
            {getCurrentWeekLabel(1)}
          </span>
          {getWeekHistory(1) ? (
            <DealStageIcon stage={getWeekHistory(1)!.stage} className="h-4 w-4" showTooltip />
          ) : (
            <div className="h-4 w-4 rounded-full bg-muted border border-border" />
          )}
        </div>
      </TableCell>
      
      <TableCell className="text-center min-w-[60px]">
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xs text-muted-foreground font-medium">
            {getCurrentWeekLabel(2)}
          </span>
          {getWeekHistory(2) ? (
            <DealStageIcon stage={getWeekHistory(2)!.stage} className="h-4 w-4" showTooltip />
          ) : (
            <div className="h-4 w-4 rounded-full bg-muted border border-border" />
          )}
        </div>
      </TableCell>
      
      <TableCell className="text-center min-w-[60px]">
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xs text-muted-foreground font-medium">
            {getCurrentWeekLabel(3)}
          </span>
          {getWeekHistory(3) ? (
            <DealStageIcon stage={getWeekHistory(3)!.stage} className="h-4 w-4" showTooltip />
          ) : (
            <div className="h-4 w-4 rounded-full bg-muted border border-border" />
          )}
        </div>
      </TableCell>
      
      <TableCell className="min-w-[250px]">
        <div className="text-xs text-muted-foreground line-clamp-2">
          {deal.notes}
        </div>
      </TableCell>
    </TableRow>
  );
}