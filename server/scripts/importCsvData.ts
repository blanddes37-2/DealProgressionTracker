import { db } from '../db';
import { deals } from '@shared/schema';
import { parseCSV } from '../../client/src/utils/csvParser';
import * as fs from 'fs';
import * as path from 'path';

async function importCsvData() {
  try {
    console.log('🔄 Starting CSV data import...');
    
    // Read the CSV file
    const csvPath = path.join(process.cwd(), 'client', 'public', 'attached_assets', 'NCO Test_1758639555027.csv');
    console.log('📁 Reading CSV from:', csvPath);
    
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found at ${csvPath}`);
    }
    
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    console.log(`📊 CSV file loaded, ${csvContent.length} characters`);
    
    // Parse the CSV data
    const parsedDeals = parseCSV(csvContent);
    console.log(`✅ Parsed ${parsedDeals.length} deals from CSV`);
    
    if (parsedDeals.length === 0) {
      console.log('⚠️ No deals found in CSV file');
      return;
    }
    
    // Check if deals already exist in database
    const existingDeals = await db.select().from(deals);
    console.log(`📋 Found ${existingDeals.length} existing deals in database`);
    
    // Convert parsed deals to database format
    const dealsToInsert = parsedDeals.map(deal => ({
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
      weeklyHistory: deal.weeklyHistory
    }));
    
    // If database has few deals, clear and reimport all
    if (existingDeals.length < parsedDeals.length) {
      console.log('🗑️ Clearing existing deals and importing fresh data...');
      await db.delete(deals);
      
      // Insert all deals in batch
      console.log(`💾 Inserting ${dealsToInsert.length} deals...`);
      const insertedDeals = await db.insert(deals).values(dealsToInsert).returning();
      
      console.log(`✅ Successfully imported ${insertedDeals.length} deals!`);
      console.log(`📝 Sample deal: ${insertedDeals[0]?.address} - ${insertedDeals[0]?.status}`);
    } else {
      console.log('ℹ️ Database already has sufficient deals, skipping import');
    }
    
    // Final count
    const finalCount = await db.select().from(deals);
    console.log(`🎯 Total deals in database: ${finalCount.length}`);
    
  } catch (error) {
    console.error('❌ Error importing CSV data:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  importCsvData()
    .then(() => {
      console.log('🎉 Import completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Import failed:', error);
      process.exit(1);
    });
}

export default importCsvData;