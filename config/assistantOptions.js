// Voice AI Workshop - Assistant Configuration
// Replace with your own assistant ID from Vapi dashboard
export const ASSISTANT_ID = "enter your assistant id here";

export const assistantOverrides = {
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
  },
  voice: {
    provider: "playht",
    voiceId: "jennifer", // Change to your preferred voice
  },
  recordingEnabled: true,
  model: {
    provider: "openai",
    model: "gpt-4",
  },
  // Remove or update serverUrl if you don't have a webhook endpoint
  // serverUrl: "https://your-webhook-url.com/api/vapi-webhook",
  
  // Add any variable values if your assistant uses templates
  variableValues: {
    assistantName: "AI Assistant" // Update this to match your assistant's name
  },
};

// Example: Alternative assistant configuration
// You can switch between different assistant configurations
export const alternativeAssistantOptions = {
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
  },
  voice: {
    provider: "11labs", // Try different providers
    voiceId: "pNInz6obpgDQGcFmaJgB", // Example 11labs voice ID
  },
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo", // More cost-effective option
  },
  recordingEnabled: false,
  variableValues: {
    assistantName: "Workshop Assistant"
  },
};

// Legacy configuration template - use this for inline assistant definition
export const inlineAssistantTemplate = {
  name: "Workshop AI Assistant",
  firstMessage: "Hello! I'm your AI assistant. How can I help you today?",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
  },
  voice: {
    provider: "playht",
    voiceId: "jennifer",
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a helpful AI assistant for a voice AI workshop.

Your job is to demonstrate voice AI capabilities and help users understand how voice assistants work.

Your key responsibilities:
1) Greet users warmly and ask how you can help
2) Answer questions about voice AI technology
3) Demonstrate natural conversation flow
4) Be helpful and informative
5) Keep responses concise but informative

Important guidelines:
- Keep responses under 30 seconds when spoken
- Be friendly and conversational
- Ask follow-up questions to keep the conversation engaging
- If you don't know something, be honest about it
- End the conversation naturally when the user seems satisfied

Communication style:
- Be warm and professional
- Use clear, easy-to-understand language
- Speak at a natural pace
- Show enthusiasm for helping

Remember: You're demonstrating the power of voice AI technology!`,
      },
    ],
  },
}; 