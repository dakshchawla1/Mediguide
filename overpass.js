export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'No query provided' });

    const servers = [
      'https://overpass-api.de/api/interpreter',
      'https://overpass.kumi.systems/api/interpreter',
      'https://overpass.openstreetmap.ru/api/interpreter'
    ];

    let lastError = null;
    for (const server of servers) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 18000);
        const response = await fetch(server, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'data=' + encodeURIComponent(query),
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (response.ok) {
          const data = await response.json();
          return res.status(200).json(data);
        }
      } catch (err) {
        lastError = err;
        continue;
      }
    }
    throw lastError || new Error('All servers failed');
  } catch (error) {
    return res.status(500).json({ error: 'Overpass proxy error: ' + error.message });
  }
}
