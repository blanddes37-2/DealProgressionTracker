import DealTableRow from '../DealTableRow';
import { DealWithHistory } from '@/types/deal';
import { Table, TableHeader, TableHead, TableBody } from '@/components/ui/table';

export default function DealTableRowExample() {
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
      { week: '9/22/25', stage: 'In Legal' },
      { week: '9/15/25', stage: 'IC Approved' },
      { week: '9/8/25', stage: 'LOI' },
      { week: '9/1/25', stage: 'Site Approved' },
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Deal Table Row</h3>
      
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
            <DealTableRow deal={sampleDeal} />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}