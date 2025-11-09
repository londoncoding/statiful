// File: /lib/cron/sync-teams.cron.ts
// Cron job for automated team synchronization
// Runs daily to keep team data up-to-date

import { syncAllLeagues } from '@/lib/services/team-sync.service';

/**
 * Daily team sync job
 * Should be triggered by Vercel Cron or similar
 */
export async function dailyTeamSync() {
  console.log('[CRON] Starting daily team sync...');
  const currentSeason = new Date().getFullYear();
  
  try {
    const results = await syncAllLeagues(currentSeason);
    
    // Log results
    Object.entries(results).forEach(([league, result]) => {
      if (result.success) {
        console.log(`[CRON] ${league}: ✓ ${result.added} added, ${result.updated} updated, ${result.removed} removed`);
      } else {
        console.error(`[CRON] ${league}: ✗ ${result.errors.join(', ')}`);
      }
    });

    console.log('[CRON] Daily team sync completed');
    return { success: true, results };
  } catch (error) {
    console.error('[CRON] Daily team sync failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}