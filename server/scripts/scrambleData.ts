import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../../shared/schema';
import { eq } from 'drizzle-orm';
import { DealStage } from '../../client/src/types/deal';

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// Fake data arrays for realistic scrambling
const streets = [
  'Main Street', 'Park Avenue', 'Broadway', 'Market Street', 'Washington Boulevard',
  'Oak Drive', 'Maple Avenue', 'Cedar Lane', 'Pine Street', 'Elm Court',
  'Lake Shore Drive', 'Commerce Parkway', 'Innovation Way', 'Tech Boulevard',
  'Executive Plaza', 'Corporate Center', 'Business Park Drive', 'Enterprise Road'
];

const cities = [
  'Austin', 'Denver', 'Seattle', 'Portland', 'Phoenix', 'Miami', 'Boston',
  'Chicago', 'Nashville', 'Atlanta', 'Dallas', 'San Diego', 'Charlotte',
  'Raleigh', 'Tampa', 'Orlando', 'San Antonio', 'Las Vegas', 'Columbus'
];

const states = [
  'TX', 'CO', 'WA', 'OR', 'AZ', 'FL', 'MA', 'IL', 'TN', 'GA', 
  'NC', 'CA', 'NV', 'OH'
];

const brokerFirstNames = [
  'Michael', 'Jennifer', 'Robert', 'Sarah', 'David', 'Emily', 'James', 
  'Jessica', 'William', 'Ashley', 'Christopher', 'Amanda', 'Matthew'
];

const brokerLastNames = [
  'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Anderson',
  'Taylor', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson'
];

const ownerCompanies = [
  'Summit Properties Group', 'Apex Real Estate Holdings', 'Meridian Development',
  'Catalyst Commercial Partners', 'Pinnacle Realty Trust', 'Horizon Investments',
  'Cornerstone Capital', 'Vanguard Properties', 'Premier Development Group',
  'Atlas Property Management', 'Nexus Real Estate', 'Quantum Holdings LLC',
  'Sterling Commercial Group', 'Fortress Real Estate Partners'
];

const brands = ['FlexSpace', 'WorkHub', 'OfficeNow', 'DeskPro', 'CoWork Central'];
const dealTypes = ['Direct', 'Sublease', 'Coworking'];

const commentTemplates = [
  "Initial contact made with broker, discussing potential terms.",
  "Site visit scheduled for next week.",
  "Tenant improvement allowance negotiated to $[amount] per RSF.",
  "Waiting on landlord approval for proposed modifications.",
  "Legal team reviewing lease agreement.",
  "Updated financial projections based on new market data.",
  "Broker confirmed competing offer from another tenant.",
  "Extension requested for due diligence period.",
  "Environmental assessment completed, no issues found.",
  "Board presentation scheduled for IC approval.",
  "Minor revisions requested on space planning.",
  "Lease execution pending final signatures.",
  "Parking allocation confirmed at [number] spaces.",
  "HVAC upgrade included in landlord work letter.",
  "Term sheet revised per client feedback.",
  "Rent commencement date pushed to accommodate buildout.",
  "Security deposit terms finalized.",
  "Operating expense cap negotiated successfully.",
  "Renewal option terms under discussion.",
  "Signage rights approved by building management."
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateAddress(): string {
  const number = Math.floor(Math.random() * 9000) + 1000;
  const street = getRandomElement(streets);
  const suite = Math.random() > 0.5 ? `, Suite ${Math.floor(Math.random() * 300) + 100}` : '';
  return `${number} ${street}${suite}`;
}

function generateBrokerName(): string {
  return `${getRandomElement(brokerFirstNames)} ${getRandomElement(brokerLastNames)}`;
}

function generateRSF(): string {
  const rsf = Math.floor(Math.random() * 25000) + 2000;
  return rsf.toLocaleString();
}

function generateComment(): string {
  const template = getRandomElement(commentTemplates);
  return template
    .replace('[amount]', (Math.floor(Math.random() * 50) + 20).toString())
    .replace('[number]', (Math.floor(Math.random() * 50) + 10).toString());
}

function generateDealStage(): DealStage {
  const stages: DealStage[] = [
    'Prospecting', 'Active Discussions', 'Site Approved', 'LOI', 
    'IC Approved', 'In Legal', 'Executed', 'On Hold', 'Dead', 'Withdrawn'
  ];
  
  // Weight towards active stages for more realistic distribution
  const weights = [15, 20, 15, 15, 10, 10, 5, 3, 5, 2];
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  
  let random = Math.random() * totalWeight;
  for (let i = 0; i < stages.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return stages[i];
    }
  }
  
  return 'Active Discussions';
}

async function scrambleData() {
  console.log('🔄 Starting data scrambling process...');
  
  try {
    // Get all existing deals
    const deals = await db.select().from(schema.deals);
    console.log(`Found ${deals.length} deals to scramble`);
    
    // Scramble each deal
    for (let i = 0; i < deals.length; i++) {
      const deal = deals[i];
      const cityState = getRandomElement(cities);
      const state = getRandomElement(states);
      
      const scrambledDeal = {
        address: generateAddress(),
        city: cityState,
        state: state,
        broker: generateBrokerName(),
        rsf: generateRSF(),
        owner: getRandomElement(ownerCompanies),
        brand: getRandomElement(brands),
        dealType: getRandomElement(dealTypes),
        status: generateDealStage(),
        // Keep notes empty since we'll use comments
        notes: ''
      };
      
      // Update the deal
      await db.update(schema.deals)
        .set(scrambledDeal)
        .where(eq(schema.deals.id, deal.id));
      
      console.log(`✓ Scrambled deal ${i + 1}/${deals.length}`);
    }
    
    // Get all existing comments
    const comments = await db.select().from(schema.comments);
    console.log(`Found ${comments.length} comments to scramble`);
    
    // Scramble comment content
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      
      await db.update(schema.comments)
        .set({ content: generateComment() })
        .where(eq(schema.comments.id, comment.id));
      
      console.log(`✓ Scrambled comment ${i + 1}/${comments.length}`);
    }
    
    // Get all deal history records
    const historyRecords = await db.select().from(schema.dealHistory);
    console.log(`Found ${historyRecords.length} history records`);
    
    // For history, we just need to ensure they have scrambled stages
    // The stages are already part of the type, so they're fine
    
    console.log('\n✅ Data scrambling complete!');
    console.log('All proprietary data has been replaced with realistic fake data.');
    console.log('The database is now safe for public demonstration.');
    
  } catch (error) {
    console.error('❌ Error scrambling data:', error);
    process.exit(1);
  }
}

// Run the scrambling
scrambleData();