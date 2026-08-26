import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  CornerDownLeft, 
  LogOut,
  Layers,
  Code2,
  Brain,
  Shield,
  Bot
} from 'lucide-react';
import { useInterview } from '../context/InterviewContext';
import { useAuth } from '../context/AuthContext';
import { AudioVisualizer } from '../components/AudioVisualizer';
import { WebcamFeed } from '../components/WebcamFeed';

interface InterviewRoomPageProps {
  onComplete: (sessionId: string) => void;
  onSwitchToCoding: () => void;
  onSwitchToSystemDesign: () => void;
}

export const InterviewRoomPage: React.FC<InterviewRoomPageProps> = ({
  onComplete,
  onSwitchToCoding,
  onSwitchToSystemDesign
}) => {
  const { user } = useAuth();
  const {
    currentSession,
    isAiSpeaking,
    isListening,
    isCameraActive,
    isMicActive,
    isEvaluating,
    transcript,
    interviewerText,
    mediaStream,
    timeRemainingSeconds,
    toggleListening,
    toggleCamera,
    toggleMic,
    submitCurrentAnswer,
    endInterview,
    speakInterviewerPrompt,
    stopAiSpeech,
    setTranscript
  } = useInterview();

  const [textInput, setTextInput] = useState<string>('');
  const [activeInputMode, setActiveInputMode] = useState<'voice' | 'text'>('voice');

  if (!currentSession) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-slate-400" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
          No Active Interview Session Found
        </h3>
        <p className="text-sm text-slate-500 max-w-sm">
          Please configure and start an interview from the Mock Interview tab.
        </p>
      </div>
    );
  }

  const currentQ = currentSession.questions[currentSession.currentQuestionIndex];
  const totalQuestions = currentSession.questions.length;
  const currentQIndex = currentSession.currentQuestionIndex + 1;

  // Format timer MM:SS
  const mins = Math.floor(timeRemainingSeconds / 60);
  const secs = timeRemainingSeconds % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const handleSubmit = async () => {
    const finalAnswer = activeInputMode === 'text' ? textInput : (transcript || textInput);
    if (!finalAnswer.trim()) {
      alert('Please provide an answer before submitting.');
      return;
    }

    await submitCurrentAnswer(finalAnswer);
    setTextInput('');
  };

  const handleEndEarly = async () => {
    if (confirm('Are you sure you want to end the interview early and generate your final assessment report?')) {
      const completed = await endInterview();
      if (completed) {
        onComplete(completed.sessionId);
      }
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Session Progress Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {currentSession.targetRole} • {currentSession.interviewType.toUpperCase()}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Session ID: {currentSession.sessionId}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Round switch shortcuts if full mock */}
          {currentSession.interviewType === 'full-mock' && (
            <div className="hidden md:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={onSwitchToCoding}
                className="px-2.5 py-1 rounded-lg font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 flex items-center gap-1"
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Coding Round</span>
              </button>
              <button
                onClick={onSwitchToSystemDesign}
                className="px-2.5 py-1 rounded-lg font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 flex items-center gap-1"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-500" />
                <span>System Design</span>
              </button>
            </div>
          )}

          {/* Time Remaining */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{formattedTime}</span>
          </div>

          <button
            onClick={handleEndEarly}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Finish Interview</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Interviewer & Camera / Right Question & Answer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI Avatar, Status & Proctoring Feed (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* AI Interviewer Avatar Card */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>AI Technical Interviewer</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                {isAiSpeaking ? (
                  <button
                    onClick={stopAiSpeech}
                    className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                    title="Mute AI voice"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => currentQ && speakInterviewerPrompt(currentQ.text)}
                    className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                    title="Repeat question audio"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
                
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isAiSpeaking
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 animate-pulse'
                    : isListening
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isAiSpeaking ? 'Speaking...' : isListening ? 'Listening to you' : 'Idle'}
                </span>
              </div>
            </div>

            {/* AI Visual Avatar Circle */}
            <div className="flex flex-col items-center justify-center py-4 space-y-3">
              <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                isAiSpeaking
                  ? 'ring-4 ring-cyan-400/50 bg-gradient-to-tr from-cyan-600 to-blue-600 scale-105 shadow-xl shadow-cyan-500/20'
                  : 'bg-gradient-to-tr from-indigo-800 to-slate-800 ring-2 ring-slate-700'
              }`}>
                <Brain className={`w-12 h-12 text-white ${isAiSpeaking ? 'animate-bounce' : ''}`} />
                {isAiSpeaking && (
                  <div className="absolute -bottom-2">
                    <AudioVisualizer isActive={true} isAiSpeaking={true} barCount={12} />
                  </div>
                )}
              </div>

              <div className="text-center max-w-xs">
                <p className="text-xs text-slate-300 font-medium line-clamp-3 italic">
                  "{interviewerText || currentQ?.text || 'Ready for your response...'}"
                </p>
              </div>
            </div>
          </div>

          {/* Candidate Webcam Video Stream */}
          <WebcamFeed
            mediaStream={mediaStream}
            isCameraActive={isCameraActive}
            isMicActive={isMicActive}
            isListening={isListening}
            candidateName={user?.fullName || 'Candidate'}
            onToggleCamera={toggleCamera}
            onToggleMic={toggleMic}
          />
        </div>

        {/* Right Column: Question Panel & Interactive Answer Pad (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Question Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 font-mono">
                  Question {currentQIndex} / {totalQuestions}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {currentQ?.category || 'Technical'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {currentQ?.isFollowUp && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center gap-1 animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    Dynamic Follow-Up
                  </span>
                )}
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {currentQ?.topic}
                </span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ?.text}
            </h3>

            {/* Expected core discussion points (hints) */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Interviewer Assessment Focus
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(currentQ?.evaluationCriteria || ['Correctness', 'Depth', 'Communication']).map((crit, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800"
                  >
                    • {crit}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Answer Workspace */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            {/* Input Mode Tabs & Audio Indicator */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveInputMode('voice')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    activeInputMode === 'voice'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Voice Answer</span>
                </button>
                <button
                  onClick={() => setActiveInputMode('text')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    activeInputMode === 'text'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>Type / Edit Text</span>
                </button>
              </div>

              {activeInputMode === 'voice' && (
                <div className="flex items-center gap-2">
                  <AudioVisualizer isActive={isListening} barCount={10} />
                  <button
                    id="mic-record-toggle-btn"
                    onClick={toggleListening}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isListening
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 animate-pulse'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                    }`}
                  >
                    {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isListening ? 'Stop Recording' : 'Start Speaking'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Answer Content Display / Editor */}
            <div className="space-y-2">
              <div className="relative">
                <textarea
                  id="candidate-answer-textarea"
                  value={activeInputMode === 'voice' ? transcript : textInput}
                  onChange={(e) => {
                    if (activeInputMode === 'voice') setTranscript(e.target.value);
                    else setTextInput(e.target.value);
                  }}
                  placeholder={
                    activeInputMode === 'voice'
                      ? isListening
                        ? 'Listening to your voice... Speak clearly into your microphone.'
                        : 'Click "Start Speaking" or type your response here...'
                      : 'Type your detailed answer here. Structure your answer with core principles, architectural trade-offs, and edge-cases...'
                  }
                  rows={6}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                />
              </div>

              {/* Live Answer Word & Fluency Stats */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span>
                  Words: {((activeInputMode === 'voice' ? transcript : textInput).trim().split(/\s+/).filter(Boolean).length)}
                </span>
                <span>Press Submit to trigger dynamic AI evaluation & follow-ups</span>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setTranscript('');
                  setTextInput('');
                }}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
              >
                Clear Input
              </button>

              <button
                id="submit-answer-btn"
                disabled={isEvaluating}
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-indigo-600/25 transition-transform active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isEvaluating ? 'AI Evaluating Answer...' : 'Submit Answer & Continue'}</span>
              </button>
            </div>
          </div>

          {/* Previous Evaluated Answer Breakdown (if any in session) */}
          {currentSession.answers.length > 0 && (
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Last Answer Evaluation Score: {currentSession.answers[currentSession.answers.length - 1].scores.overall}/100</span>
                </span>
                <span className="font-bold text-indigo-500 uppercase tracking-wider text-[10px]">
                  {currentSession.answers[currentSession.answers.length - 1].classification}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {currentSession.answers[currentSession.answers.length - 1].idealAnswerSummary}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
