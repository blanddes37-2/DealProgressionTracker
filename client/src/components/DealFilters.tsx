import { useState } from 'react';
import { DealStage, DealBrand, DealType, DEAL_STAGES } from '@/types/deal';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface FilterState {
  search: string;
  stage?: DealStage;
  brand?: DealBrand;
  dealType?: DealType;
  broker?: string;
  city?: string;
  state?: string;
}

interface DealFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalDeals: number;
  filteredDeals: number;
}

export default function DealFilters({ 
  filters, 
  onFiltersChange, 
  totalDeals, 
  filteredDeals 
}: DealFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      stage: undefined,
      brand: undefined,
      dealType: undefined,
      broker: undefined,
      city: undefined,
      state: undefined,
    });
  };

  const activeFilterCount = Object.values(filters).filter(v => v && v !== '').length;

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deals, addresses, brokers..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2"
          data-testid="button-filter"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearFilters}
            className="flex items-center space-x-2"
            data-testid="button-clear"
          >
            <X className="h-4 w-4" />
            <span>Clear</span>
          </Button>
        )}
      </div>

      {/* Results Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredDeals} of {totalDeals} deals
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4 bg-muted rounded-lg">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Stage</label>
            <Select 
              value={filters.stage || ''} 
              onValueChange={(value) => updateFilter('stage', value)}
            >
              <SelectTrigger data-testid="select-stage">
                <SelectValue placeholder="All stages" />
              </SelectTrigger>
              <SelectContent>
                {DEAL_STAGES.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Brand</label>
            <Select 
              value={filters.brand || ''} 
              onValueChange={(value) => updateFilter('brand', value)}
            >
              <SelectTrigger data-testid="select-brand">
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Regus">Regus</SelectItem>
                <SelectItem value="Spaces">Spaces</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Deal Type</label>
            <Select 
              value={filters.dealType || ''} 
              onValueChange={(value) => updateFilter('dealType', value)}
            >
              <SelectTrigger data-testid="select-dealtype">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MCA">MCA</SelectItem>
                <SelectItem value="REVENUE SHARE">Revenue Share</SelectItem>
                <SelectItem value="PROFIT SHARE (SOP)">Profit Share (SOP)</SelectItem>
                <SelectItem value="CONVENTIONAL">Conventional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">City</label>
            <Input
              placeholder="Filter by city"
              value={filters.city || ''}
              onChange={(e) => updateFilter('city', e.target.value)}
              data-testid="input-city"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">State</label>
            <Input
              placeholder="Filter by state"
              value={filters.state || ''}
              onChange={(e) => updateFilter('state', e.target.value)}
              data-testid="input-state"
            />
          </div>
        </div>
      )}
    </div>
  );
}