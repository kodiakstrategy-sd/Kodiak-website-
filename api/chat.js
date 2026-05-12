export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  console.log('Raw body:', JSON.stringify(req.body));
  console.log('Body type:', typeof req.body);

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch(e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  console.log('Anthropic response:', JSON.stringify(data));
  res.status(200).json(data);
}
