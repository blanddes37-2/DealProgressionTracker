import { DealWithHistory } from '@/types/deal';
import { parseCSV } from '@/utils/csvParser';

let cachedDeals: DealWithHistory[] | null = null;

// Fetch deals from database
export const loadDealsFromDatabase = async (): Promise<DealWithHistory[]> => {
  try {
    console.log('Fetching deals from database...');
    const response = await fetch('/api/deals');
    
    if (!response.ok) {
      console.error('Failed to fetch deals from database:', response.statusText);
      // Fall back to CSV loading if database is empty
      return loadDealsFromCSV();
    }
    
    const deals = await response.json();
    console.log('Loaded deals from database:', deals.length);
    
    // If database is empty, load from CSV
    if (deals.length === 0) {
      console.log('Database is empty, loading from CSV...');
      return loadDealsFromCSV();
    }
    
    // Convert database deals to DealWithHistory format
    const dealsWithHistory: DealWithHistory[] = deals.map((deal: any) => ({
      id: deal.id,
      address: deal.address,
      city: deal.city,
      state: deal.state,
      country: deal.country,
      broker: deal.broker,
      bdd: deal.bdd,
      dealNumber: deal.dealNumber,
      status: deal.status,
      brand: deal.brand,
      ncoExisting: deal.ncoExisting,
      dealType: deal.dealType,
      notes: deal.notes,
      rsf: deal.rsf,
      owner: deal.owner,
      weeklyHistory: Array.isArray(deal.weeklyHistory) ? deal.weeklyHistory : []
    }));
    
    return dealsWithHistory;
  } catch (error) {
    console.error('Error loading deals from database:', error);
    // Fall back to CSV loading
    return loadDealsFromCSV();
  }
};

export async function loadDealsFromCSV(): Promise<DealWithHistory[]> {
  if (cachedDeals) {
    console.log('Returning cached deals:', cachedDeals.length);
    return cachedDeals;
  }

  try {
    // Import the CSV file using Vite's static asset handling
    const csvPath = '/attached_assets/NCO Test_1758639555027.csv';
    console.log('Fetching CSV from:', csvPath);
    const response = await fetch(csvPath);
    
    console.log('CSV fetch response:', response.status, response.statusText);
    if (!response.ok) {
      throw new Error(`Failed to load CSV: ${response.status} ${response.statusText}`);
    }
    
    const csvText = await response.text();
    console.log('CSV text length:', csvText.length, 'First 200 chars:', csvText.substring(0, 200));
    
    const deals = parseCSV(csvText);
    console.log('Parsed deals count:', deals.length);
    
    if (deals.length > 0) {
      console.log('First deal:', deals[0]);
    }
    
    cachedDeals = deals;
    return deals;
  } catch (error) {
    console.error('Error loading CSV data:', error);
    // Return empty array on error - the UI will show a message
    return [];
  }
}

export function clearCache() {
  cachedDeals = null;
}