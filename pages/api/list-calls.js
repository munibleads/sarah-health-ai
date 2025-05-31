export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.VAPI_PRIVATE_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Vapi API key not configured' });
    }

    // Fetch calls from Vapi API
    const response = await fetch('https://api.vapi.ai/call?limit=50', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Vapi API error: ${response.status}`);
    }

    const calls = await response.json();
    
    // Format the calls data for the frontend
    const formattedCalls = calls.map(call => ({
      id: call.id,
      type: call.type,
      status: call.status,
      startedAt: call.startedAt,
      endedAt: call.endedAt,
      duration: calculateDuration(call.startedAt, call.endedAt),
      cost: call.cost,
      endedReason: call.endedReason,
      hasTranscript: !!call.artifact?.transcript,
      transcriptPreview: call.artifact?.transcript?.substring(0, 100) + (call.artifact?.transcript?.length > 100 ? '...' : ''),
      messageCount: call.artifact?.messages?.length || 0
    }));

    return res.status(200).json(formattedCalls);

  } catch (error) {
    console.error('Error fetching calls:', error);
    return res.status(500).json({ error: 'Failed to fetch calls' });
  }
}

function calculateDuration(startedAt, endedAt) {
  if (!startedAt || !endedAt) return null;
  
  const start = new Date(startedAt);
  const end = new Date(endedAt);
  const durationMs = end - start;
  
  return {
    milliseconds: durationMs,
    seconds: Math.floor(durationMs / 1000),
    minutes: Math.round(durationMs / 1000 / 60 * 100) / 100
  };
} 