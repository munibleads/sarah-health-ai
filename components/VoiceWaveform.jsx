// Real-time voice waveform
export const VoiceWaveform = ({ level, isSpeaking }) => {
  const bars = Array.from({ length: 20 }, (_, i) => {
    const baseHeight = 4;
    const maxHeight = 40;
    const randomVariation = Math.sin(Date.now() * 0.005 + i * 0.5) * 0.3 + 0.7;
    const height = isSpeaking 
      ? baseHeight + (level * maxHeight * randomVariation)
      : baseHeight + Math.random() * 6;
    
    return {
      height: Math.max(baseHeight, Math.min(maxHeight, height)),
      delay: i * 0.1
    };
  });

  return (
    <div className="flex items-center justify-center space-x-1 h-16">
      {bars.map((bar, i) => (
        <div
          key={i}
          className={`w-1 bg-gradient-to-t from-emerald-400 to-emerald-600 rounded-full transition-all duration-150 ${
            isSpeaking ? 'animate-pulse' : ''
          }`}
          style={{
            height: `${bar.height}px`,
            animationDelay: `${bar.delay}s`
          }}
        />
      ))}
    </div>
  );
}; 