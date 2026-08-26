import { UserProfile, ResumeData, InterviewSession, AnalyticsData } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'user-001',
  fullName: 'Alex Mercer',
  email: 'alex.mercer@vertomock.ai',
  role: 'Full Stack Engineer',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  location: 'San Francisco, CA',
  phone: '+1 (555) 349-2810',
  education: {
    university: 'University of California, Berkeley',
    degree: 'B.S. in Computer Science',
    graduationYear: '2023',
    cgpa: '3.85'
  },
  experience: [
    {
      company: 'Stripe Ecosystem Partners',
      role: 'Software Engineer',
      duration: '2023 - Present',
      responsibilities: [
        'Architected high-throughput payment webhook processing service handling 45k requests/min with Node.js and Redis.',
        'Designed React & TypeScript internal dashboard for live transaction monitoring and dispute resolution.',
        'Reduced database p95 query latency by 38% through composite indexing and PostgreSQL connection pooling.'
      ]
    },
    {
      company: 'TechNovation Labs',
      role: 'Software Engineering Intern',
      duration: 'Summer 2022',
      responsibilities: [
        'Built full-stack microservices using Express, FastAPI, and MongoDB.',
        'Implemented WebRTC video calling pipeline with socket-based signaling.'
      ]
    }
  ],
  skills: [
    'TypeScript',
    'React.js',
    'Node.js',
    'Express.js',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Docker',
    'AWS (S3, Lambda, ECS)',
    'Data Structures & Algorithms',
    'System Design',
    'FastAPI',
    'GraphQL'
  ],
  targetRoles: ['Full Stack Developer', 'Software Engineer', 'Backend Developer'],
  githubUrl: 'https://github.com/alexmercer-dev',
  linkedinUrl: 'https://linkedin.com/in/alexmercer-eng',
  portfolioUrl: 'https://alexmercer.dev',
  readinessScore: 86,
  interviewsCompleted: 14,
  streakDays: 6
};

export const SAMPLE_RESUME: ResumeData = {
  id: 'resume-001',
  fileName: 'Alex_Mercer_FullStack_Resume.pdf',
  uploadDate: '2026-08-20',
  rawText: `ALEX MERCER
San Francisco, CA • alex.mercer@vertomock.ai • github.com/alexmercer-dev • linkedin.com/in/alexmercer-eng

SUMMARY
Performance-driven Full Stack Engineer with 3+ years building scalable distributed web applications, reactive user interfaces, and robust backend APIs. Experienced in TypeScript, React, Node.js, PostgreSQL, Redis, and Cloud Native deployment.

EDUCATION
University of California, Berkeley — B.S. in Computer Science (GPA: 3.85/4.0) | 2019 – 2023

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, C++, SQL, Go (basic)
Frontend: React 18, Next.js, Tailwind CSS, Redux Toolkit, WebRTC, Vite
Backend: Node.js, Express, FastAPI, NestJS, REST APIs, GraphQL, Socket.IO
Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS (ECS, S3, RDS), Kafka, Kubernetes

WORK EXPERIENCE
Software Engineer | Stripe Ecosystem Partners | Jul 2023 – Present
• Designed distributed webhook retry engine processing 45,000 requests/minute using Node.js, BullMQ, and Redis.
• Led frontend migration of merchant analytics dashboard to React 18, cutting Largest Contentful Paint by 42%.
• Partnered with security teams to enforce OAuth 2.0 PKCE workflows and zero-trust API rate limiting.

PROJECTS
• HyperCache Distributed KV Store: Built a memory-pooled cache with consistent hashing and Raft consensus in Go/C++.
• VertoStream Real-Time Collaboration: WebRTC-powered video conferencing app with live code compilation & canvas.`,
  candidateName: 'Alex Mercer',
  email: 'alex.mercer@vertomock.ai',
  phone: '+1 (555) 349-2810',
  skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'WebSockets', 'Python', 'FastAPI'],
  programmingLanguages: ['TypeScript', 'JavaScript', 'Python', 'C++', 'SQL'],
  frameworks: ['React', 'Next.js', 'Express', 'FastAPI', 'Tailwind CSS'],
  databases: ['PostgreSQL', 'MongoDB', 'Redis'],
  cloudTools: ['Docker', 'AWS ECS', 'AWS S3', 'Kafka'],
  experienceYears: 2.5,
  education: 'B.S. Computer Science, UC Berkeley (3.85 GPA)',
  projects: [
    {
      title: 'Distributed Webhook Processing Engine',
      technologies: ['Node.js', 'Redis', 'PostgreSQL', 'BullMQ'],
      description: 'High-throughput resilient payment ingestion system with exponential backoff and dead-letter queues.'
    },
    {
      title: 'HyperCache Distributed In-Memory Store',
      technologies: ['Go', 'Consistent Hashing', 'Raft Consensus'],
      description: 'Low-latency key-value cache engine supporting automated partition rebalancing and snapshotting.'
    }
  ],
  scores: {
    overall: 92,
    technicalSkills: 95,
    experience: 90,
    projects: 94,
    education: 90,
    keywordRelevance: 91
  },
  keyStrengths: [
    'Strong balance of both Modern Frontend (React 18) and High-throughput Backend (Node/Redis/Postgres)',
    'Concrete metrics and impact statements across all project descriptions',
    'Demonstrated mastery of distributed systems concepts (consistent hashing, dead-letter queues)'
  ],
  suggestedQuestions: [
    'Tell me how you handled distributed transactions and duplicate events in your payment webhook processing engine.',
    'Why did you choose Redis and BullMQ for queueing instead of Apache Kafka or RabbitMQ?',
    'In HyperCache, how did your consistent hashing ring deal with hot shards and virtual node rebalancing?'
  ]
};

