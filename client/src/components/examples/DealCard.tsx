import DealCard from '../DealCard';
import { DealWithHistory } from '@/types/deal';

export default function DealCardExample() {
  //todo: remove mock functionality
  const sampleDeal: DealWithHistory = {
    id: '1',
    address: '388 Market St',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    broker: 'Rob',
    bdd: 'JLL',
    dealNumber: 2,
    status: 'In Legal',
    brand: 'Regus',
    ncoExisting: 'NCO',
    dealType: 'REVENUE SHARE',
    notes: '9/17/25 Revised testfit sent to legal.',
    rsf: '31,152',
    owner: 'Honorway Investment Corporation',
    weeklyHistory: [
      { week: 'Sept 23', stage: 'In Legal' },
      { week: 'Sept 16', stage: 'IC Approved' },
      { week: 'Sept 9', stage: 'LOI' },
      { week: 'Sept 2', stage: 'Site Approved' },
    ]
  };

  const executedDeal: DealWithHistory = {
    id: '2',
    address: '2801 2nd Ave',
    city: 'Seattle',
    state: 'WA',
    country: 'USA',
    broker: 'Joe Kalafat',
    bdd: 'JLL',
    dealNumber: 1,
    status: 'Executed',
    brand: 'Regus',
    ncoExisting: 'NCO',
    dealType: 'MCA',
    notes: 'Executed 05/27/2025',
    rsf: '14,726',
    owner: 'Varde Partners, Inc',
    weeklyHistory: [
      { week: 'Sept 23', stage: 'Executed' },
      { week: 'Sept 16', stage: 'Executed' },
      { week: 'Sept 9', stage: 'In Legal' },
      { week: 'Sept 2', stage: 'IC Approved' },
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Deal Cards</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DealCard deal={sampleDeal} />
        <DealCard deal={executedDeal} />
      </div>
    </div>
  );
}