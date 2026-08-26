import { QuestionItem } from '../types';

export const QUESTION_BANK: QuestionItem[] = [
  // DSA Questions
  {
    id: 'dsa-1',
    text: 'How does a Hash Table achieve O(1) average lookup time, and how are collisions resolved under high load factors?',
    category: 'DSA',
    topic: 'Hashing & HashMaps',
    difficulty: 'medium',
    targetRole: 'Software Engineer',
    expectedAnswerPoints: [
      'Hash function computes index from key',
      'Average time complexity O(1) assuming uniform distribution',
      'Collision handling: Separate Chaining (linked lists / red-black trees in Java 8+) and Open Addressing (Linear, Quadratic, Double Hashing)',
      'Load factor threshold triggers resizing/rehashing (usually 0.75)'
    ],
    evaluationCriteria: ['Hash function properties', 'Collision strategies comparison', 'Time/space complexity trade-offs', 'Rehashing mechanics']
  },
  {
    id: 'dsa-2',
    text: 'Explain the Two Pointers technique versus Sliding Window. In what scenarios is Sliding Window strictly preferred?',
    category: 'DSA',
    topic: 'Arrays & Strings',
    difficulty: 'medium',
    targetRole: 'Software Engineer',
    expectedAnswerPoints: [
      'Two pointers usually iterate from opposite ends or at different speeds',
      'Sliding window maintains a contiguous subarray/substring with dynamic or fixed boundaries',
      'Preferred when looking for optimal contiguous subsegments (e.g. longest substring without repeating characters, minimum window substring)'
    ],
    evaluationCriteria: ['Clear definition of both patterns', 'Condition for expanding vs shrinking window', 'Time complexity O(N)']
  },
  {
    id: 'dsa-3',
    text: 'Explain how Breadth-First Search (BFS) and Depth-First Search (DFS) differ in terms of memory requirements and use-cases in graph traversal.',
    category: 'DSA',
    topic: 'Trees & Graphs',
    difficulty: 'medium',
    targetRole: 'Software Engineer',
    expectedAnswerPoints: [
      'BFS uses a Queue; memory proportional to maximum width of the tree/graph O(W)',
      'DFS uses a Stack / recursion; memory proportional to maximum depth O(H)',
      'BFS is optimal for shortest path in unweighted graphs',
      'DFS is preferred for topological sorting, cycle detection, connected components, and backtracking'
    ],
    evaluationCriteria: ['Queue vs Stack', 'Shortest path guarantee of BFS', 'Space complexity comparison']
  },
  {
    id: 'dsa-4',
    text: 'What is Dynamic Programming? Contrast Memoization (Top-down) with Tabulation (Bottom-up).',
    category: 'DSA',
    topic: 'Dynamic Programming',
    difficulty: 'hard',
    targetRole: 'Software Engineer',
    expectedAnswerPoints: [
      'Applicable when problems have Overlapping Subproblems and Optimal Substructure',
      'Top-down (Memoization) uses recursion with a cache; intuitive to write from recursive relation',
      'Bottom-up (Tabulation) iteratively solves subproblems in topological order; avoids stack overflow and allows space optimization'
    ],
    evaluationCriteria: ['Optimal substructure explanation', 'Overlapping subproblems', 'Space optimization techniques']
  },

  // DBMS Questions
  {
    id: 'db-1',
    text: 'Explain ACID properties in database management systems and how write-ahead logging (WAL) supports durability and atomicity.',
    category: 'DBMS',
    topic: 'Transactions & ACID',
    difficulty: 'medium',
    targetRole: 'Backend Developer',
    expectedAnswerPoints: [
      'Atomicity (all or nothing), Consistency (preserves invariants), Isolation (concurrent safety), Durability (persisted on commit)',
      'WAL logs changes to disk before modifying actual data pages',
      'During crashes, WAL allows REDO of committed transactions and UNDO of uncommitted ones'
    ],
    evaluationCriteria: ['Accurate definition of ACID', 'Role of WAL in crash recovery', 'Dirty read & isolation levels']
  },
  {
    id: 'db-2',
    text: 'How do B-Tree and B+ Tree indexes work, and why are B+ Trees predominantly used in relational databases like PostgreSQL and MySQL InnoDB?',
    category: 'DBMS',
    topic: 'Indexing & Performance',
    difficulty: 'hard',
    targetRole: 'Backend Developer',
    expectedAnswerPoints: [
      'Self-balancing search tree with high fan-out to minimize disk I/O',
      'B+ Trees store data pointers only in leaf nodes; internal nodes hold only keys/routing',
      'Leaf nodes are linked in a sequential doubly-linked list enabling fast range scans',
      'Higher fanout means shallower tree depth (fewer disk seeks)'
    ],
    evaluationCriteria: ['Fanout and disk block utilization', 'Range query efficiency in B+ Trees', 'Leaf node linked list']
  },
  {
    id: 'db-3',
    text: 'What are database isolation levels, and what anomalies (Dirty Read, Non-repeatable Read, Phantom Read) can occur in each?',
    category: 'DBMS',
    topic: 'Concurrency Control',
    difficulty: 'hard',
    targetRole: 'Backend Developer',
    expectedAnswerPoints: [
      'Read Uncommitted: allows Dirty Reads',
      'Read Committed: prevents Dirty Reads; allows Non-repeatable Reads',
      'Repeatable Read: prevents Non-repeatable Reads using MVCC or snapshot isolation; may allow Phantom Reads in some SQL engines',
      'Serializable: strictest level; eliminates all anomalies using two-phase locking or serializable snapshot isolation'
    ],
    evaluationCriteria: ['All 4 standard isolation levels', 'Definitions of 3 anomalies', 'MVCC concept']
  },

  // Operating Systems
  {
    id: 'os-1',
    text: 'What is the fundamental difference between a Process and a Thread? How does Context Switching differ between the two?',
    category: 'OS',
    topic: 'Processes & Concurrency',
    difficulty: 'medium',
    targetRole: 'Software Engineer',
    expectedAnswerPoints: [
      'Process has its own virtual address space, file descriptors, and memory protection',
      'Threads share memory (heap, code, data) within the parent process, but have independent stacks and registers',
      'Process context switch invalidates TLB (Translation Lookaside Buffer) and swaps page tables, making it much more expensive',
      'Thread context switch only saves/restores registers and stack pointer'
    ],
    evaluationCriteria: ['Memory isolation vs shared address space', 'Cost of context switching and TLB flush', 'Synchronization necessity']
  },
  {
    id: 'os-2',
    text: 'Explain Deadlock. What are the four Coffman conditions necessary for a deadlock to occur, and how can they be broken?',
    category: 'OS',
    topic: 'Deadlocks & Synchronization',
    difficulty: 'medium',
    targetRole: 'Software Engineer',
    expectedAnswerPoints: [
      'Mutual Exclusion (resources cannot be shared)',
      'Hold and Wait (process holds resources while requesting more)',
      'No Preemption (resources cannot be forcibly taken)',
      'Circular Wait (circular chain of processes waiting on each other)',
      'Prevention: resource ordering (e.g. hierarchical locking) breaks Circular Wait'
    ],
    evaluationCriteria: ['All 4 Coffman conditions named accurately', 'Prevention vs Avoidance (Banker algorithm)', 'Resource ordering strategy']
  },
  {
    id: 'os-3',
    text: 'How does Virtual Memory with Paging work? What is a Page Fault and how does the OS handle it?',
    category: 'OS',
    topic: 'Memory Management',
    difficulty: 'hard',
    targetRole: 'Software Engineer',
    expectedAnswerPoints: [
      'Virtual addresses mapped to physical frames via Page Tables and MMU',
      'TLB caches recent translations for fast lookups',
      'Page Fault trap triggers when valid bit is 0 (page not in RAM)',
      'OS page fault handler fetches page from swap/disk, updates page table, and resumes instruction'
    ],
    evaluationCriteria: ['Page table & MMU role', 'TLB cache', 'Page replacement algorithms (LRU, Clock)']
  },

  // Computer Networks
  {
    id: 'cn-1',
    text: 'Explain the TCP 3-Way Handshake and 4-Way Teardown. Why is TIME_WAIT state necessary in TCP?',
    category: 'CN',
    topic: 'Transport Layer Protocols',
    difficulty: 'medium',
    targetRole: 'Software Engineer',
    expectedAnswerPoints: [
      'SYN -> SYN-ACK -> ACK synchronizes sequence numbers and establishes reliable socket state',
      'FIN -> ACK -> FIN -> ACK closes both halves of full-duplex connection',
      'TIME_WAIT (usually 2*MSL) ensures the remote peer receives the final ACK and old duplicate packets expire in the network'
    ],
    evaluationCriteria: ['Sequence numbers synchronization', 'Full duplex termination', 'TIME_WAIT rationale (2MSL)']
  },
  {
    id: 'cn-2',
    text: 'What is the difference between HTTP/1.1, HTTP/2, and HTTP/3 (QUIC)? How does HTTP/3 eliminate Head-of-Line (HoL) blocking?',
    category: 'CN',
    topic: 'Application Layer Protocols',
    difficulty: 'hard',
    targetRole: 'Full Stack Developer',
    expectedAnswerPoints: [
      'HTTP/1.1 introduced persistent keep-alive connections and pipelining (with application HoL blocking)',
      'HTTP/2 introduced binary framing, multiplexing over single TCP connection, HPACK header compression',
      'HTTP/2 still suffered from transport-layer TCP HoL blocking when a single packet drops',
      'HTTP/3 runs over UDP using QUIC, providing stream-independent congestion control and 0-RTT handshakes'
    ],
    evaluationCriteria: ['Multiplexing in HTTP/2', 'TCP packet loss HoL blocking explained', 'QUIC/UDP architecture in HTTP/3']
  },

  // System Design
  {
    id: 'sd-1',
    text: 'Design a distributed Rate Limiter for an API Gateway serving 100k requests/sec. What algorithms and storage would you choose?',
    category: 'System Design',
    topic: 'Rate Limiting & Scalability',
    difficulty: 'hard',
    targetRole: 'Backend Developer',
    expectedAnswerPoints: [
      'Algorithms: Token Bucket, Leaky Bucket, Sliding Window Counter',
      'Storage: Redis cluster with Lua scripts for atomic increments and TTL expiry',
      'Distributed synchronization: local in-memory caching with asynchronous batch sync to Redis, or consistent hashing',
      'Client response: 429 Too Many Requests with Retry-After headers'
    ],
    evaluationCriteria: ['Algorithm trade-offs (Sliding window vs Token bucket)', 'Atomicity in Redis (Lua scripts)', 'High throughput optimization']
  },
  {
    id: 'sd-2',
    text: 'How would you handle Database Sharding in a massive social network? What partition key strategy would you adopt and how do you handle rebalancing?',
    category: 'System Design',
    topic: 'Data Partitioning & Scalability',
    difficulty: 'hard',
    targetRole: 'Cloud Architect',
    expectedAnswerPoints: [
      'Horizontal partitioning based on Shard Key (e.g. UserID with Consistent Hashing)',
      'Virtual nodes in consistent hashing ring to ensure uniform distribution',
      'Handling cross-shard queries and joins (denormalization or scatter-gather)',
      'Handling hotspot celebrities via secondary caching / fan-out on read vs write'
    ],
    evaluationCriteria: ['Consistent hashing mechanics', 'Shard key selection criteria', 'Mitigation of hot shards']
  },
  {
    id: 'sd-3',
    text: 'Explain the CAP Theorem and PACELC theorem. In an event-driven microservices architecture, how is Eventual Consistency maintained?',
    category: 'System Design',
    topic: 'Distributed Systems Principles',
    difficulty: 'hard',
    targetRole: 'Backend Developer',
    expectedAnswerPoints: [
      'CAP: Consistency, Availability, Partition Tolerance (network partitions inevitable -> choose CP or AP)',
      'PACELC: If Partition -> A or C; Else -> Latency or Consistency',
      'Eventual consistency via Transactional Outbox Pattern, Kafka / RabbitMQ event logs, Idempotent consumers, and Saga pattern for distributed rollbacks'
    ],
    evaluationCriteria: ['PACELC extension', 'Transactional outbox pattern', 'Idempotency and Sagas']
  },

  // AI / ML
  {
    id: 'aiml-1',
    text: 'What is Retrieval-Augmented Generation (RAG)? Walk through the pipeline from document chunking, embeddings, vector indexing, to generation.',
    category: 'AI/ML',
    topic: 'RAG & LLM Architectures',
    difficulty: 'medium',
    targetRole: 'AI Engineer',
    expectedAnswerPoints: [
      'Chunking strategy (fixed size, recursive, semantic) with overlap',
      'Embedding model transforms chunks into high-dimensional dense vectors',
      'Vector database (e.g. Pinecone, Chroma, Milvus) indexes vectors using HNSW / IVF-PQ for Approximate Nearest Neighbor search',
      'Prompt augmentation with top-k retrieved contexts and system instructions for hallucination mitigation'
    ],
    evaluationCriteria: ['Chunking & overlap rationale', 'Vector similarity metrics (Cosine, Dot Product)', 'HNSW indexing', 'Context window management']
  },
  {
    id: 'aiml-2',
    text: 'Explain the Self-Attention mechanism in the Transformer architecture. Why does it scale quadratically O(N^2) with sequence length?',
    category: 'AI/ML',
    topic: 'Deep Learning & Transformers',
    difficulty: 'hard',
    targetRole: 'ML Engineer',
    expectedAnswerPoints: [
      'Query (Q), Key (K), and Value (V) projections: Attention(Q,K,V) = softmax(Q * K^T / sqrt(d_k)) * V',
      'Every token computes dot-product similarity with every other token in the sequence (N x N attention matrix)',
      'Scaling factor sqrt(d_k) prevents softmax gradient vanishing at high dimensions',
      'Optimization approaches: FlashAttention, Sparse Attention, Linear Attention (Mamba/SSMs)'
    ],
    evaluationCriteria: ['Mathematical formulation of scaled dot-product', 'Quadratic complexity source (Q*K^T matrix)', 'Multi-Head Attention utility']
  },

  // HR / Behavioral
  {
    id: 'hr-1',
    text: 'Tell me about a time when you faced a major technical disagreement with a teammate. How did you handle it and what was the outcome?',
    category: 'HR',
    topic: 'Conflict Resolution & Collaboration',
    difficulty: 'medium',
    targetRole: 'Software Engineer',
    expectedAnswerPoints: [
      'Used STAR method (Situation, Task, Action, Result)',
      'Focused on objective data, benchmarks, or prototypes rather than emotional arguments',
      'Demonstrated active listening and collaborative compromise',
      'Showed commitment to the team goal and constructive post-decision alignment ("disagree and commit")'
    ],
    evaluationCriteria: ['STAR structure adherence', 'Professionalism and emotional intelligence', 'Data-driven resolution', 'Positive team impact']
  },
  {
    id: 'hr-2',
    text: 'Describe a project where you had to learn a completely new technology under tight deadlines. How did you manage the learning curve?',
    category: 'HR',
    topic: 'Adaptability & Problem Solving',
    difficulty: 'medium',
    targetRole: 'Software Engineer',
    expectedAnswerPoints: [
      'Clear definition of project stakes and timeline constraints',
      'Strategic learning: read core documentation, built minimal proof-of-concept first, sought mentor review',
      'Pragmatic prioritization of must-have features over perfection',
      'Delivered the milestone successfully and documented learnings for teammates'
    ],
    evaluationCriteria: ['Clear learning methodology', 'Prioritization under pressure', 'Successful delivery and documentation']
  },
  {
    id: 'hr-3',
    text: 'Why do you want to join this role, and where do you see your technical trajectory over the next 3 to 5 years?',
    category: 'HR',
    topic: 'Career Vision & Alignment',
    difficulty: 'easy',
    targetRole: 'Software Engineer',
    expectedAnswerPoints: [
      'Alignment between personal career goals and company mission/technical challenges',
      'Clear progression plan: deepening domain mastery, driving architecture decisions, mentoring peers',
      'Demonstrated enthusiasm for continuous craft improvement'
    ],
    evaluationCriteria: ['Authenticity & enthusiasm', 'Realistic and ambitious growth trajectory', 'Value-add proposition for the team']
  }
];

