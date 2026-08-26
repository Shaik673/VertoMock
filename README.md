# 🎯 VertoMock AI — AI-Powered Interview Preparation & Assessment Platform

> **Practice smarter. Interview better. Get hired.**

VertoMock AI is a full-stack, AI-powered mock interview and assessment platform designed to simulate realistic technical, coding, HR, system design, and AI/ML interviews. It uses **resume intelligence, adaptive questioning, LLM-powered evaluation, speech-to-text, real-time communication, and automated performance analytics** to provide candidates with personalized interview preparation.

The platform transforms traditional interview preparation into an interactive AI-driven experience where the interviewer dynamically adapts to the candidate's skills, answers, performance, and target role.

---

## 🚀 Key Highlights

* 🤖 **AI-Powered Mock Interviews**
* 📄 **Resume-Based Interview Generation**
* 🧠 **Adaptive Questioning & Dynamic Follow-ups**
* 💻 **Real-Time Coding Interviews**
* 🎙️ **Voice-Based Interviews with Whisper**
* 🌐 **WebRTC-Based Audio/Video Communication**
* ⚡ **Real-Time Interview Sessions using Socket.IO**
* 📊 **Automated AI Evaluation & Performance Analytics**
* 🎯 **Interview Readiness Score**
* 📚 **Personalized Weak-Topic Detection**
* 📝 **Detailed AI-Generated Interview Reports**
* 🧩 **500+ Role-Specific Interview Questions**
* 🔐 **Secure Authentication & Protected APIs**
* 👨‍💼 **Admin Dashboard & Question Management**
* 📈 **Interview Progress & Performance Tracking**

---

# 🧠 Problem Statement

Traditional interview preparation platforms generally provide static question banks and predefined answers. They do not realistically simulate an interviewer who can:

* Understand a candidate's resume.
* Ask personalized questions.
* Dynamically change difficulty.
* Ask follow-up questions.
* Evaluate answers in context.
* Analyze communication.
* Evaluate coding approaches.
* Identify knowledge gaps.
* Provide personalized improvement plans.

VertoMock AI solves this problem by combining **Generative AI, speech processing, real-time communication, coding assessment, and performance analytics** into a single interview preparation platform.

---

# 💡 Solution

VertoMock AI creates a personalized virtual interviewer for every candidate.

The platform analyzes the candidate's:

* Resume
* Skills
* Experience
* Target role
* Interview history
* Previous answers
* Coding performance
* Weak and strong topics

The AI then uses this information to generate and conduct a dynamic interview.

Instead of following a fixed question sequence, the interview engine continuously evaluates the candidate and determines what should happen next.

Candidate Profile
       ↓
Resume Analysis
       ↓
Interview Configuration
       ↓
AI Question Generation
       ↓
Candidate Answer
       ↓
AI Evaluation
       ↓
Difficulty Adjustment
       ↓
Dynamic Follow-up
       ↓
Next Question
       ↓
Final Evaluation
       ↓
Performance Report


# ✨ Features

## 🤖 AI Mock Interview

Conduct realistic AI-powered interviews across multiple categories:

* Technical
* Coding
* HR
* System Design
* AI/ML
* Full Mock Interview

The AI interviewer maintains interview context and generates questions based on the candidate's profile and target role.

---

## 📄 Resume Intelligence

Upload your resume and let the AI analyze it automatically.

The system extracts:

* Skills
* Programming Languages
* Frameworks
* Projects
* Education
* Experience
* Certifications
* Technologies

The extracted information becomes part of the candidate's interview context.

### Resume Processing Pipeline

```text
Resume Upload
      ↓
Document Processing
      ↓
Text Extraction
      ↓
Information Extraction
      ↓
AI Resume Analysis
      ↓
Candidate Profile
      ↓
Personalized Interview
```

---

# 🧠 Adaptive Interview Engine

VertoMock AI does not use a fixed sequence of questions.

The interview engine evaluates every response and dynamically determines:

