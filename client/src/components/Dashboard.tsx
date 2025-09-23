import { useQuery } from '@tanstack/react-query';
import { DealWithHistory } from '@/types/deal';
import { loadDealsFromCSV } from '@/services/dealService';
import DealDashboard from './DealDashboard';

export default function Dashboard() {
  const { data: deals = [], isLoading, error } = useQuery({
    queryKey: ['deals'],
    queryFn: loadDealsFromCSV,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading deal data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <p className="text-destructive font-medium">Error loading deal data</p>
          <p className="text-muted-foreground text-sm">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
        </div>
      </div>
    );
  }

  const handleAddDeal = () => {
    console.log('Add deal functionality would open a modal or navigate to a form');
  };

  const handleDealClick = (deal: DealWithHistory) => {
    console.log('Deal detail view would open for:', deal.address);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <DealDashboard 
          deals={deals}
          onAddDeal={handleAddDeal}
          onDealClick={handleDealClick}
        />
      </div>
    </div>
  );
}