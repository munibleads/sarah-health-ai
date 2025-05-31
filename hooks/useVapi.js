import { useEffect, useState } from "react";
import { ASSISTANT_ID, assistantOverrides } from "../config/assistantOptions";

export const useVapi = () => {
  const [vapi, setVapi] = useState(null);
  const [status, setStatus] = useState("Ready");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // New state for conversation tracking
  const [conversationData, setConversationData] = useState({
    messages: [],
    callId: null,
    startTime: null,
    endTime: null,
    transcript: []
  });

  // Initialize Vapi on client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoading(true);
      import("@vapi-ai/web").then((module) => {
        const Vapi = module.default;

        // Get API key from environment variables - only check once
        const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY || "";

        if (!apiKey) {
          setErrorMessage("API key is missing. Please check your environment variables.");
          setStatus("Error");
          setIsApiKeyValid(false);
          setIsLoading(false);
          return;
        }

        // Initialize Vapi
        const vapiInstance = new Vapi(apiKey);
        setVapi(vapiInstance);
        setIsApiKeyValid(true);
        setIsLoading(false);

        // Set up event listeners
        vapiInstance.on("call-start", (call) => {
          setIsConnecting(false);
          setIsConnected(true);
          setErrorMessage("");
          setStatus("Connected");
          
          // Initialize conversation data
          setConversationData({
            messages: [],
            callId: call?.id || null,
            startTime: new Date().toISOString(),
            endTime: null,
            transcript: [],
            extractedData: []
          });
        });

        vapiInstance.on("call-end", (call) => {
          setIsConnecting(false);
          setIsConnected(false);
          setStatus("Call ended");
          
          // Finalize conversation data
          setConversationData(prev => ({
            ...prev,
            endTime: new Date().toISOString(),
            callEndData: call
          }));
        });

        // Track messages
        vapiInstance.on("message", (message) => {
          setConversationData(prev => ({
            ...prev,
            messages: [...prev.messages, {
              ...message,
              timestamp: new Date().toISOString()
            }]
          }));
        });

        // Track transcript
        vapiInstance.on("transcript", (transcript) => {
          setConversationData(prev => ({
            ...prev,
            transcript: [...prev.transcript, {
              ...transcript,
              timestamp: new Date().toISOString()
            }]
          }));
        });



        vapiInstance.on("speech-start", () => {
          setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
          setIsSpeaking(false);
        });

        vapiInstance.on("volume-level", (level) => {
          setVolumeLevel(level);
        });

        vapiInstance.on("error", (error) => {
          console.error("Vapi error:", error);
          setIsConnecting(false);

          // Check if this is a normal call ending by the assistant
          const errorMessage = error?.error?.message || "";
          const isNormalEnding = errorMessage.includes("assistant ended the call") || 
                                errorMessage.includes("call ended by assistant") ||
                                errorMessage.includes("assistant hung up") ||
                                error?.reason === "assistant-ended" ||
                                error?.endedReason === "assistant-ended-call";

          if (isNormalEnding) {
            // This is expected behavior when AI completes the conversation
            setStatus("Call completed");
            setErrorMessage("");
            return;
          }

          // Handle actual errors
          if (error?.error?.message?.includes("card details")) {
            setErrorMessage("Payment required. Visit the Vapi dashboard to set up your payment method.");
          } else if (error?.error?.statusCode === 401 || error?.error?.statusCode === 403) {
            // API key is invalid - update state
            setErrorMessage("API key is invalid. Please check your environment variables.");
            setIsApiKeyValid(false);
          } else {
            setErrorMessage(error?.error?.message || "An error occurred");
          }

          setStatus("Error");
        });
      });
    }

    // Cleanup function
    return () => {
      if (vapi) {
        vapi.stop();
      }
    };
  }, []);

  // Start call function - no need to recheck API key
  const startCall = () => {
    if (!isApiKeyValid) {
      setErrorMessage("Cannot start call: API key is invalid or missing.");
      return;
    }

    setIsConnecting(true);
    setStatus("Connecting...");
    setErrorMessage("");

    vapi.start(ASSISTANT_ID, assistantOverrides);
  };

  // End call function
  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  // Save conversation data to JSON
  const saveConversationToJSON = () => {
    const dataStr = JSON.stringify(conversationData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conversation_${conversationData.callId || Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Clear conversation data
  const clearConversationData = () => {
    setConversationData({
      messages: [],
      callId: null,
      startTime: null,
      endTime: null,
      transcript: []
    });
  };

  return {
    status,
    isConnecting,
    isConnected,
    isSpeaking,
    volumeLevel,
    errorMessage,
    isApiKeyValid,
    isLoading,
    conversationData,
    startCall,
    endCall,
    saveConversationToJSON,
    clearConversationData,
  };
}; 