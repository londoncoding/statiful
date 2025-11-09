// File: /lib/services/team-sync.service.ts
// Automated team synchronization with API-Football

import { PrismaClient } from '@prisma/client';
import { getTeamColors } from '@/lib/config/team-colors';

const prisma = new PrismaClient();

// API-Football configuration
const API_BASE_URL = 'https://v3.football.api-sports.io';
const API_KEY = process.env.FOOTBALL_API_KEY!;

// League IDs
export const LEAGUE_IDS = {
  PREMIER_LEAGUE: 39,
  LA_LIGA: 140,
  BUNDESLIGA: 78,
  SERIE_A: 135,
  LIGUE_1: 61,
} as const;

interface APIFootballTeam {
  team: {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
  };
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
  };
}

interface SyncResult {
  success: boolean;
  added: number;
  updated: number;
  removed: number;
  errors: string[];
  duration: number;
}

/**
 * Sync teams for a specific league and season
 */
export async function syncLeagueTeams(
  leagueId: number,
  season: number
): Promise<SyncResult> {
  const startTime = Date.now();
  const syncLog = await prisma.syncLog.create({
    data: {
      syncType: 'teams',
      leagueId,
      season: season.toString(),
      status: 'started',
      startedAt: new Date(),
    },
  });

  const result: SyncResult = {
    success: false,
    added: 0,
    updated: 0,
    removed: 0,
    errors: [],
    duration: 0,
  };

  try {
    // 1. Fetch teams from API-Football
    const apiTeams = await fetchTeamsFromAPI(leagueId, season);
    
    if (apiTeams.length === 0) {
      throw new Error(`No teams returned from API for league ${leagueId} season ${season}`);
    }

    // 2. Get or create league
    const league = await getOrCreateLeague(leagueId, season);

    // 3. Process each team
    for (const apiTeam of apiTeams) {
      try {
        await processTeam(apiTeam, league.id, season.toString());
        result.added++;
      } catch (error) {
        result.errors.push(`Team ${apiTeam.team.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // 4. Mark teams that are no longer in the league as inactive
    const apiTeamIds = apiTeams.map(t => t.team.id);
    const removedCount = await markInactiveTeams(league.id, season.toString(), apiTeamIds);
    result.removed = removedCount;

    // 5. Update league last synced time
    await prisma.league.update({
      where: { id: league.id },
      data: { lastSyncedAt: new Date() },
    });

    result.success = true;
    result.duration = Date.now() - startTime;

    // Update sync log
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: result.errors.length > 0 ? 'partial' : 'success',
        recordsAdded: result.added,
        recordsUpdated: result.updated,
        recordsRemoved: result.removed,
        completedAt: new Date(),
        durationMs: result.duration,
        errorMessage: result.errors.length > 0 ? result.errors.join('; ') : null,
      },
    });

  } catch (error) {
    result.success = false;
    result.errors.push(error instanceof Error ? error.message : 'Unknown error');
    result.duration = Date.now() - startTime;

    // Update sync log with error
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        completedAt: new Date(),
        durationMs: result.duration,
      },
    });
  }

  return result;
}

/**
 * Fetch teams from API-Football
 */
async function fetchTeamsFromAPI(
  leagueId: number,
  season: number
): Promise<APIFootballTeam[]> {
  const url = `${API_BASE_URL}/teams?league=${leagueId}&season=${season}`;
  
  const response = await fetch(url, {
    headers: {
      'x-apisports-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`API-Football returned ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(`API-Football error: ${JSON.stringify(data.errors)}`);
  }

  return data.response || [];
}

/**
 * Get or create league in database
 */
async function getOrCreateLeague(apiId: number, season: number) {
  const leagueNames: Record<number, { name: string; country: string }> = {
    [LEAGUE_IDS.PREMIER_LEAGUE]: { name: 'Premier League', country: 'England' },
    [LEAGUE_IDS.LA_LIGA]: { name: 'La Liga', country: 'Spain' },
    [LEAGUE_IDS.BUNDESLIGA]: { name: 'Bundesliga', country: 'Germany' },
    [LEAGUE_IDS.SERIE_A]: { name: 'Serie A', country: 'Italy' },
    [LEAGUE_IDS.LIGUE_1]: { name: 'Ligue 1', country: 'France' },
  };

  const leagueInfo = leagueNames[apiId] || { name: 'Unknown', country: 'Unknown' };

  return await prisma.league.upsert({
    where: { apiId },
    create: {
      apiId,
      name: leagueInfo.name,
      country: leagueInfo.country,
      currentSeason: season.toString(),
    },
    update: {
      currentSeason: season.toString(),
    },
  });
}

/**
 * Process a single team (create or update)
 */
async function processTeam(
  apiTeam: APIFootballTeam,
  leagueId: number,
  season: string
) {
  const { team, venue } = apiTeam;

  // Get team colors from config
  const colorConfig = getTeamColors(team.id);

  // Upsert team
  const dbTeam = await prisma.team.upsert({
    where: { apiId: team.id },
    create: {
      apiId: team.id,
      name: team.name,
      shortCode: team.code,
      logoUrl: team.logo,
      venueName: venue.name,
      venueCity: venue.city,
      primaryColor: colorConfig?.primaryColor,
      secondaryColor: colorConfig?.secondaryColor,
      accentColor: colorConfig?.accentColor,
      isActive: true,
    },
    update: {
      name: team.name,
      shortCode: team.code,
      logoUrl: team.logo,
      venueName: venue.name,
      venueCity: venue.city,
      isActive: true,
      // Only update colors if they exist in config
      ...(colorConfig && {
        primaryColor: colorConfig.primaryColor,
        secondaryColor: colorConfig.secondaryColor,
        accentColor: colorConfig.accentColor,
      }),
    },
  });

  // Upsert team season
  await prisma.teamSeason.upsert({
    where: {
      teamId_leagueId_season: {
        teamId: dbTeam.id,
        leagueId,
        season,
      },
    },
    create: {
      teamId: dbTeam.id,
      leagueId,
      season,
      status: 'active',
    },
    update: {
      status: 'active',
      leftAt: null, // Reset if team rejoined
    },
  });

  return dbTeam;
}

/**
 * Mark teams that are no longer in the league as inactive
 */
async function markInactiveTeams(
  leagueId: number,
  season: string,
  activeTeamApiIds: number[]
): Promise<number> {
  // Find teams that were in this league but aren't anymore
  const activeTeams = await prisma.team.findMany({
    where: {
      apiId: { in: activeTeamApiIds },
    },
    select: { id: true },
  });

  const activeTeamIds = activeTeams.map((t: { id: number }) => t.id);

  // Mark team seasons as inactive (relegated)
  const result = await prisma.teamSeason.updateMany({
    where: {
      leagueId,
      season,
      teamId: { notIn: activeTeamIds },
      status: 'active',
    },
    data: {
      status: 'relegated',
      leftAt: new Date(),
    },
  });

  return result.count;
}

/**
 * Sync all major leagues
 */
export async function syncAllLeagues(season: number): Promise<Record<string, SyncResult>> {
  const results: Record<string, SyncResult> = {};

  const leagues = [
    { id: LEAGUE_IDS.PREMIER_LEAGUE, name: 'Premier League' },
    { id: LEAGUE_IDS.LA_LIGA, name: 'La Liga' },
    { id: LEAGUE_IDS.BUNDESLIGA, name: 'Bundesliga' },
    { id: LEAGUE_IDS.SERIE_A, name: 'Serie A' },
    { id: LEAGUE_IDS.LIGUE_1, name: 'Ligue 1' },
  ];

  for (const league of leagues) {
    try {
      results[league.name] = await syncLeagueTeams(league.id, season);
      // Wait 1 second between API calls to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      results[league.name] = {
        success: false,
        added: 0,
        updated: 0,
        removed: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        duration: 0,
      };
    }
  }

  return results;
}

/**
 * Get sync history
 */
export async function getSyncHistory(limit: number = 10) {
  return await prisma.syncLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Get teams for a league and season
 */
export async function getLeagueTeams(leagueId: number, season: string) {
  const league = await prisma.league.findUnique({
    where: { apiId: leagueId },
  });

  if (!league) {
    return [];
  }

  return await prisma.team.findMany({
    where: {
      seasons: {
        some: {
          leagueId: league.id,
          season,
          status: 'active',
        },
      },
    },
    include: {
      seasons: {
        where: {
          leagueId: league.id,
          season,
        },
      },
    },
    orderBy: { name: 'asc' },
  });
}