import { getClinicalSymptomTriage } from '../server.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { symptom, language } = req.body || {};
  if (!symptom) return res.status(400).json({ error: 'Symptom description required' });

  const result = getClinicalSymptomTriage(symptom, language || 'en');
  return res.status(200).json(result);
}