export function getQuestionsByRoleAndType(
  role: string, 
  interviewType: string, 
  count: number = 5,
  resumeSkills: string[] = []
): QuestionItem[] {
  let filtered = QUESTION_BANK;

  if (interviewType === 'technical') {
    filtered = QUESTION_BANK.filter(q => ['DSA', 'OOP', 'DBMS', 'OS', 'CN', 'Tech Stack'].includes(q.category));
  } else if (interviewType === 'coding') {
    filtered = QUESTION_BANK.filter(q => q.category === 'DSA');
  } else if (interviewType === 'system-design') {
    filtered = QUESTION_BANK.filter(q => q.category === 'System Design');
  } else if (interviewType === 'aiml') {
    filtered = QUESTION_BANK.filter(q => q.category === 'AI/ML');
  } else if (interviewType === 'hr') {
    filtered = QUESTION_BANK.filter(q => q.category === 'HR');
  }

  // Shuffle and pick
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  // If candidate has resume skills, synthesize an extra custom question
  if (resumeSkills.length > 0 && selected.length > 0) {
    const topSkill = resumeSkills[0];
    selected[0] = {
      id: `resume-custom-1`,
      text: `In your resume, you highlighted deep experience with ${topSkill}. Can you describe a challenging production architectural challenge you resolved using ${topSkill}?`,
      category: 'Project Architecture',
      topic: `${topSkill} Deep Dive`,
      difficulty: 'medium',
      targetRole: role,
      expectedAnswerPoints: [
        'Context & problem statement in production',
        `Specific features/APIs of ${topSkill} leveraged`,
        'Trade-offs and benchmarks evaluated',
        'Business and performance outcomes'
      ],
      evaluationCriteria: ['Authenticity', 'Technical depth', 'Problem solving', 'Quantifiable impact']
    };
  }

  return selected;
}
