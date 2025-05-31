export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { callId } = req.query;

  if (!callId) {
    return res.status(400).json({ error: 'Call ID is required' });
  }

  try {
    const apiKey = process.env.VAPI_PRIVATE_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Vapi API key not configured' });
    }

    // Fetch call data from Vapi
    const response = await fetch(`https://api.vapi.ai/call/${callId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Vapi API error: ${response.status}`);
    }

    const callData = await response.json();
    
    // Extract patient information from transcript
    const transcript = callData.artifact?.transcript || '';
    const messages = callData.artifact?.messages || [];
    
    const extractedData = extractPatientInfo(transcript, messages);
    
    // Format the complete call details
    const callDetails = {
      id: callData.id,
      type: callData.type,
      status: callData.status,
      startedAt: callData.startedAt,
      endedAt: callData.endedAt,
      duration: calculateDuration(callData.startedAt, callData.endedAt),
      cost: callData.cost,
      costBreakdown: callData.costBreakdown,
      endedReason: callData.endedReason,
      transcript: transcript,
      messages: messages,
      extractedPatientInfo: extractedData,
      analysis: callData.analysis,
      assistantId: callData.assistantId,
      phoneNumberId: callData.phoneNumberId,
      artifact: {
        recordingUrl: callData.artifact?.recordingUrl,
        stereoRecordingUrl: callData.artifact?.stereoRecordingUrl,
        pcapUrl: callData.artifact?.pcapUrl
      }
    };

    return res.status(200).json(callDetails);

  } catch (error) {
    console.error('Error fetching call details:', error);
    return res.status(500).json({ error: 'Failed to fetch call details' });
  }
}

function extractPatientInfo(transcript, messages) {
  const extracted = {
    name: null,
    age: null,
    symptoms: [],
    medicalConditions: [],
    familyHistory: {
      familyCancerHistory: false,
      relativesWithCancer: []
    },
    contactInfo: {},
    riskFactors: [],
    notes: transcript
  };

  if (!transcript) return extracted;

  // Simple regex patterns to extract information
  const text = transcript.toLowerCase();
  
  // Extract name (basic patterns)
  const namePatterns = [
    /my name is ([a-zA-Z\s]+)/i,
    /i'm ([a-zA-Z\s]+)/i,
    /this is ([a-zA-Z\s]+)/i,
    /call me ([a-zA-Z\s]+)/i
  ];
  
  for (const pattern of namePatterns) {
    const match = transcript.match(pattern);
    if (match) {
      extracted.name = match[1].trim();
      break;
    }
  }
  
  // Extract age
  const agePatterns = [
    /i'm (\d+) years old/i,
    /i am (\d+) years old/i,
    /(\d+) years old/i,
    /age (\d+)/i
  ];
  
  for (const pattern of agePatterns) {
    const match = text.match(pattern);
    if (match) {
      extracted.age = parseInt(match[1]);
      break;
    }
  }
  
  // Extract symptoms (common cancer-related symptoms)
  const symptomKeywords = [
    'pain', 'lump', 'fatigue', 'weight loss', 'fever', 'cough', 
    'difficulty swallowing', 'shortness of breath', 'headache', 
    'nausea', 'vomiting', 'bleeding', 'bruising', 'swelling'
  ];
  
  for (const symptom of symptomKeywords) {
    if (text.includes(symptom)) {
      extracted.symptoms.push(symptom);
    }
  }
  
  // Extract family history
  if (text.includes('family') && (text.includes('cancer') || text.includes('tumor'))) {
    extracted.familyHistory.familyCancerHistory = true;
    
    const relatives = ['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather'];
    for (const relative of relatives) {
      if (text.includes(relative) && text.includes('cancer')) {
        extracted.familyHistory.relativesWithCancer.push(relative);
      }
    }
  }
  
  // Extract risk factors
  const riskFactors = ['smoking', 'alcohol', 'radiation', 'chemicals'];
  for (const risk of riskFactors) {
    if (text.includes(risk)) {
      extracted.riskFactors.push(risk);
    }
  }
  
  return extracted;
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