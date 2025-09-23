import { useState } from 'react';
import DealFilters, { FilterState } from '../DealFilters';

export default function DealFiltersExample() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    stage: undefined,
    brand: undefined,
    dealType: undefined,
    broker: undefined,
    city: undefined,
    state: undefined,
  });

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Deal Filters</h3>
      
      <DealFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalDeals={147}
        filteredDeals={23}
      />
      
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-2">Current Filters:</h4>
        <pre className="text-xs text-muted-foreground">
          {JSON.stringify(filters, null, 2)}
        </pre>
      </div>
    </div>
  );
}