export async function GET() {
  const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY;
  const BASE_URL = 'https://v3.football.api-sports.io';
  
  // Test: Get Premier League top scorers from 2023 season
  const url = `${BASE_URL}/players/topscorers?league=39&season=2023`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY || '',
      },
    });

    const data = await response.json();
    
    return new Response(JSON.stringify({
      success: response.ok,
      status: response.status,
      message: response.ok ? '✅ API Working!' : '❌ API Failed',
      results: data.results || 0,
      topScorer: data.response?.[0] ? {
        name: data.response[0].player.name,
        team: data.response[0].statistics[0].team.name,
        goals: data.response[0].statistics[0].goals.total,
      } : null,
      samplePlayers: data.response?.slice(0, 5).map((p: { player: { name: string }, statistics: Array<{ team: { name: string }, goals: { total: number } }> }) => ({
        name: p.player.name,
        team: p.statistics[0].team.name,
        goals: p.statistics[0].goals.total,
      })) || [],
    }, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}