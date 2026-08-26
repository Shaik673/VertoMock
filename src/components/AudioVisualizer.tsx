import React from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  isAiSpeaking?: boolean;
  barCount?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isActive,
  isAiSpeaking = false,
  barCount = 18
}) => {
  return (
    <div className="flex items-center justify-center gap-1 h-8 px-2">
      {Array.from({ length: barCount }).map((_, index) => {
        // dynamic staggered height animation
        const delay = (index % 6) * 0.15;
        const baseHeight = isActive ? Math.max(6, (index % 5 + 1) * 5) : 4;
        
        return (
          <div
            key={index}
            style={{
              animationDelay: `${delay}s`,
              height: isActive ? `${baseHeight}px` : '4px'
            }}
            className={`w-1 rounded-full transition-all duration-150 ${
              isActive
                ? isAiSpeaking
                  ? 'bg-gradient-to-t from-cyan-500 to-blue-500 sound-wave-bar'
                  : 'bg-gradient-to-t from-emerald-500 to-teal-400 sound-wave-bar'
                : 'bg-slate-300 dark:bg-slate-700'
            }`}
          />
        );
      })}
    </div>
  );
};
