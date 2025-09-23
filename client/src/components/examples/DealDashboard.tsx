import DealDashboard from '../DealDashboard';
import { DealWithHistory } from '@/types/deal';

export default function DealDashboardExample() {
  //todo: remove mock functionality
  const sampleDeals: DealWithHistory[] = [
    {
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
    },
    {
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
    },
    {
      id: '3',
      address: '2275 Research Blvd',
      city: 'Rockville',
      state: 'MD',
      country: 'USA',
      broker: 'Rob',
      bdd: 'JLL',
      dealNumber: 2,
      status: 'In Legal',
      brand: 'Regus',
      ncoExisting: 'NCO',
      dealType: 'REVENUE SHARE',
      notes: '9/8/25: Lease draft is with in house counsel and in review.',
      rsf: '20,818',
      owner: 'Brandywine Realty Trust',
      weeklyHistory: [
        { week: 'Sept 23', stage: 'In Legal' },
        { week: 'Sept 16', stage: 'LOI' },
        { week: 'Sept 9', stage: 'Site Approved' },
        { week: 'Sept 2', stage: 'Active Discussions' },
      ]
    },
    {
      id: '4',
      address: '2500 Edwards Dr',
      city: 'Fort Myers',
      state: 'FL',
      country: 'USA',
      broker: 'Rob',
      bdd: 'JLL',
      dealNumber: 3,
      status: 'IC Approved',
      brand: 'Regus',
      ncoExisting: 'NCO',
      dealType: 'REVENUE SHARE',
      notes: '9/15/25 AS sent MB signed LOI to RD. 9/8/25: Awaiting design modifications and LOI signature.',
      rsf: '20,000',
      owner: 'Westside Capital',
      weeklyHistory: [
        { week: 'Sept 23', stage: 'IC Approved' },
        { week: 'Sept 16', stage: 'LOI' },
        { week: 'Sept 9', stage: 'Site Approved' },
        { week: 'Sept 2', stage: 'Active Discussions' },
      ]
    },
    {
      id: '5',
      address: '99 Rosewood Dr',
      city: 'Danvers',
      state: 'MA',
      country: 'USA',
      broker: 'Rob',
      bdd: 'JLL',
      dealNumber: 5,
      status: 'LOI',
      brand: 'Regus',
      ncoExisting: 'NCO',
      dealType: 'REVENUE SHARE',
      notes: '9/8/25: Awaiting LL response. Followed up 9/8/25.',
      rsf: '14,000',
      owner: 'Rosewood 99 Offices LLC',
      weeklyHistory: [
        { week: 'Sept 23', stage: 'LOI' },
        { week: 'Sept 16', stage: 'Site Approved' },
        { week: 'Sept 9', stage: 'Active Discussions' },
        { week: 'Sept 2', stage: 'Prospecting' },
      ]
    },
    {
      id: '6',
      address: '1100 Brookstone Centre Pkwy',
      city: 'Columbus',
      state: 'GA',
      country: 'USA',
      broker: 'Lynn Shea',
      bdd: 'JLL',
      dealNumber: 5,
      status: 'Active Discussions',
      brand: 'Regus',
      ncoExisting: 'NCO',
      dealType: 'MCA',
      notes: '9/11/25: Lynn followed up with ownership',
      rsf: '31,904',
      owner: 'Kajima, USA',
      weeklyHistory: [
        { week: 'Sept 23', stage: 'Active Discussions' },
        { week: 'Sept 16', stage: 'Prospecting' },
        { week: 'Sept 9', stage: 'Prospecting' },
        { week: 'Sept 2', stage: 'Prospecting' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <DealDashboard deals={sampleDeals} />
      </div>
    </div>
  );
}