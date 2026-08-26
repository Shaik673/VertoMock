import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, ResumeData, InterviewSession } from '../types';
import { INITIAL_USER_PROFILE, SAMPLE_RESUME, MOCK_PAST_INTERVIEWS } from '../data/mockData';

interface AuthContextType {
  user: UserProfile | null;
  resume: ResumeData | null;
  darkMode: boolean;
  toggleDarkMode: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateResume: (resume: ResumeData) => void;
  pastInterviews: InterviewSession[];
  saveInterviewSession: (session: InterviewSession) => void;
  loginDemoUser: (persona?: 'senior' | 'ai' | 'fresher') => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('vertomock_user');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [resume, setResume] = useState<ResumeData | null>(() => {
    const saved = localStorage.getItem('vertomock_resume');
    return saved ? JSON.parse(saved) : SAMPLE_RESUME;
  });

  const [pastInterviews, setPastInterviews] = useState<InterviewSession[]>(() => {
    const saved = localStorage.getItem('vertomock_interviews');
    return saved ? JSON.parse(saved) : MOCK_PAST_INTERVIEWS;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('vertomock_theme');
    if (saved) return saved === 'dark';
    return true; // Default dark mode as requested for modern dev aesthetics
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vertomock_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vertomock_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return null;
      const next = { ...prev, ...updated };
      localStorage.setItem('vertomock_user', JSON.stringify(next));
      return next;
    });
  };

  const updateResume = (newResume: ResumeData) => {
    setResume(newResume);
    localStorage.setItem('vertomock_resume', JSON.stringify(newResume));
    // Also sync extracted skills to profile
    if (user && newResume.skills.length > 0) {
      const mergedSkills = Array.from(new Set([...user.skills, ...newResume.skills]));
      updateProfile({ skills: mergedSkills });
    }
  };

  const saveInterviewSession = (session: InterviewSession) => {
    setPastInterviews(prev => {
      const existingIdx = prev.findIndex(s => s.sessionId === session.sessionId);
      let updated: InterviewSession[];
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = session;
      } else {
        updated = [session, ...prev];
      }
      localStorage.setItem('vertomock_interviews', JSON.stringify(updated));
      return updated;
    });

    if (user && session.overallScore) {
      const newCount = (user.interviewsCompleted || 0) + 1;
      const newScore = Math.round(((user.readinessScore * (newCount - 1)) + session.overallScore) / newCount);
      updateProfile({
        readinessScore: newScore,
        interviewsCompleted: newCount,
        streakDays: (user.streakDays || 1) + 1
      });
    }
  };

  const loginDemoUser = (persona: 'senior' | 'ai' | 'fresher' = 'senior') => {
    if (persona === 'senior') {
      setUser(INITIAL_USER_PROFILE);
      setResume(SAMPLE_RESUME);
      localStorage.setItem('vertomock_user', JSON.stringify(INITIAL_USER_PROFILE));
      localStorage.setItem('vertomock_resume', JSON.stringify(SAMPLE_RESUME));
    } else if (persona === 'ai') {
      const aiUser: UserProfile = {
        id: 'user-002',
        fullName: 'Maya Lin',
        email: 'maya.lin@vertomock.ai',
        role: 'AI / ML Engineer',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        location: 'Seattle, WA',
        phone: '+1 (555) 839-4412',
        education: {
          university: 'Stanford University',
          degree: 'M.S. in Computer Science (AI Track)',
          graduationYear: '2024',
          cgpa: '3.92'
        },
        experience: [
          {
            company: 'DeepScale AI Lab',
            role: 'Machine Learning Engineer',
            duration: '2024 - Present',
            responsibilities: [
              'Fine-tuned open-source Transformer LLMs with LoRA and QLoRA on custom domain datasets.',
              'Engineered low-latency RAG vector search pipelines using Milvus and HNSW indexing.'
            ]
          }
        ],
        skills: ['Python', 'PyTorch', 'Transformers', 'Hugging Face', 'RAG', 'Vector DBs', 'FastAPI', 'Docker', 'CUDA'],
        targetRoles: ['AI Engineer', 'ML Engineer', 'Data Scientist'],
        readinessScore: 89,
        interviewsCompleted: 9,
        streakDays: 8
      };
      setUser(aiUser);
      localStorage.setItem('vertomock_user', JSON.stringify(aiUser));
    } else {
      const fresherUser: UserProfile = {
        id: 'user-003',
        fullName: 'Jordan Reed',
        email: 'jordan.reed@vertomock.ai',
        role: 'Junior Software Engineer',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        location: 'Austin, TX',
        phone: '+1 (555) 492-8812',
        education: {
          university: 'University of Texas at Austin',
          degree: 'B.S. in Computer Science',
          graduationYear: '2025',
          cgpa: '3.70'
        },
        experience: [
          {
            company: 'CodeCraft Bootcamp',
            role: 'Teaching Assistant',
            duration: '2024 - 2025',
            responsibilities: [
              'Mentored 60+ students in Data Structures, Algorithms, JavaScript and React fundamentals.'
            ]
          }
        ],
        skills: ['Java', 'Python', 'JavaScript', 'React', 'HTML/CSS', 'SQL', 'Git', 'Data Structures'],
        targetRoles: ['Software Engineer', 'Frontend Developer'],
        readinessScore: 74,
        interviewsCompleted: 5,
        streakDays: 3
      };
      setUser(fresherUser);
      localStorage.setItem('vertomock_user', JSON.stringify(fresherUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vertomock_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        resume,
        darkMode,
        toggleDarkMode,
        updateProfile,
        updateResume,
        pastInterviews,
        saveInterviewSession,
        loginDemoUser,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