* Whether the answer is correct.
* Whether the answer is incomplete.
* Whether a follow-up is required.
* Whether difficulty should increase.
* Whether the candidate has a knowledge gap.
* Which topic should be explored next.

Example:

```text
AI:
What is normalization in DBMS?

Candidate:
Normalization reduces data redundancy.

AI:
Good. Can you explain the difference between 2NF and 3NF?
```

If the candidate demonstrates strong knowledge:

```text
AI:
Excellent.

How would you design a highly scalable database
for a distributed application?
```

This creates an interview experience closer to a real human interviewer.

---

# 🔄 Dynamic Follow-Up Questions

The AI analyzes the previous response before generating the next question.

```text
Question
   ↓
Candidate Answer
   ↓
Answer Analysis
   ↓
Knowledge Assessment
   ↓
Follow-up Decision
   ↓
Generate Next Question
```

Follow-ups can be based on:

* Incorrect answers
* Partial answers
* Strong answers
* Resume projects
* Technologies mentioned
* Previous statements
* Weak topics

---

# 💻 Coding Interview

VertoMock AI provides an integrated coding environment powered by **Monaco Editor**.

Candidates can:

* Read problem statements.
* Write code.
* Select programming languages.
* Run test cases.
* Submit solutions.
* View execution results.
* Receive AI-based code evaluation.

Supported languages can include:

```text
C++
Java
Python
JavaScript
```

### Coding Evaluation

The platform evaluates:

* Correctness
* Test cases passed
* Edge cases
* Time complexity
* Space complexity
* Code quality
* Problem-solving approach
* Optimization

Example:


Coding Score: 87/100

Correctness       90
Problem Solving   88
Code Quality      84
Complexity        86
Optimization      85


# 🎙️ Voice Interview

Candidates can participate in voice-based interviews.

Technology pipeline:


Microphone
    ↓
WebRTC
    ↓
Audio Capture
    ↓
Whisper
    ↓
Speech-to-Text
    ↓
Answer Analysis
    ↓
AI Evaluation


Whisper converts the candidate's spoken answer into text, which is then analyzed by the AI evaluation engine.

---

# 🗣️ Communication Analysis

The platform evaluates communication skills from the candidate's transcript.

Metrics include:

* Clarity
* Confidence
* Fluency
* Relevance
* Conciseness
* Vocabulary
* Answer structure
* Filler words

Example:

Communication Score: 82/100

Strengths:
✓ Clear explanations
✓ Good technical vocabulary

Areas to Improve:
⚠ Reduce filler words
⚠ Make answers more concise


# 🏗️ System Design Interviews

VertoMock AI supports system-design interviews for engineering roles.

Example problems:

* Design YouTube
* Design WhatsApp
* Design Uber
* Design Netflix
* Design URL Shortener
* Design Chat Application
* Design Distributed Cache

The AI evaluates:

Requirement Gathering
        ↓
Architecture
        ↓
Database Design
        ↓
Scalability
        ↓
Caching
        ↓
Load Balancing
        ↓
Fault Tolerance
        ↓
Trade-offs


The AI can dynamically ask questions such as:

> How would you scale this system to 10 million users?

> What happens if the database fails?

> Where would you introduce caching?

---

# 👨‍💼 HR Interview

The HR module simulates behavioral interviews.

Example questions:

* Tell me about yourself.
* Why should we hire you?
* What are your strengths?
* What are your weaknesses?
* Why do you want to join this company?
* Describe a challenging situation.
* Tell me about a conflict you faced.
* Where do you see yourself in five years?

The AI evaluates:

* Communication
* Confidence
* Relevance
* Professionalism
* Answer structure
* Behavioral reasoning

---

# 🤖 AI/ML Interviews

Dedicated AI/ML interviews cover:

* Machine Learning
* Deep Learning
* NLP
* Computer Vision
* Transformers
* LLMs
* RAG
* Vector Databases
* Model Evaluation
* MLOps

The AI can dynamically increase the difficulty based on candidate performance.

---

# 📊 Automated Evaluation

After every answer, the AI generates structured evaluation data.

Example:

