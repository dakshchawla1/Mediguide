import { getClinicalMedicineData } from '../server.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  const query = req.query.q || '';
  if (!query) return res.status(400).json({ error: 'Medicine query required' });

  const result = getClinicalMedicineData(query);
  return res.status(200).json(result);
}
