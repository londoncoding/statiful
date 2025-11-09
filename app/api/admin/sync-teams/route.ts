// File: /app/api/admin/sync-teams/route.ts
// API endpoint to manually trigger team sync

import { NextRequest, NextResponse } from 'next/server';
import { 
  syncLeagueTeams, 
  syncAllLeagues,
  getSyncHistory,
  LEAGUE_IDS 
} from '@/lib/services/team-sync.service';

/**
 * GET /api/admin/sync-teams
 * Get sync history
 */
export async function GET() {
  try {
    const history = await getSyncHistory(20);
    
    return NextResponse.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error('Error fetching sync history:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/sync-teams
 * Trigger team sync
 * 
 * Body:
 * {
 *   "league": "premier-league" | "all",
 *   "season": 2025
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication here
    // const session = await getServerSession();
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const { league = 'premier-league', season = 2025 } = body;

    let result;

    if (league === 'all') {
      // Sync all leagues
      result = await syncAllLeagues(season);
    } else {
      // Sync specific league
      const leagueId = getLeagueId(league);
      if (!leagueId) {
        return NextResponse.json(
          { success: false, error: `Unknown league: ${league}` },
          { status: 400 }
        );
      }

      result = await syncLeagueTeams(leagueId, season);
    }

    return NextResponse.json({
      success: true,
      result,
    });

  } catch (error) {
    console.error('Error syncing teams:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

/**
 * Helper: Convert league name to ID
 */
function getLeagueId(leagueName: string): number | null {
  const mapping: Record<string, number> = {
    'premier-league': LEAGUE_IDS.PREMIER_LEAGUE,
    'la-liga': LEAGUE_IDS.LA_LIGA,
    'bundesliga': LEAGUE_IDS.BUNDESLIGA,
    'serie-a': LEAGUE_IDS.SERIE_A,
    'ligue-1': LEAGUE_IDS.LIGUE_1,
  };

  return mapping[leagueName] || null;
}