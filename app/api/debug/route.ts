export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY;
  
  return new Response(JSON.stringify({
    hasKey: !!apiKey,
    keyLength: apiKey?.length || 0,
    keyStart: apiKey?.substring(0, 6) || 'NONE',
    allEnvKeys: Object.keys(process.env).filter(k => k.includes('FOOTBALL')),
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
}