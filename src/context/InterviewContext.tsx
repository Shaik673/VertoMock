import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  InterviewSession, 
  InterviewType, 
  TargetRole, 
  DifficultyLevel, 
  ExperienceLevel, 
  QuestionItem, 
  AnswerEvaluation,
  CodingProblem,
  CodeEvaluationResult,
  SystemDesignProblem
} from '../types';
import { getQuestionsByRoleAndType } from '../data/questionBank';
import { CODING_PROBLEMS } from '../data/codingProblems';
import { SYSTEM_DESIGN_PROBLEMS } from '../data/systemDesignProblems';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

interface InterviewContextType {
  currentSession: InterviewSession | null;
  isInterviewActive: boolean;
  isAiSpeaking: boolean;
  isListening: boolean;
  isCameraActive: boolean;
  isMicActive: boolean;
  isEvaluating: boolean;
  transcript: string;
  interviewerText: string;
  mediaStream: MediaStream | null;
  timeRemainingSeconds: number;
  startInterview: (config: {
    targetRole: TargetRole;
    interviewType: InterviewType;
    difficulty: DifficultyLevel;
    experienceLevel: ExperienceLevel;
    durationMinutes: number;
    questionCount: number;
    resumeId?: string;
  }) => Promise<void>;
  toggleListening: () => void;
  toggleCamera: () => void;
  toggleMic: () => void;
  submitCurrentAnswer: (textAnswer?: string) => Promise<void>;
  submitCodeSolution: (code: string, language: 'javascript' | 'python' | 'cpp' | 'java') => Promise<CodeEvaluationResult>;
  submitSystemDesign: (notes: string, components: string[], nodes: any[]) => Promise<any>;
  endInterview: () => Promise<InterviewSession | null>;
  speakInterviewerPrompt: (text: string) => void;
  stopAiSpeech: () => void;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, resume, saveInterviewSession } = useAuth();

  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(null);
  const [isInterviewActive, setIsInterviewActive] = useState<boolean>(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true);
  const [isMicActive, setIsMicActive] = useState<boolean>(true);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [interviewerText, setInterviewerText] = useState<string>('');
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(1800);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const timerIntervalRef = useRef<any>(null);

  // Initialize Web Speech API for voice interviews
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(prev => {
            // Append or update smoothly
            return currentTranscript;
          });
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition status:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, []);

  // Timer effect during active interview
  useEffect(() => {
    if (isInterviewActive && timeRemainingSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [isInterviewActive, timeRemainingSeconds]);

  // Request Camera & Mic media stream
  const initMediaStream = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 } },
          audio: true
        });
        setMediaStream(stream);
        setIsCameraActive(true);
        setIsMicActive(true);
      }
    } catch (err) {
      console.warn('Could not access camera/mic stream:', err);
    }
  };

  const stopMediaStream = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  };

  const speakInterviewerPrompt = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const cleanText = text.replace(/[*#`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick natural voice if available
    const voices = synthRef.current.getVoices();
    const naturalVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel')) && v.lang.startsWith('en'));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => setIsAiSpeaking(true);
    utterance.onend = () => setIsAiSpeaking(false);
    utterance.onerror = () => setIsAiSpeaking(false);

    synthRef.current.speak(utterance);
    setInterviewerText(text);
  };

  const stopAiSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsAiSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. You can type your answer in the text area below!');
      return;
    }

    if (isListening) {
      try { recognitionRef.current.stop(); } catch {}
      setIsListening(false);
    } else {
      stopAiSpeech();
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  const toggleCamera = () => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraActive(prev => !prev);
    }
  };

  const toggleMic = () => {
    if (mediaStream) {
      const audioTracks = mediaStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicActive(prev => !prev);
    }
  };

  const startInterview = async (config: {
    targetRole: TargetRole;
    interviewType: InterviewType;
    difficulty: DifficultyLevel;
    experienceLevel: ExperienceLevel;
    durationMinutes: number;
    questionCount: number;
    resumeId?: string;
  }) => {
    setIsEvaluating(true);
    await initMediaStream();

    // 1. Generate or fetch questions
    let questions: QuestionItem[] = [];
    try {
      questions = await api.generateQuestions(
        config.targetRole,
        config.interviewType,
        config.difficulty,
        config.experienceLevel,
        config.questionCount,
        resume?.rawText
      );
    } catch {
      // Fallback
    }

    if (!questions || questions.length === 0) {
      questions = getQuestionsByRoleAndType(
        config.targetRole,
        config.interviewType,
        config.questionCount,
        resume?.skills || []
      );
    }

    // Attach coding or system design problem if relevant
    let codingProblem: CodingProblem | undefined;
    let systemDesignProblem: SystemDesignProblem | undefined;

    if (config.interviewType === 'coding' || config.interviewType === 'full-mock') {
      codingProblem = CODING_PROBLEMS[0]; // Two Sum or LRU Cache
    }
    if (config.interviewType === 'system-design' || config.interviewType === 'full-mock') {
      systemDesignProblem = SYSTEM_DESIGN_PROBLEMS[0]; // URL shortener
    }

    const newSession: InterviewSession = {
      sessionId: `session-${Date.now()}`,
      userId: user?.id || 'guest',
      interviewType: config.interviewType,
      targetRole: config.targetRole,
      difficulty: config.difficulty,
      experienceLevel: config.experienceLevel,
      durationMinutes: config.durationMinutes,
      questionCount: questions.length,
      resumeId: config.resumeId || resume?.id,
      questions,
      currentQuestionIndex: 0,
      answers: [],
      codingProblem,
      systemDesignProblem,
      status: 'in_progress',
      startedAt: new Date().toISOString()
    };

    setCurrentSession(newSession);
    setIsInterviewActive(true);
    setTimeRemainingSeconds(config.durationMinutes * 60);
    setTranscript('');
    setIsEvaluating(false);

    // Initial greeting and question vocalization
    const firstQ = questions[0];
    if (firstQ) {
      const greeting = `Welcome ${user?.fullName || 'Candidate'}. I am your AI Interviewer today for the ${config.targetRole} role. Let's begin with our first question: ${firstQ.text}`;
      speakInterviewerPrompt(greeting);
    }
  };

  const submitCurrentAnswer = async (textAnswer?: string) => {
    if (!currentSession) return;
    const answerContent = (textAnswer || transcript).trim();
    if (!answerContent) {
      alert('Please provide an answer either verbally or by typing before submitting.');
      return;
    }

    if (isListening && recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      setIsListening(false);
    }

    setIsEvaluating(true);
    const currQ = currentSession.questions[currentSession.currentQuestionIndex];

    try {
      const evalResult = await api.evaluateAnswer(currQ, answerContent);

      const updatedAnswers = [...currentSession.answers, evalResult];
      let updatedQuestions = [...currentSession.questions];

      // Dynamic follow-up handling
      if (evalResult.followUpRequired && evalResult.generatedFollowUp && !currQ.isFollowUp) {
        // Insert follow-up question right after current question
        updatedQuestions.splice(currentSession.currentQuestionIndex + 1, 0, evalResult.generatedFollowUp);
      }

      const nextIndex = currentSession.currentQuestionIndex + 1;
      const isComplete = nextIndex >= updatedQuestions.length;

      const updatedSession: InterviewSession = {
        ...currentSession,
        answers: updatedAnswers,
        questions: updatedQuestions,
        currentQuestionIndex: isComplete ? currentSession.currentQuestionIndex : nextIndex,
        status: isComplete ? 'completed' : 'in_progress'
      };

      setCurrentSession(updatedSession);
      setTranscript('');
      setIsEvaluating(false);

      if (isComplete) {
        // Automatically wrap up session and build report
        await finishSession(updatedSession);
      } else {
        const nextQ = updatedQuestions[nextIndex];
        const transition = evalResult.classification === 'excellent' 
          ? `Great explanation! Now, moving on to our next question: ${nextQ.text}`
          : (evalResult.classification === 'partially_correct' 
            ? `Thank you. Let's explore this further: ${nextQ.text}`
            : `Understood. Next question: ${nextQ.text}`);
        speakInterviewerPrompt(transition);
      }
    } catch (err) {
      console.error('Answer evaluation error:', err);
      setIsEvaluating(false);
    }
  };

  const submitCodeSolution = async (code: string, language: 'javascript' | 'python' | 'cpp' | 'java'): Promise<CodeEvaluationResult> => {
    if (!currentSession?.codingProblem) {
      throw new Error('No active coding problem found in current session');
    }

    setIsEvaluating(true);
    try {
      const codeEval = await api.evaluateCode(currentSession.codingProblem, language, code);
      const updatedSession: InterviewSession = {
        ...currentSession,
        codingSubmission: codeEval
      };
      setCurrentSession(updatedSession);
      setIsEvaluating(false);
      return codeEval;
    } catch (err) {
      setIsEvaluating(false);
      throw err;
    }
  };

  const submitSystemDesign = async (notes: string, components: string[], nodes: any[]) => {
    if (!currentSession?.systemDesignProblem) {
      throw new Error('No system design problem active');
    }

    setIsEvaluating(true);
    try {
      const evalData = await api.evaluateSystemDesign(currentSession.systemDesignProblem, notes, components, nodes);
      setIsEvaluating(false);
      return evalData;
    } catch (err) {
      setIsEvaluating(false);
      throw err;
    }
  };

  const finishSession = async (sessionToFinalize: InterviewSession): Promise<InterviewSession> => {
    setIsEvaluating(true);
    stopAiSpeech();
    stopMediaStream();

    const reportData = await api.generateReport(sessionToFinalize);
    const completedSession: InterviewSession = {
      ...sessionToFinalize,
      status: 'completed',
      completedAt: new Date().toISOString(),
      overallScore: reportData.overallScore,
      categoryScores: reportData.categoryScores,
      aiSummary: reportData.aiSummary,
      keyStrengths: reportData.keyStrengths,
      keyWeaknesses: reportData.keyWeaknesses,
      personalizedPlan: reportData.personalizedPlan
    };

    setCurrentSession(completedSession);
    setIsInterviewActive(false);
    setIsEvaluating(false);

    // Save to global history
    saveInterviewSession(completedSession);
    return completedSession;
  };

  const endInterview = async (): Promise<InterviewSession | null> => {
    if (!currentSession) return null;
    return await finishSession(currentSession);
  };

  return (
    <InterviewContext.Provider
      value={{
        currentSession,
        isInterviewActive,
        isAiSpeaking,
        isListening,
        isCameraActive,
        isMicActive,
        isEvaluating,
        transcript,
        interviewerText,
        mediaStream,
        timeRemainingSeconds,
        startInterview,
        toggleListening,
        toggleCamera,
        toggleMic,
        submitCurrentAnswer,
        submitCodeSolution,
        submitSystemDesign,
        endInterview,
        speakInterviewerPrompt,
        stopAiSpeech,
        setTranscript
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) throw new Error('useInterview must be used within an InterviewProvider');
  return context;
};
