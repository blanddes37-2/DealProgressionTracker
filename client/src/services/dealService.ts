import { DealWithHistory } from '@/types/deal';
import { parseCSV } from '@/utils/csvParser';

let cachedDeals: DealWithHistory[] | null = null;

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