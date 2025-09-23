import { useState, useMemo } from 'react';
import { DealWithHistory } from '@/types/deal';
import DealFilters, { FilterState } from './DealFilters';
import DealCard from './DealCard';
import { Button } from '@/components/ui/button';
import { Grid, List, Plus } from 'lucide-react';

interface DealDashboardProps {
  deals: DealWithHistory[];
  onAddDeal?: () => void;
  onDealClick?: (deal: DealWithHistory) => void;
}

export default function DealDashboard({ deals, onAddDeal, onDealClick }: DealDashboardProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    stage: undefined,
    brand: undefined,
    dealType: undefined,
    broker: undefined,
    city: undefined,
    state: undefined,
  });
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableText = [
          deal.address,
          deal.city,
          deal.state,
          deal.broker,
          deal.owner,
          deal.brand,
          deal.notes
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      // Stage filter
      if (filters.stage && deal.status !== filters.stage) {
        return false;
      }

      // Brand filter
      if (filters.brand && deal.brand !== filters.brand) {
        return false;
      }

      // Deal type filter
      if (filters.dealType && deal.dealType !== filters.dealType) {
        return false;
      }

      // City filter
      if (filters.city && !deal.city.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }

      // State filter
      if (filters.state && !deal.state.toLowerCase().includes(filters.state.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [deals, filters]);

  const handleAddDeal = () => {
    console.log('Add deal clicked');
    onAddDeal?.();
  };

  const handleDealClick = (deal: DealWithHistory) => {
    console.log('Deal clicked:', deal.id);
    onDealClick?.(deal);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground" data-testid="text-dashboard-title">
            Deal Tracker
          </h1>
          <p className="text-muted-foreground">
            Commercial office lease deal progression tracking
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
              data-testid="button-view-grid"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
              data-testid="button-view-list"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Add Deal Button */}
          <Button onClick={handleAddDeal} data-testid="button-add-deal">
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Filters */}
      <DealFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalDeals={deals.length}
        filteredDeals={filteredDeals.length}
      />

      {/* Deals Grid */}
      {filteredDeals.length > 0 ? (
        <div 
          className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' 
              : 'space-y-4'
          }
        >
          {filteredDeals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onClick={() => handleDealClick(deal)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {deals.length === 0 ? (
              <>
                <h3 className="text-lg font-medium text-foreground mb-2">No deals yet</h3>
                <p>Get started by adding your first deal.</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-foreground mb-2">No deals match your filters</h3>
                <p>Try adjusting your search criteria or clearing filters.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}