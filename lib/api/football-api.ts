// API-Football Service Client (Direct API)
// Uses api-football.com direct API, not RapidAPI

import type { 
  APIFootballPlayerResponse, 
  League, 
  Team 
} from '../types/player';

const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

let requestCount = 0;
const RATE_LIMIT = 100;

class FootballAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'FootballAPIError';
  }
}

interface APIResponse<T> {
  get: string;
  parameters: Record<string, string>;
  errors: Record<string, string>;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T;
}

async function apiFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  requestCount++;

  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  console.log(`🔵 API Request [${requestCount}/${RATE_LIMIT}]:`, endpoint, params);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY || '',
      },
    });

    if (!response.ok) {
      throw new FootballAPIError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    const data: APIResponse<T> = await response.json();
    
    if (data.errors && Object.keys(data.errors).length > 0) {
      throw new FootballAPIError(
        `API Error: ${JSON.stringify(data.errors)}`,
        400,
        endpoint
      );
    }
    
    return data.response;
  } catch (error) {
    if (error instanceof FootballAPIError) {
      throw error;
    }
    throw new FootballAPIError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      endpoint
    );
  }
}

export async function searchPlayers(query: string, page: number = 1): Promise<APIFootballPlayerResponse[]> {
  const data = await apiFetch<APIFootballPlayerResponse[]>('/players', {
    search: query,
    page: page.toString(),
  });
  return data;
}

export async function getPlayerStats(
  playerId: number,
  season: string = '2024'
): Promise<APIFootballPlayerResponse> {
  const data = await apiFetch<APIFootballPlayerResponse[]>('/players', {
    id: playerId.toString(),
    season,
  });
  
  if (!data || data.length === 0) {
    throw new FootballAPIError(`Player not found: ${playerId}`);
  }
  
  return data[0];
}

export async function getTopScorers(
  leagueId: number, 
  season: string = '2024'
): Promise<APIFootballPlayerResponse[]> {
  const data = await apiFetch<APIFootballPlayerResponse[]>('/players/topscorers', {
    league: leagueId.toString(),
    season,
  });
  return data;
}

export function getRequestCount(): { count: number; limit: number; remaining: number } {
  return {
    count: requestCount,
    limit: RATE_LIMIT,
    remaining: Math.max(0, RATE_LIMIT - requestCount),
  };
}

export { FootballAPIError };