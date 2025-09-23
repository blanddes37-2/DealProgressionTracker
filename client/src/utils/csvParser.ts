import { DealWithHistory, DealStage, DealBrand, DealType } from '@/types/deal';

interface CSVRow {
  Address: string;
  City: string;
  State: string;
  Country: string;
  Broker: string;
  BDD: string;
  'Deal ': string;
  Status: string;
  Brand: string;
  'NCO / Existing': string;
  'Deal type': string;
  Notes: string;
  'RSF ': string;
  Owner: string;
}

// Map CSV statuses to our 10-stage system
const statusMapping: Record<string, DealStage> = {
  'Executed': 'Executed',
  'In Legal': 'In Legal',
  'IC Approved': 'IC Approved',
  'Site Approved': 'Site Approved',
  'Active Discussions': 'Active Discussions',
  'LOI': 'LOI',
  'Prospecting': 'Prospecting',
  'On Hold': 'On Hold',
  'Dead': 'Dead',
  'Withdrawn': 'Withdrawn'
};

// Helper functions to validate and convert CSV values to typed unions
function mapBrand(csvBrand: string): DealBrand {
  const brand = csvBrand.trim();
  if (brand === 'Regus' || brand === 'Spaces') {
    return brand as DealBrand;
  }
  return 'Regus'; // Default fallback
}

function mapNCOExisting(csvValue: string): 'NCO' | 'Existing' | 'Takeover' {
  const value = csvValue.trim();
  if (value === 'NCO' || value === 'Existing' || value === 'Takeover') {
    return value;
  }
  return 'NCO'; // Default fallback
}

function mapDealType(csvDealType: string): DealType {
  const dealType = csvDealType.trim();
  if (dealType === 'MCA' || dealType === 'REVENUE SHARE' || dealType === 'PROFIT SHARE (SOP)' || dealType === 'CONVENTIONAL') {
    return dealType as DealType;
  }
  return 'REVENUE SHARE'; // Default fallback
}

// Generate mock weekly history based on current status
function generateWeeklyHistory(currentStatus: DealStage): { week: string; stage: DealStage }[] {
  const stages: DealStage[] = ['Prospecting', 'Active Discussions', 'Site Approved', 'LOI', 'IC Approved', 'In Legal', 'Executed'];
  const currentIndex = stages.indexOf(currentStatus);
  
  if (currentIndex === -1) {
    // For statuses like 'On Hold', 'Dead', 'Withdrawn', create a simple history
    return [
      { week: '9/22/25', stage: currentStatus },
      { week: '9/15/25', stage: 'Active Discussions' },
      { week: '9/8/25', stage: 'Prospecting' },
      { week: '9/1/25', stage: 'Prospecting' }
    ];
  }
  
  // Create a progression showing how the deal advanced through stages
  const history: { week: string; stage: DealStage }[] = [];
  const baseDate = new Date('2025-09-22');
  
  for (let i = 0; i < 4; i++) {
    const weekDate = new Date(baseDate);
    weekDate.setDate(baseDate.getDate() - (i * 7));
    const month = weekDate.getMonth() + 1;
    const day = weekDate.getDate();
    const year = weekDate.getFullYear().toString().slice(-2);
    const weekString = `${month}/${day}/${year}`;
    
    // Calculate which stage this would have been
    const stageIndex = Math.max(0, currentIndex - i);
    const stage = stages[stageIndex] || 'Prospecting';
    
    history.push({
      week: weekString,
      stage: stage
    });
  }
  
  return history;
}

export function parseCSV(csvText: string): DealWithHistory[] {
  // Remove BOM if present
  const cleanText = csvText.replace(/^\uFEFF/, '');
  const lines = cleanText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"/, '').replace(/"$/, ''));
  
  const deals: DealWithHistory[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === ',' || !line.includes(',')) continue;
    
    const values = parseCSVLine(line);
    if (values.length < headers.length || !values[0]) continue; // Skip empty rows
    
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    // Skip rows with no address
    if (!row.Address) continue;
    
    // Map to our deal format - use normalized header access
    const status = statusMapping[row.Status] || 'Prospecting';
    
    const deal: DealWithHistory = {
      id: `deal-${i}`,
      address: row.Address,
      city: row.City,
      state: row.State,
      country: row.Country,
      broker: row.BDD || row.Broker, // Use BDD (person) as broker, fallback to Broker (firm)
      bdd: row.BDD,
      dealNumber: parseInt(row.Deal) || 1, // Use trimmed header "Deal" instead of "Deal "
      status: status,
      brand: mapBrand(row.Brand),
      ncoExisting: mapNCOExisting(row['NCO / Existing']),
      dealType: mapDealType(row['Deal type']),
      notes: row.Notes,
      rsf: (row.RSF || '').replace(/"/g, ''), // Use trimmed header "RSF" and handle undefined
      owner: row.Owner,
      weeklyHistory: generateWeeklyHistory(status)
    };
    
    deals.push(deal);
  }
  
  return deals;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}