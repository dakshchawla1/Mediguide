export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, temperature, max_tokens } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array required' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY not set in Vercel Environment Variables' });
  }

  // Try models in order — if one fails try next
  const models = [
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b',
    'qwen/qwen3.6-27b',
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant'
  ];

  let lastError = null;

  for (const model of models) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: temperature !== undefined ? temperature : 0,
          max_tokens: max_tokens || 1000
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Add which model was used so frontend can show it
        data._model_used = model;
        return res.status(200).json(data);
      }

      const errText = await response.text();
      console.warn(`Model ${model} failed with ${response.status}:`, errText.substring(0, 100));
      lastError = `${model} → ${response.status}: ${errText.substring(0, 80)}`;
      // Continue to next model

    } catch (err) {
      console.warn(`Model ${model} threw error:`, err.message);
      lastError = err.message;
      // Continue to next model
    }
  }

  // All models failed
  console.error('All Groq models failed. Last error:', lastError);
  return res.status(500).json({
    error: 'All AI models unavailable. Last error: ' + lastError
  });
}
