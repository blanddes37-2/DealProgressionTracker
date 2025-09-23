import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DealWithHistory } from '@/types/deal';
import { loadDealsFromDatabase } from '@/services/dealService';
import DealDashboard from './DealDashboard';
import AddDealModal from './AddDealModal';
import EditDealModal from './EditDealModal';
import UserProfile from './UserProfile';

export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<DealWithHistory | null>(null);

  const { data: deals = [], isLoading, error } = useQuery({
    queryKey: ['/api/deals'],
    queryFn: loadDealsFromDatabase,
    staleTime: 1 * 60 * 1000, // 1 minute (shorter for database data)
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
    setIsAddModalOpen(true);
  };

  const handleDealClick = (deal: DealWithHistory) => {
    setEditingDeal(deal);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with User Profile */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Commercial Deal Tracking</h1>
          <UserProfile />
        </div>
      </div>
      
      <div className="container mx-auto p-6">
        <DealDashboard 
          deals={deals}
          onAddDeal={handleAddDeal}
          onDealClick={handleDealClick}
        />
        
        {/* Add Deal Modal */}
        <AddDealModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
        
        {/* Edit Deal Modal */}
        {editingDeal && (
          <EditDealModal 
            isOpen={!!editingDeal}
            onClose={() => setEditingDeal(null)}
            deal={editingDeal}
          />
        )}
      </div>
    </div>
  );
}