import React, { useEffect, useRef } from 'react';
import { Camera, CameraOff, Mic, MicOff, Shield } from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';

interface WebcamFeedProps {
  mediaStream: MediaStream | null;
  isCameraActive: boolean;
  isMicActive: boolean;
  isListening: boolean;
  candidateName: string;
  onToggleCamera: () => void;
  onToggleMic: () => void;
}

export const WebcamFeed: React.FC<WebcamFeedProps> = ({
  mediaStream,
  isCameraActive,
  isMicActive,
  isListening,
  candidateName,
  onToggleCamera,
  onToggleMic
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && mediaStream && isCameraActive) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream, isCameraActive]);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-lg flex flex-col items-center justify-center">
      {isCameraActive && mediaStream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-slate-400 p-6">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
            <CameraOff className="w-7 h-7 text-slate-500" />
          </div>
          <p className="text-xs font-medium text-slate-400">Camera is turned off</p>
        </div>
      )}

      {/* Face tracking simulation frame */}
      {isCameraActive && (
        <div className="absolute inset-8 border border-cyan-500/30 rounded-2xl pointer-events-none flex flex-col justify-between p-2">
          <div className="flex justify-between">
            <div className="w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          </div>
          <div className="flex justify-between">
            <div className="w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
          </div>
        </div>
      )}

      {/* Top status bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Live Feed</span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-slate-300 font-mono">
          <Shield className="w-3 h-3 text-cyan-400" />
          <span>Proctored</span>
        </div>
      </div>

      {/* Bottom overlay: Candidate Name & Controls */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white">
            {candidateName} (You)
          </span>
          {isListening && (
            <div className="hidden sm:block">
              <AudioVisualizer isActive={true} barCount={8} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleMic}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              isMicActive
                ? 'bg-slate-700/80 text-white hover:bg-slate-600'
                : 'bg-rose-500/80 text-white hover:bg-rose-600'
            }`}
            title={isMicActive ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {isMicActive ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onToggleCamera}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              isCameraActive
                ? 'bg-slate-700/80 text-white hover:bg-slate-600'
                : 'bg-rose-500/80 text-white hover:bg-rose-600'
            }`}
            title={isCameraActive ? 'Turn off camera' : 'Turn on camera'}
          >
            {isCameraActive ? <Camera className="w-3.5 h-3.5" /> : <CameraOff className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
