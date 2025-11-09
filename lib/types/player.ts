// Unified Player Data Types for Statiful
// Combines data from API-Football, FBref, and Sofascore

export interface Player {
  // Core Identity (from API-Football)
  id: number;
  apiId: number; // API-Football ID
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birthDate: string;
  nationality: string;
  height: string | null;
  weight: string | null;
  photo: string;
  
  // Current Team Info
  team: {
    id: number;
    name: string;
    logo: string;
  };
  
  // Position
  position: string; // "Attacker", "Midfielder", "Defender", "Goalkeeper"
  
  // League Info
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    season: string;
  };
  
  // Statistics
  stats: PlayerStats;
}

export interface PlayerStats {
  // Basic Info
  season: string;
  appearances: number;
  minutesPlayed: number;
  starts: number;
  substituteIn: number;
  substituteOut: number;
  rating: number | null;
  
  // Offensive Stats (API-Football + FBref)
  goals: number;
  assists: number;
  shotsTotal: number;
  shotsOnTarget: number;
  shotAccuracy: number | null; // percentage
  conversionRate: number | null; // goals / shots
  goalsPerMatch: number | null;
  goalsPerNinety: number | null;
  penalties: {
    scored: number;
    missed: number;
    saved: number;
  };
  
  // Advanced Offensive (FBref)
  xG: number | null; // Expected Goals
  xA: number | null; // Expected Assists
  npxG: number | null; // Non-penalty xG
  xGPerShot: number | null;
  xGOverperformance: number | null; // goals - xG
  bigChances: number | null; // xG > 0.38
  shotCreatingActions: number | null;
  goalCreatingActions: number | null;
  
  // Passing Stats (API-Football + FBref)
  passes: {
    total: number;
    completed: number;
    accuracy: number; // percentage
    keyPasses: number;
  };
  
  // Advanced Passing (FBref)
  progressivePasses: number | null;
  passesIntoPenaltyArea: number | null;
  passesIntoFinalThird: number | null;
  throughBalls: number | null;
  crosses: {
    attempted: number;
    completed: number;
    accuracy: number | null;
  };
  progressiveCarryingDistance: number | null; // meters
  
  // Defensive Stats (API-Football)
  tackles: {
    total: number;
    won: number | null;
    successRate: number | null;
  };
  interceptions: number;
  blocks: number;
  clearances: number | null;
  
  // Advanced Defensive (FBref)
  pressures: {
    total: number | null;
    successful: number | null;
    successRate: number | null;
  };
  recoveries: number | null;
  errorsLeadingToShot: number | null;
  
  // Duels (API-Football)
  duels: {
    total: number;
    won: number;
    winPercentage: number | null;
  };
  aerialDuels: {
    total: number;
    won: number;
    winPercentage: number | null;
  };
  groundDuels: {
    won: number | null;
  };
  
  // Dribbling (API-Football + FBref)
  dribbles: {
    attempted: number;
    completed: number;
    successRate: number | null;
  };
  progressiveCarries: number | null; // FBref
  touches: {
    total: number | null;
    inPenaltyArea: number | null;
  };
  miscontrols: number | null;
  dispossessed: number;
  
  // Physical Stats (Sofascore)
  physical: {
    distanceCovered: number | null; // total meters
    distancePerNinety: number | null; // meters per 90
    sprints: number | null;
    sprintsPerNinety: number | null;
    topSpeed: number | null; // km/h
    distanceBySpeed: {
      walking: number | null;
      jogging: number | null;
      running: number | null;
      sprinting: number | null;
    } | null;
  };
  
  // Discipline (API-Football)
  cards: {
    yellow: number;
    red: number;
    yellowRed: number;
  };
  fouls: {
    committed: number;
    drawn: number;
  };
  offsides: number | null;
  
  // Goalkeeper Specific (API-Football + FBref)
  goalkeeper: {
    saves: number | null;
    savePercentage: number | null;
    cleanSheets: number | null;
    goalsConceded: number | null;
    psxG: number | null; // Post-shot xG (FBref)
    psxgMinusGoalsAllowed: number | null; // Performance vs expectation (FBref)
  } | null;
  
  // Data Source Flags (for debugging/transparency)
  dataSources: {
    basicStats: 'api-football' | null;
    advancedStats: 'fbref' | null;
    physicalStats: 'sofascore' | null;
  };
  
  // Last Updated
  lastUpdated: string; // ISO timestamp
}

// API Response Types from API-Football
export interface APIFootballPlayerResponse {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
      date: string;
      place: string;
      country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  };
  statistics: APIFootballPlayerStatistics[];
}

export interface APIFootballPlayerStatistics {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  games: {
    appearences: number;
    lineups: number;
    minutes: number;
    number: number | null;
    position: string;
    rating: string;
    captain: boolean;
  };
  substitutes: {
    in: number;
    out: number;
    bench: number;
  };
  shots: {
    total: number;
    on: number;
  };
  goals: {
    total: number;
    conceded: number;
    assists: number;
    saves: number;
  };
  passes: {
    total: number;
    key: number;
    accuracy: number;
  };
  tackles: {
    total: number;
    blocks: number;
    interceptions: number;
  };
  duels: {
    total: number;
    won: number;
  };
  dribbles: {
    attempts: number;
    success: number;
    past: number;
  };
  fouls: {
    drawn: number;
    committed: number;
  };
  cards: {
    yellow: number;
    yellowred: number;
    red: number;
  };
  penalty: {
    won: number;
    commited: number;
    scored: number;
    missed: number;
    saved: number;
  };
}

// FBref Scraped Data Types
export interface FBrefPlayerData {
  playerId: string; // FBref player ID
  name: string;
  season: string;
  
  // Advanced metrics from FBref
  xG: number;
  xA: number;
  npxG: number;
  xGPerShot: number;
  shotCreatingActions: number;
  goalCreatingActions: number;
  progressivePasses: number;
  passesIntoPenaltyArea: number;
  passesIntoFinalThird: number;
  progressiveCarries: number;
  progressiveCarryingDistance: number;
  
  // Defensive
  pressures: number;
  successfulPressures: number;
  recoveries: number;
  
  // Goalkeeper
  psxG?: number;
  psxgMinusGA?: number;
}

// Sofascore Scraped Data Types
export interface SofascorePlayerData {
  playerId: string; // Sofascore player ID
  name: string;
  season: string;
  
  // Physical stats
  averageDistanceCovered: number; // meters per match
  totalSprints: number;
  averageSprintsPerMatch: number;
  topSpeed: number; // km/h
}

// Search/Filter Types
export interface PlayerSearchParams {
  name?: string;
  teamId?: number;
  leagueId?: number;
  season?: string;
  position?: string;
  page?: number;
  limit?: number;
}

export interface PlayerComparisonData {
  players: Player[];
  comparisonMetrics: string[]; // which stats to compare
}

// League and Team Types
export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  season: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  founded: number | null;
  venue: string | null;
}