export const INITIAL_ANALYTICS: AnalyticsData = {
  overallReadiness: 86,
  readinessDeltaMonth: 8,
  totalInterviews: 14,
  averageScore: 84.5,
  currentStreak: 6,
  strongestSkills: ['Data Structures & Algorithms', 'React & State Management', 'REST / WebSockets', 'Database Indexing'],
  weakestSkills: ['Distributed Consensus (Raft/Paxos)', 'Dynamic Programming Optimization', 'Advanced Memory Management'],
  scoreProgression: [
    { interviewIndex: 1, date: 'Aug 02', type: 'Technical', score: 68 },
    { interviewIndex: 2, date: 'Aug 06', type: 'Coding', score: 72 },
    { interviewIndex: 3, date: 'Aug 10', type: 'HR', score: 81 },
    { interviewIndex: 4, date: 'Aug 14', type: 'System Design', score: 74 },
    { interviewIndex: 5, date: 'Aug 18', type: 'Technical', score: 85 },
    { interviewIndex: 6, date: 'Aug 22', type: 'Coding', score: 89 },
    { interviewIndex: 7, date: 'Aug 25', type: 'Full Mock', score: 86 }
  ],
  categoryScores: [
    { category: 'Technical Fundamentals', score: 91, fullMark: 100 },
    { category: 'Coding & Algorithms', score: 85, fullMark: 100 },
    { category: 'Communication & Delivery', score: 84, fullMark: 100 },
    { category: 'Problem Solving Depth', score: 88, fullMark: 100 },
    { category: 'System Architecture', score: 79, fullMark: 100 },
    { category: 'HR & Behavioral Reasoning', score: 92, fullMark: 100 }
  ],
  topicPerformance: [
    { topic: 'DSA: Hashing & Arrays', accuracy: 94, questionsAttempted: 18 },
    { topic: 'DSA: Trees & Graphs', accuracy: 88, questionsAttempted: 12 },
    { topic: 'DSA: Dynamic Programming', accuracy: 71, questionsAttempted: 9 },
    { topic: 'DBMS: SQL & Indexing', accuracy: 92, questionsAttempted: 14 },
    { topic: 'OS: Processes & Concurrency', accuracy: 82, questionsAttempted: 11 },
    { topic: 'Computer Networks (TCP/HTTP3)', accuracy: 86, questionsAttempted: 10 },
    { topic: 'System Design: Rate Limiting & Caching', accuracy: 84, questionsAttempted: 8 },
    { topic: 'Behavioral & STAR Method', accuracy: 93, questionsAttempted: 15 }
  ]
};