```json
{
  "correctness": 85,
  "technical_depth": 80,
  "communication": 88,
  "problem_solving": 84,
  "relevance": 90,
  "overall": 85,
  "strengths": [],
  "weaknesses": [],
  "follow_up_required": true
}
```

This structured evaluation is stored and used to generate the final interview report.

---

# 🎯 Interview Readiness Score

VertoMock AI calculates an overall readiness score based on multiple performance dimensions.

Example weighting:


Technical Knowledge      25%
Problem Solving          20%
Coding                   20%
Communication            15%
System Design            10%
Behavioral               10%


Example:

Overall Readiness

       86 / 100

Status: Strong Candidate


Readiness levels:

92+       Excellent
80–91     Strong
70–79     Good
60–69     Needs Improvement
<60       Requires Preparation


# 📋 Interview Reports

After completing an interview, the platform generates a detailed AI-powered report.

The report contains:

* Overall score
* Category scores
* Technical performance
* Coding performance
* Communication performance
* Problem-solving performance
* Strengths
* Weaknesses
* AI-generated summary
* Recommended topics
* Personalized improvement plan

Example:

Overall Score: 86

Technical Knowledge: 90
Coding:              84
Communication:       82
Problem Solving:     88
System Design:       79
HR:                  91


# 📈 Performance Analytics

Candidates can track their improvement over multiple interviews.

Analytics include:

* Score progression
* Topic performance
* Coding accuracy
* Communication improvement
* Weak-topic trends
* Strong-topic trends
* Interview history
* Readiness progression

Example:


Interview 1 → 68
Interview 2 → 74
Interview 3 → 79
Interview 4 → 86


# 📚 Practice Mode

Candidates can practice individual subjects without starting a complete interview.

Available topics include:

DSA
OOP
DBMS
Operating Systems
Computer Networks
System Design
AI/ML
JavaScript
React
Node.js
MongoDB
Python


Practice modes:

* Quick Practice
* Topic Practice
* Timed Practice
* Weak Area Practice

---

# 🎯 Personalized Improvement Plan

The platform analyzes previous interviews and automatically identifies areas that require improvement.

Example:


Weak Areas

1. Dynamic Programming
2. Distributed Systems
3. Operating Systems

Recommended Plan

Day 1 → Arrays + Hashing
Day 2 → Trees + Graphs
Day 3 → DBMS + SQL
Day 4 → Operating Systems
Day 5 → System Design
Day 6 → Full Mock Interview
Day 7 → Weak-Area Revision


# ⚡ Real-Time Interview Architecture

VertoMock AI uses **Socket.IO** for real-time interview communication.


React Client
     │
     │ Socket.IO
     ▼
Node.js Server
     │
     ▼
Interview Engine
     │
     ▼
FastAPI AI Service
     │
     ▼
Groq API
     │
     ▼
Evaluation
     │
     ▼
Socket.IO
     │
     ▼
React Client


Real-time events include:

interview:start
interview:question
interview:answer
interview:followup
interview:timer
interview:progress
interview:evaluation
interview:end



# 🏗️ System Architecture


                         ┌─────────────────────┐
                         │     React + Vite    │
                         │     Tailwind CSS    │
                         └──────────┬──────────┘
                                    │
                       ┌────────────┼────────────┐
                       │            │            │
                       ▼            ▼            ▼
                    REST API    Socket.IO      WebRTC
                       │            │            │
                       └────────────┼────────────┘
                                    ▼
                         ┌─────────────────────┐
                         │   Node.js + Express │
                         │     API Gateway     │
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
              MongoDB            Redis*          FastAPI
           Application Data     Cache/Session    AI Service
                                                      │
                                      ┌───────────────┼───────────────┐
                                      │               │               │
                                      ▼               ▼               ▼
                                  Groq API         Whisper        AI/ML Models


