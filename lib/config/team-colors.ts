// File: /lib/config/team-colors.ts
// Manual configuration for team brand colors
// Update this file when teams are promoted/relegated

export interface TeamColorConfig {
  apiId: number; // API-Football team ID
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
}

/**
 * Premier League 2025-26 Team Colors
 * 
 * Sources:
 * - Official club brand guidelines
 * - teamcolorcodes.com
 * - Manual verification
 * 
 * Last updated: November 2025
 */
export const PREMIER_LEAGUE_COLORS_2025_26: TeamColorConfig[] = [
  // The Big 6
  {
    apiId: 42, // Arsenal
    name: 'Arsenal',
    primaryColor: '#EF0107',
    secondaryColor: '#FFFFFF',
    accentColor: '#063672',
  },
  {
    apiId: 49, // Chelsea
    name: 'Chelsea',
    primaryColor: '#034694',
    secondaryColor: '#FFFFFF',
    accentColor: '#ED1C24',
  },
  {
    apiId: 40, // Liverpool
    name: 'Liverpool',
    primaryColor: '#C8102E',
    secondaryColor: '#00B2A9',
    accentColor: '#F6EB61',
  },
  {
    apiId: 50, // Manchester City
    name: 'Manchester City',
    primaryColor: '#6CABDD',
    secondaryColor: '#1C2C5B',
    accentColor: '#FFFFFF',
  },
  {
    apiId: 33, // Manchester United
    name: 'Manchester United',
    primaryColor: '#DA291C',
    secondaryColor: '#FBE122',
    accentColor: '#000000',
  },
  {
    apiId: 47, // Tottenham Hotspur
    name: 'Tottenham Hotspur',
    primaryColor: '#132257',
    secondaryColor: '#FFFFFF',
  },
  
  // Challenging Pack
  {
    apiId: 66, // Aston Villa
    name: 'Aston Villa',
    primaryColor: '#670E36',
    secondaryColor: '#94BEE5',
    accentColor: '#FFD200',
  },
  {
    apiId: 34, // Newcastle United
    name: 'Newcastle United',
    primaryColor: '#241F20',
    secondaryColor: '#FFFFFF',
    accentColor: '#F39C12',
  },
  {
    apiId: 48, // West Ham United
    name: 'West Ham United',
    primaryColor: '#7A263A',
    secondaryColor: '#1BB1E7',
    accentColor: '#F3D459',
  },
  {
    apiId: 51, // Brighton & Hove Albion
    name: 'Brighton & Hove Albion',
    primaryColor: '#0057B8',
    secondaryColor: '#FFCD00',
    accentColor: '#FFFFFF',
  },
  
  // Mid-Table
  {
    apiId: 35, // AFC Bournemouth
    name: 'AFC Bournemouth',
    primaryColor: '#DA291C',
    secondaryColor: '#000000',
    accentColor: '#FFFFFF',
  },
  {
    apiId: 55, // Brentford
    name: 'Brentford',
    primaryColor: '#D20000',
    secondaryColor: '#FBB800',
    accentColor: '#000000',
  },
  {
    apiId: 52, // Crystal Palace
    name: 'Crystal Palace',
    primaryColor: '#1B458F',
    secondaryColor: '#C4122E',
    accentColor: '#A7A5A6',
  },
  {
    apiId: 45, // Everton
    name: 'Everton',
    primaryColor: '#003399',
    secondaryColor: '#FFFFFF',
  },
  {
    apiId: 36, // Fulham
    name: 'Fulham',
    primaryColor: '#FFFFFF',
    secondaryColor: '#000000',
    accentColor: '#CC0000',
  },
  {
    apiId: 65, // Nottingham Forest
    name: 'Nottingham Forest',
    primaryColor: '#DD0000',
    secondaryColor: '#FFFFFF',
  },
  {
    apiId: 39, // Wolverhampton Wanderers
    name: 'Wolverhampton Wanderers',
    primaryColor: '#FDB913',
    secondaryColor: '#000000',
  },
  
  // Promoted 2025-26
  {
    apiId: 43, // Burnley
    name: 'Burnley',
    primaryColor: '#6C1D45',
    secondaryColor: '#99D6EA',
  },
  {
    apiId: 46, // Leeds United
    name: 'Leeds United',
    primaryColor: '#FFCD00',
    secondaryColor: '#1D428A',
    accentColor: '#FFFFFF',
  },
  {
    apiId: 41, // Sunderland
    name: 'Sunderland',
    primaryColor: '#EB172B',
    secondaryColor: '#FFFFFF',
    accentColor: '#211E1E',
  },
];

/**
 * Get team colors by API ID
 */
export function getTeamColors(apiId: number): TeamColorConfig | undefined {
  return PREMIER_LEAGUE_COLORS_2025_26.find(team => team.apiId === apiId);
}

/**
 * Get all team API IDs for the current season
 */
export function getCurrentSeasonTeamIds(): number[] {
  return PREMIER_LEAGUE_COLORS_2025_26.map(team => team.apiId);
}

/**
 * Validate if a team is in the current season
 */
export function isCurrentSeasonTeam(apiId: number): boolean {
  return getCurrentSeasonTeamIds().includes(apiId);
}

/**
 * La Liga team colors (for future expansion)
 * Uncomment and populate when expanding to La Liga
 */
// export const LA_LIGA_COLORS_2025_26: TeamColorConfig[] = [
//   {
//     apiId: 529, // Barcelona
//     name: 'Barcelona',
//     primaryColor: '#A50044',
//     secondaryColor: '#004D98',
//   },
//   // ... add remaining 19 teams
// ];