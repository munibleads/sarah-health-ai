"use client"

import { Mic, MicOff } from "lucide-react";
import { useVapi } from "../hooks/useVapi";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { VoiceWaveform } from "../components/VoiceWaveform";

export default function VoiceAIAssistant() {
  const {
    status,
    isConnecting,
    isConnected,
    isSpeaking,
    volumeLevel,
    errorMessage,
    isApiKeyValid,
    isLoading,
    startCall,
    endCall,
  } = useVapi();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-blue-300/30 to-green-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      ></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex flex-col items-center justify-center pt-12 pb-8 md:pt-16 md:pb-12 space-y-1">
          <div className="px-8 py-4">
            <div className="flex items-center space-x-3 group">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 group-hover:text-teal-700 transition-colors duration-200">
                AI Assistant
              </h1>
            </div>
          </div>
          
          {/* Subtitle */}
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-teal-100/80 to-blue-100/80 backdrop-blur-sm border border-teal-200/50">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 animate-pulse"></div>
              <p className="text-xs font-medium text-gray-700">
                Voice AI Workshop Demo
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 pb-8">
          {isLoading ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12 max-w-md w-full">
              <LoadingSkeleton />
            </div>
          ) : (
            <div className="p-8 md:p-12 max-w-md w-full space-y-8">
              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50/80 backdrop-blur-md border border-red-200/50 text-red-700 px-6 py-4 rounded-2xl text-center shadow-lg animate-pulse">
                  <p className="text-sm font-medium">{errorMessage}</p>
                  {errorMessage.includes("payment") && (
                    <a
                      href="https://dashboard.vapi.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-red-600 underline text-sm hover:text-red-800 transition-colors duration-200"
                    >
                      Go to Vapi Dashboard
                    </a>
                  )}
                </div>
              )}

              {/* Status and Volume Indicator */}
              {isConnected && (
                <div className="bg-emerald-50/80 backdrop-blur-md border border-emerald-200/50 text-emerald-700 px-6 py-6 rounded-2xl text-center space-y-4 shadow-lg">
                  <p className="text-sm font-medium">
                    {isSpeaking ? "Assistant is speaking..." : "Assistant is listening..."}
                  </p>
                  
                  {/* Real-time Voice Waveform */}
                  <div className="flex justify-center">
                    <VoiceWaveform level={volumeLevel} isSpeaking={isSpeaking} />
                  </div>
                  
                  {/* Mic icon indicator */}
                  <div className="flex justify-center">
                    {isSpeaking ? (
                      <Mic className="w-6 h-6 text-emerald-600 animate-pulse" />
                    ) : (
                      <MicOff className="w-6 h-6 text-emerald-500" />
                    )}
                  </div>
                </div>
              )}

              {/* Call Button */}
              <div className="flex justify-center">
                <button
                  onClick={isConnected ? endCall : startCall}
                  disabled={isConnecting || !isApiKeyValid}
                  className={`
                    group relative overflow-hidden font-semibold text-lg text-white border-none rounded-full 
                    px-8 py-4 md:px-10 md:py-5 flex items-center justify-center space-x-3 shadow-lg
                    transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                    focus:outline-none focus:ring-4 focus:ring-opacity-50
                    min-h-[60px] md:min-h-[70px] min-w-[200px] md:min-w-[240px]
                    ${isConnected 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-300' 
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:ring-emerald-300'
                    }
                    ${(isConnecting || !isApiKeyValid) ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-lg' : 'cursor-pointer'}
                    ${isConnected ? 'animate-pulse' : ''}
                  `}
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Phone Icon */}
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7 relative z-10 group-hover:rotate-12 transition-transform duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      fill="currentColor"
                    />
                  </svg>
                  
                  <span className="relative z-10">
                    {isConnecting ? "Connecting..." : isConnected ? "End Call" : "Start Voice Chat"}
                  </span>
                </button>
              </div>


            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/20 bg-white/20 backdrop-blur-lg px-4 md:px-8 py-6 md:py-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-700 font-medium">
              Voice AI Workshop Template © 2025
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 md:space-x-8">              
              <a
                href="https://docs.vapi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 hover:underline font-medium"
              >
                Vapi Docs
              </a>
              <a
                href="https://dashboard.vapi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 hover:underline font-medium"
              >
                Dashboard
              </a>
              <a
                href="https://github.com/VapiAI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 hover:underline font-medium"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