* Redis can be introduced for production-grade caching, session management, and rate limiting.`


# 🔧 Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Monaco Editor
* WebRTC
* Socket.IO Client
* Recharts
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* HTTP-only Cookies
* Socket.IO
* Multer
* Nodemailer / Brevo

## AI Service

* Python
* FastAPI
* Pydantic
* Groq API
* Whisper
* PyTorch
* NumPy
* Pandas
* scikit-learn

## Infrastructure

* Docker
* Docker Compose
* Redis
* GitHub

---

# 📂 Project Structure

VertoMock-AI/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── routes/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── socket/
│   └── package.json
│
├── ai-service/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── prompts/
│   │   ├── schemas/
│   │   └── utils/
│   └── requirements.txt
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   └── ai-pipeline.md
│
├── docker-compose.yml
├── .gitignore
├── .env.example
└── README.md


# 🔄 Complete Practical Workflow

User Signup
     ↓
Email Verification
     ↓
Complete Profile
     ↓
Upload Resume
     ↓
AI Resume Analysis
     ↓
Select Target Role
     ↓
Select Interview Type
     ↓
Configure Difficulty & Duration
     ↓
Create Interview Session
     ↓
AI Generates Personalized Questions
     ↓
Interview Starts
     ↓
AI Asks Question
     ↓
Candidate Answers
     ↓
Whisper Transcription (Voice)
     ↓
AI Evaluation
     ↓
Difficulty Adjustment
     ↓
Dynamic Follow-up
     ↓
Coding Round
     ↓
Code Execution & Evaluation
     ↓
System Design / HR
     ↓
Interview Completion
     ↓
Final AI Evaluation
     ↓
Readiness Score
     ↓
Detailed Interview Report
     ↓
Personalized Improvement Plan
     ↓
Analytics Dashboard




# 🔐 Security

The platform implements:

* JWT authentication
* HTTP-only cookies
* Password hashing
* Protected routes
* Role-based authorization
* CORS configuration
* Helmet security headers
* Rate limiting
* Input validation
* File validation
* File size restrictions
* Secure environment variables
* Authenticated Node.js ↔ FastAPI communication

Sensitive credentials are never exposed to the frontend.

---

# ⚡ Performance & Scalability

VertoMock AI is designed to support:

> **100+ interview sessions daily**

Performance considerations include:

* Database indexing
* Pagination
* Caching
* Async AI processing
* Connection pooling
* AI request optimization
* Token-efficient prompts
* Socket.IO session management
* Rate limiting
* API timeouts
* Graceful AI failure handling

The architecture can be horizontally scaled by running multiple backend and AI-service instances behind a load balancer.

---

# 🧠 AI Prompt Architecture

The AI system uses specialized prompts for different tasks:


Resume Analyzer
       ↓
Question Generator
       ↓
Answer Evaluator
       ↓
Follow-up Generator
       ↓
Coding Evaluator
       ↓
Communication Analyzer
       ↓
System Design Evaluator
       ↓
Interview Summarizer
       ↓
Improvement Planner


Each AI request receives structured context such as:

Candidate Profile
Resume Summary
Target Role
Interview Type
Difficulty
Previous Questions
Previous Answers
Current Topic
Current Question
Current Answer
Evaluation Criteria


This allows the AI to maintain context without repeatedly sending unnecessary conversation history.

---

# 🗄️ Database Design

Main MongoDB collections:


users
resumes
interviews
questions
answers
evaluations
codingSubmissions
reports
practiceSessions


Relationship:


User
 │
 ├── Resume
 │
 ├── Interview Sessions
 │      │
 │      ├── Questions
 │      ├── Answers
 │      ├── Coding Submissions
 │      └── Evaluations
 │
 └── Reports




# 🔌 API Architecture

### Authentication

```text
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/verify-email
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/me
```

### Resume

```text
POST   /api/resume/upload
GET    /api/resume
GET    /api/resume/:id
DELETE /api/resume/:id
```

### Interviews

```text
POST /api/interviews
GET  /api/interviews
GET  /api/interviews/:id
POST /api/interviews/:id/start
POST /api/interviews/:id/answer
POST /api/interviews/:id/end
```

### Coding

```text
POST /api/coding/run
POST /api/coding/submit
GET  /api/coding/:submissionId
```

### Reports

```text
GET /api/reports
GET /api/reports/:id
```

### Analytics

```text
GET /api/analytics/overview
GET /api/analytics/performance
GET /api/analytics/topics
```

---

# 🛠️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/<your-username>/VertoMock-AI.git
cd VertoMock-AI
```