export const MOCK_PAST_INTERVIEWS: InterviewSession[] = [
  {
    sessionId: 'session-prev-001',
    userId: 'user-001',
    interviewType: 'full-mock',
    targetRole: 'Full Stack Developer',
    difficulty: 'adaptive',
    experienceLevel: 'mid',
    durationMinutes: 45,
    questionCount: 6,
    startedAt: '2026-08-25T14:30:00Z',
    completedAt: '2026-08-25T15:15:00Z',
    status: 'completed',
    overallScore: 86,
    categoryScores: {
      technical: 90,
      coding: 85,
      communication: 84,
      problemSolving: 88,
      systemDesign: 79,
      behavioral: 91
    },
    aiSummary: 'You demonstrated strong technical fundamentals, fluent communication, and rapid algorithmic problem-solving. Your explanation of Redis caching and database indexing was exemplary. For upcoming senior interviews, focus on distributed consensus, cache invalidation race conditions, and deep DP state-space reduction.',
    keyStrengths: [
      'Crisp articulation of Hash Table collision strategies and amortized complexities',
      'Effective use of the STAR method during behavioral leadership questions',
      'Clean modular TypeScript implementation in the live coding sandbox with all test cases passing',
      'Pragmatic architectural trade-off reasoning (CAP theorem trade-offs)'
    ],
    keyWeaknesses: [
      'Did not thoroughly discuss cache thundering herd and stampede prevention in system design',
      'Minor hesitation in explaining B+ Tree internal page fanouts under high concurrency writes'
    ],
    questions: [
      {
        id: 'q-prev-1',
        text: 'How does a Hash Table achieve O(1) average lookup time, and how are collisions resolved under high load factors?',
        category: 'DSA',
        topic: 'Hashing & HashMaps',
        difficulty: 'medium',
        targetRole: 'Full Stack Developer',
        expectedAnswerPoints: ['Hash functions', 'Separate Chaining vs Open Addressing', 'Load factor rehashing'],
        evaluationCriteria: ['Time complexity', 'Collision resolution', 'Rehashing threshold']
      },
      {
        id: 'q-prev-2',
        text: 'Explain ACID properties in relational databases and the role of Write-Ahead Logging (WAL).',
        category: 'DBMS',
        topic: 'Transactions & Recovery',
        difficulty: 'medium',
        targetRole: 'Full Stack Developer',
        expectedAnswerPoints: ['Atomicity, Consistency, Isolation, Durability', 'WAL logs changes before disk writes'],
        evaluationCriteria: ['ACID accuracy', 'WAL mechanics']
      }
    ],
    currentQuestionIndex: 2,
    answers: [
      {
        questionId: 'q-prev-1',
        questionText: 'How does a Hash Table achieve O(1) average lookup time, and how are collisions resolved under high load factors?',
        candidateAnswer: 'A hash table computes an index from a key using a hash function. In the average case, lookups and inserts are O(1). When two keys map to the same bucket index, we handle collisions using separate chaining (like linked lists or balanced trees) or open addressing (linear/quadratic probing). When the load factor exceeds a threshold like 0.75, the table doubles its capacity and rehashes existing items.',
        classification: 'excellent',
        scores: {
          correctness: 94,
          technicalDepth: 90,
          communication: 92,
          problemSolving: 90,
          confidence: 90,
          relevance: 95,
          overall: 92
        },
        communicationMetrics: {
          clarity: 92,
          fluency: 90,
          speakingSpeedWpm: 138,
          fillerWordsCount: 2,
          detectedFillerWords: ['like', 'basically'],
          structureRating: 'Well Structured'
        },
        strengths: ['Concise and accurate breakdown of average vs worst case', 'Clearly explained both separate chaining and open addressing'],
        areasForImprovement: ['Could briefly mention Java 8 treeification threshold (when bucket length > 8)'],
        idealAnswerSummary: 'Hash tables map keys to bucket indices using a deterministic hash function. Collisions are handled via chaining or open addressing, with dynamic resizing at a set load factor.',
        followUpRequired: false
      }
    ],
    personalizedPlan: [
      {
        day: 1,
        topic: 'Arrays, Hashing & Sliding Window',
        focus: 'Review 2-pointer paradigms and sliding window state minimization',
        recommendedTasks: ['Solve 3 LeetCode Medium Sliding Window problems', 'Review Hash collision mitigations in memory-constrained devices']
      },
      {
        day: 2,
        topic: 'Trees, Graphs & BFS/DFS',
        focus: 'Topological sorting, cycle detection, and lowest common ancestor',
        recommendedTasks: ['Implement Kahn algorithm for topological sort', 'Solve Course Schedule I & II']
      },
      {
        day: 3,
        topic: 'DBMS, Indexes & Transactions',
        focus: 'B+ Tree fanout, Composite Index order, MVCC and isolation levels',
        recommendedTasks: ['Run EXPLAIN ANALYZE on PostgreSQL with multi-column queries', 'Review Dirty Read vs Phantom Read anomalies']
      },
      {
        day: 4,
        topic: 'Operating Systems & Concurrency',
        focus: 'Process memory layout, mutex vs semaphore, deadlocks',
        recommendedTasks: ['Review Coffman conditions and Banker algorithm', 'Understand TLB shootdown and virtual memory paging']
      },
      {
        day: 5,
        topic: 'System Design: Distributed Cache & Scalability',
        focus: 'Cache thundering herd mitigation, consistent hashing, replication',
        recommendedTasks: ['Diagram a distributed rate limiter with Redis and Token Bucket', 'Study cache stampede probabilistic early expiration']
      },
      {
        day: 6,
        topic: 'Behavioral & STAR Method Refinement',
        focus: 'Impact stories on conflict resolution, ambiguity, and technical leadership',
        recommendedTasks: ['Write 4 STAR stories for leadership and disagreement scenarios', 'Record 2-minute mock vocal answers']
      },
      {
        day: 7,
        topic: 'Full 60-minute Mock Interview Simulation',
        focus: 'Simulate end-to-end multi-round interview under realistic timed conditions',
        recommendedTasks: ['Run VertoMock AI Full Mock Mode', 'Review post-interview readiness report']
      }
    ]
  }
];
