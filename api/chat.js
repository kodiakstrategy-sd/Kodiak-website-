export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const rawBody = await new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data));
  });

  console.log('Raw body:', rawBody.slice(0, 100));

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: rawBody
  });

  const data = await response.json();
  console.log('Anthropic response:', JSON.stringify(data).slice(0, 200));
  res.status(200).json(data);
}
