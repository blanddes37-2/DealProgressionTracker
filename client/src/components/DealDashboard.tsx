import { useState, useMemo } from 'react';
import { DealWithHistory } from '@/types/deal';
import DealFilters, { FilterState } from './DealFilters';
import DealCard from './DealCard';
import DealTableRow from './DealTableRow';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableHead, TableBody } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid, List, Plus, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

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
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'address' | 'status' | 'broker' | 'brand' | 'dealType' | 'rsf' | 'owner'>('address');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredDeals = useMemo(() => {
    const filtered = deals.filter(deal => {
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

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'address':
          aValue = a.address.toLowerCase();
          bValue = b.address.toLowerCase();
          break;
        case 'status':
          // Sort by stage progression order
          const stageOrder = ['Prospecting', 'Active Discussions', 'Site Approved', 'LOI', 'IC Approved', 'In Legal', 'Executed', 'On Hold', 'Dead', 'Withdrawn'];
          aValue = stageOrder.indexOf(a.status);
          bValue = stageOrder.indexOf(b.status);
          break;
        case 'broker':
          aValue = a.broker.toLowerCase();
          bValue = b.broker.toLowerCase();
          break;
        case 'brand':
          aValue = a.brand.toLowerCase();
          bValue = b.brand.toLowerCase();
          break;
        case 'dealType':
          aValue = a.dealType.toLowerCase();
          bValue = b.dealType.toLowerCase();
          break;
        case 'rsf':
          // Parse RSF as numbers, removing commas
          aValue = parseInt(a.rsf.replace(/[^0-9]/g, '')) || 0;
          bValue = parseInt(b.rsf.replace(/[^0-9]/g, '')) || 0;
          break;
        case 'owner':
          aValue = a.owner.toLowerCase();
          bValue = b.owner.toLowerCase();
          break;
        default:
          aValue = a.address.toLowerCase();
          bValue = b.address.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [deals, filters, sortBy, sortDirection]);

  const handleAddDeal = () => {
    onAddDeal?.();
  };

  const handleDealClick = (deal: DealWithHistory) => {
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
          {/* Sort Controls */}
          <div className="flex items-center space-x-2">
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-[140px]" data-testid="select-sort-by">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="address">Address</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="broker">Broker</SelectItem>
                <SelectItem value="brand">Brand</SelectItem>
                <SelectItem value="dealType">Deal Type</SelectItem>
                <SelectItem value="rsf">RSF</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              data-testid="button-sort-direction"
            >
              {sortDirection === 'asc' ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-r-none"
              data-testid="button-view-list"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-l-none"
              data-testid="button-view-grid"
            >
              <Grid className="h-4 w-4" />
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

      {/* Deals Display */}
      {filteredDeals.length > 0 ? (
        viewMode === 'list' ? (
          <div className="border border-border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <tr>
                  <TableHead className="min-w-[200px]">Address</TableHead>
                  <TableHead className="min-w-[600px]">Status</TableHead>
                  <TableHead>Broker</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Deal Type</TableHead>
                  <TableHead className="text-right">RSF</TableHead>
                  <TableHead className="min-w-[200px]">Owner</TableHead>
                  <TableHead className="text-center min-w-[60px]">This Week</TableHead>
                  <TableHead className="text-center min-w-[60px]">Week -1</TableHead>
                  <TableHead className="text-center min-w-[60px]">Week -2</TableHead>
                  <TableHead className="text-center min-w-[60px]">Week -3</TableHead>
                  <TableHead className="min-w-[250px]">Notes</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {filteredDeals.map((deal) => (
                  <DealTableRow
                    key={deal.id}
                    deal={deal}
                    onClick={() => handleDealClick(deal)}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onClick={() => handleDealClick(deal)}
              />
            ))}
          </div>
        )
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