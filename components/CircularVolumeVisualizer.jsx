import { Mic, MicOff } from "lucide-react";

// Circular volume visualizer (keeping as backup)
export const CircularVolumeVisualizer = ({ level, isSpeaking }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (level * circumference);

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-emerald-500 transition-all duration-200"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {isSpeaking ? (
          <Mic className="w-8 h-8 text-emerald-600 animate-pulse" />
        ) : (
          <MicOff className="w-8 h-8 text-gray-400" />
        )}
      </div>
    </div>
  );
}; 