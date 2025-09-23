import { DealWithHistory } from '@/types/deal';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CompactProgressBar from './CompactProgressBar';
import WeeklyProgression from './WeeklyProgression';
import { MapPin, User, Building2, FileText } from 'lucide-react';

interface DealCardProps {
  deal: DealWithHistory;
  onClick?: () => void;
}

export default function DealCard({ deal, onClick }: DealCardProps) {
  const handleClick = () => {
    console.log('Deal card clicked:', deal.id);
    onClick?.();
  };

  return (
    <Card 
      className="hover-elevate active-elevate-2 cursor-pointer transition-all duration-200"
      onClick={handleClick}
      data-testid={`card-deal-${deal.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm leading-tight" data-testid={`text-address-${deal.id}`}>
              {deal.address}
            </h3>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span data-testid={`text-location-${deal.id}`}>{deal.city}, {deal.state}</span>
            </div>
          </div>
          <Badge variant="secondary" className="ml-2 text-xs" data-testid={`badge-status-${deal.id}`}>
            {deal.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div>
          <CompactProgressBar currentStage={deal.status} />
        </div>

        {/* Deal Details */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Broker:</span>
            <span className="font-medium text-foreground" data-testid={`text-broker-${deal.id}`}>{deal.broker}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Building2 className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Brand:</span>
            <span className="font-medium text-foreground" data-testid={`text-brand-${deal.id}`}>{deal.brand}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FileText className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">RSF:</span>
            <span className="font-medium text-foreground" data-testid={`text-rsf-${deal.id}`}>{deal.rsf}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium text-foreground" data-testid={`text-dealtype-${deal.id}`}>{deal.dealType}</span>
          </div>
        </div>

        {/* Owner */}
        <div className="text-xs">
          <span className="text-muted-foreground">Owner: </span>
          <span className="font-medium text-foreground" data-testid={`text-owner-${deal.id}`}>{deal.owner}</span>
        </div>

        {/* Weekly Progression */}
        <WeeklyProgression weeklyHistory={deal.weeklyHistory} />

        {/* Notes Preview */}
        {deal.notes && (
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Notes: </span>
            <span className="line-clamp-2">{deal.notes}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}