## 2. Install Frontend

```bash
cd client
npm install
```

## 3. Install Backend

```bash
cd ../server
npm install
```

## 4. Install AI Service

```bash
cd ../ai-service

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create `.env` files based on `.env.example`.

### Frontend

```env
VITE_API_URL=
VITE_SOCKET_URL=
```

### Node.js Backend

```env
PORT=
MONGO_URI=
JWT_SECRET=
FRONTEND_URL=
FASTAPI_URL=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

### FastAPI

```env
GROQ_API_KEY=
WHISPER_MODEL=
NODE_BACKEND_URL=
```

Never commit `.env` files to GitHub.

---

# ▶️ Running the Application

### Start Frontend

```bash
cd client
npm run dev
```

### Start Node.js Backend

```bash
cd server
npm run dev
```

### Start FastAPI

```bash
cd ai-service
uvicorn app.main:app --reload
```

The frontend communicates with the Node.js backend, while the Node.js backend communicates with the FastAPI AI service.

---

# 🐳 Docker

The project can be containerized using Docker Compose.

```bash
docker-compose up --build
```

Services:


Frontend
Backend
AI Service
MongoDB
Redis




# 🧪 Testing

The project should include tests for:

### Frontend

* Components
* Forms
* Interview UI
* Authentication

### Backend

* Authentication APIs
* Interview APIs
* Database operations
* Socket events

### AI Service

* Resume extraction
* Question generation
* Evaluation
* JSON schema validation

### End-to-End


Signup
   ↓
Login
   ↓
Resume Upload
   ↓
Interview Setup
   ↓
Interview
   ↓
Evaluation
   ↓
Report



# 📊 Project Metrics

VertoMock AI is designed around measurable performance and scalability goals:

| Metric                   |    Target |
| ------------------------ | --------: |
| Daily Interview Sessions |      100+ |
| Role-Specific Questions  |      500+ |
| AI Evaluation Time       |   Seconds |
| Interview Types          |        6+ |
| Coding Languages         |        4+ |
| Real-Time Communication  | Supported |
| Voice Interviews         | Supported |
| Resume-Based Questions   | Supported |
| Dynamic Follow-ups       | Supported |
| Performance Analytics    | Supported |

---

# 🔮 Future Enhancements

Planned improvements include:

* 🎥 Advanced video-interview analysis
* 👁️ Non-verbal behavior analysis
* 🗣️ Advanced speech-confidence analysis
* 🧑‍💼 Company-specific interview simulations
* 🏢 Company question patterns
* 📱 Mobile application
* 🏆 Leaderboards
* 📅 Interview scheduling
* 🔔 Personalized reminders
* 🌍 Multi-language interviews
* 🧠 Advanced candidate memory
* 📚 AI-generated learning resources
* 🎯 Job-description-driven interviews
* 🔗 LinkedIn/GitHub profile analysis
* 📈 Long-term career readiness tracking

---

# 🎯 Why VertoMock AI?

VertoMock AI combines multiple technologies into a single practical AI application:


Generative AI
      +
Resume Intelligence
      +
Speech AI
      +
Real-Time Communication
      +
Code Execution
      +
Adaptive Decision Making
      +
Automated Evaluation
      +
Data Analytics


Instead of simply asking predefined questions, VertoMock AI creates a **dynamic interview environment that continuously understands, evaluates, and adapts to the candidate.**

---

# 👨‍💻 Author

**Shaik Mahaboob Basha**

B.Tech Computer Science & Engineering

---

# ⭐ Project Vision

> **VertoMock AI aims to make high-quality interview preparation accessible by providing every candidate with an intelligent, personalized, and realistic AI interviewer.**

If this project helps you, consider giving the repository a ⭐ on GitHub.
