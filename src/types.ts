export type InterviewType = 
  | 'technical' 
  | 'coding' 
  | 'hr' 
  | 'system-design' 
  | 'aiml' 
  | 'full-mock';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'adaptive';

export type ExperienceLevel = 'fresher' | 'intern' | 'junior' | 'mid' | 'senior' | 'lead';

export type TargetRole = 
  | 'Software Engineer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full Stack Developer'
  | 'Data Scientist'
  | 'ML Engineer'
  | 'AI Engineer'
  | 'DevOps Engineer'
  | 'Cloud Architect'
  | 'System Design Specialist';

export type AnswerClassification = 
  | 'excellent' 
  | 'correct' 
  | 'partially_correct' 
  | 'incomplete' 
  | 'incorrect';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatarUrl: string;
  location?: string;
  phone?: string;
  education: {
    university: string;
    degree: string;
    graduationYear: string;
    cgpa?: string;
  };
  experience: {
    company: string;
    role: string;
    duration: string;
    responsibilities: string[];
  }[];
  skills: string[];
  targetRoles: TargetRole[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  readinessScore: number;
  interviewsCompleted: number;
  streakDays: number;
}

export interface ResumeData {
  id: string;
  fileName: string;
  uploadDate: string;
  rawText: string;
  candidateName: string;
  email: string;
  phone?: string;
  skills: string[];
  programmingLanguages: string[];
  frameworks: string[];
  databases: string[];
  cloudTools: string[];
  experienceYears: number;
  education: string;
  projects: {
    title: string;
    technologies: string[];
    description: string;
  }[];
  scores: {
    overall: number;
    technicalSkills: number;
    experience: number;
    projects: number;
    education: number;
    keywordRelevance: number;
  };
  keyStrengths: string[];
  suggestedQuestions: string[];
}

export interface QuestionItem {
  id: string;
  text: string;
  category: 'DSA' | 'OOP' | 'DBMS' | 'OS' | 'CN' | 'System Design' | 'AI/ML' | 'HR' | 'Tech Stack' | 'Project Architecture' | string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  targetRole?: string;
  targetRoles?: string[];
  expectedAnswerPoints?: string[];
  evaluationCriteria: string[];
  idealAnswerOutline?: string;
  isFollowUp?: boolean;
  parentQuestionId?: string;
  timeLimitSeconds?: number;
  codeSnippet?: string;
}

export interface AnswerEvaluation {
  questionId: string;
  questionText: string;
  candidateAnswer: string;
  classification: AnswerClassification;
  scores: {
    correctness: number;
    technicalDepth: number;
    communication: number;
    problemSolving: number;
    confidence: number;
    relevance: number;
    overall: number;
  };
  communicationMetrics: {
    clarity: number;
    fluency: number;
    speakingSpeedWpm: number;
    fillerWordsCount: number;
    detectedFillerWords: string[];
    structureRating: 'Concise' | 'Well Structured' | 'Disorganized' | 'Rambling';
  };
  strengths: string[];
  areasForImprovement: string[];
  idealAnswerSummary: string;
  followUpRequired: boolean;
  generatedFollowUp?: QuestionItem;
}

export interface CodingTestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation?: string;
  isHidden?: boolean;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  testCases: CodingTestCase[];
  hints: string[];
  timeComplexityTarget: string;
  spaceComplexityTarget: string;
}

export interface CodeEvaluationResult {
  problemId: string;
  language: 'javascript' | 'python' | 'cpp' | 'java';
  code: string;
  testsPassed: number;
  totalTests: number;
  testResults: {
    testCaseId: string;
    passed: boolean;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    executionTimeMs: number;
    error?: string;
  }[];
  complexity: {
    timeComplexity: string;
    spaceComplexity: string;
    timeRating: 'Optimal' | 'Sub-optimal' | 'Inefficient';
    spaceRating: 'Optimal' | 'Sub-optimal' | 'Inefficient';
  };
  codeQuality: {
    score: number;
    readability: string;
    namingConventions: string;
    modularity: string;
  };
  score: number;
  strengths: string[];
  suggestions: string[];
}

export interface SystemDesignProblem {
  id: string;
  title: string;
  difficulty: 'medium' | 'hard';
  description: string;
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  trafficEstimates: {
    dailyActiveUsers: string;
    readWriteRatio: string;
    bandwidthRequirement: string;
    storage5Years: string;
  };
  suggestedComponents: string[];
  keyTradeOffs: string[];
}

export interface InterviewSession {
  sessionId: string;
  userId: string;
  interviewType: InterviewType;
  targetRole: TargetRole;
  difficulty: DifficultyLevel;
  experienceLevel: ExperienceLevel;
  durationMinutes: number;
  questionCount: number;
  resumeId?: string;
  questions: QuestionItem[];
  currentQuestionIndex: number;
  answers: AnswerEvaluation[];
  codingProblem?: CodingProblem;
  codingSubmission?: CodeEvaluationResult;
  systemDesignProblem?: SystemDesignProblem;
  status: 'configured' | 'in_progress' | 'completed' | 'abandoned';
  startedAt: string;
  completedAt?: string;
  overallScore?: number;
  categoryScores?: {
    technical: number;
    coding: number;
    communication: number;
    problemSolving: number;
    systemDesign: number;
    behavioral: number;
  };
  aiSummary?: string;
  keyStrengths?: string[];
  keyWeaknesses?: string[];
  personalizedPlan?: {
    day: number;
    topic: string;
    focus: string;
    recommendedTasks: string[];
  }[];
}

export interface AnalyticsData {
  overallReadiness: number;
  readinessDeltaMonth: number;
  totalInterviews: number;
  averageScore: number;
  currentStreak: number;
  strongestSkills: string[];
  weakestSkills: string[];
  scoreProgression: {
    interviewIndex: number;
    date: string;
    type: string;
    score: number;
  }[];
  categoryScores: {
    category: string;
    score: number;
    fullMark: number;
  }[];
  topicPerformance: {
    topic: string;
    accuracy: number;
    questionsAttempted: number;
  }[];
}
