import { db } from '../db';
import { deals, comments } from '@shared/schema';
import { eq, sql } from 'drizzle-orm';

async function migrateNotesToComments() {
  try {
    console.log('🔄 Starting migration of notes to comments...');

    // Get all deals with notes
    const dealsWithNotes = await db.select().from(deals).where(sql`notes IS NOT NULL AND notes != ''`);
    console.log(`📋 Found ${dealsWithNotes.length} deals with notes to migrate`);

    if (dealsWithNotes.length === 0) {
      console.log('ℹ️ No notes found to migrate');
      return;
    }

    let migratedCount = 0;

    // Process each deal
    for (const deal of dealsWithNotes) {
      if (deal.notes && deal.notes.trim()) {
        console.log(`📝 Migrating notes for deal: ${deal.address} (${deal.id})`);

        // Create comment from notes
        const [comment] = await db.insert(comments).values({
          dealId: deal.id,
          content: deal.notes.trim(),
        }).returning();

        console.log(`✅ Created comment: ${comment.id}`);
        migratedCount++;
      }
    }

    console.log(`🎯 Successfully migrated ${migratedCount} notes to comments!`);

    // Optionally clear notes field after migration
    // Uncomment these lines if you want to clear notes after successful migration:
    /*
    if (migratedCount > 0) {
      console.log('🧹 Clearing notes field after successful migration...');
      await db.update(deals).set({ notes: '' });
      console.log('✅ Notes field cleared');
    }
    */

    console.log('🎉 Migration completed successfully!');

  } catch (error) {
    console.error('❌ Error during migration:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateNotesToComments()
    .then(() => {
      console.log('🎉 Migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration failed:', error);
      process.exit(1);
    });
}

export default migrateNotesToComments;