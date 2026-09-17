# AI Smart Campus Incident Management System (SCIMS)

> An intelligent MERN-based framework for campus incident analysis, triage, assignment, notification, and resolution.

---

## 1. Project Overview

The **AI Smart Campus Incident Management System (SCIMS)** is a web-based intelligent incident management platform designed to improve the way campus incidents and complaints are reported, analyzed, prioritized, assigned, and tracked.

The system combines a **MERN-based web architecture** with **Google Gemini AI** to assist in the automated analysis of reported campus incidents.

SCIMS provides a structured workflow from incident submission to resolution:

**Incident Reporting → AI Analysis → Classification → Priority Assessment → Emergency Detection → Duplicate Detection → Faculty Recommendation → Assignment → Notification → Resolution Tracking**

The project is developed as a **functional research prototype** for an academic project and research study.

---

## 2. Problem Statement

Traditional campus complaint and incident management processes may depend heavily on manual reporting, classification, assignment, and follow-up.

This can result in:

- Delayed incident classification
- Manual prioritization of complaints
- Difficulty identifying duplicate complaints
- Inefficient assignment of incidents to faculty members
- Limited visibility into complaint status
- Delayed communication between users and responsible faculty
- Difficulty managing large numbers of campus incidents

SCIMS aims to address these challenges through an intelligent and centralized incident management framework.

---

## 3. Research Objectives

The major objectives of SCIMS are:

1. Develop a centralized campus incident reporting platform.
2. Automate incident classification using AI.
3. Predict incident priority using AI-assisted analysis.
4. Detect potentially emergency-related incidents.
5. Identify duplicate and semantically similar complaints.
6. Recommend suitable faculty members for incident assignment.
7. Consider faculty workload during assignment.
8. Provide real-time incident notifications.
9. Maintain incident history and status tracking.
10. Establish a framework that can be further evaluated using real-world campus datasets.

---

## 4. Key Features

### Incident Reporting

- Student and faculty incident reporting
- Structured incident information
- Incident description and category handling
- Location information
- Anonymous reporting support
- Incident status tracking

### AI-Assisted Incident Analysis

- Automatic incident categorization
- Priority prediction
- Emergency detection
- AI confidence information
- AI-generated incident summary
- AI reasoning/explanation

### Duplicate Detection

- Duplicate complaint identification
- Semantic similarity analysis
- Historical complaint comparison
- Reduction of repeated incident handling

### Intelligent Faculty Recommendation

- Faculty recommendation
- Workload-aware assignment
- Recommendation reasoning
- Assignment score information

### Real-Time Communication

- Socket.IO-based real-time communication
- Real-time notifications
- User connection management
- Incident status updates

### Authentication and Authorization

- User authentication
- JWT-based authentication
- Password hashing using bcrypt
- Role-based application functionality

### Incident Tracking

- Complaint history
- Assigned faculty information
- Notification records
- Resolution/status tracking

---

## 5. System Workflow

The overall SCIMS workflow is:

```text
┌───────────────────────────┐
│ Student / Faculty         │
│ Reports an Incident      │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ Incident Data Collection  │
│ Description / Location    │
│ Additional Information    │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ AI Incident Analysis      │
│                           │
│ • Category               │
│ • Priority               │
│ • Emergency Detection    │
│ • Confidence             │
│ • Summary / Reason       │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ Duplicate Detection       │
│                           │
│ • Duplicate Check         │
│ • Semantic Comparison     │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ Faculty Recommendation    │
│                           │
│ • Suitable Faculty        │
│ • Workload Consideration  │
│ • Recommendation Score    │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ Incident Assignment       │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ Real-Time Notification    │
│        Socket.IO          │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ Incident Resolution       │
│ & Status Tracking         │
└───────────────────────────┘
________________________________________
6. Technology Stack
Frontend
•	React 
•	Vite 
•	React Router 
•	Axios 
•	Tailwind CSS 
•	Framer Motion 
•	React Hook Form 
•	Chart.js 
•	React Icons 
•	React Hot Toast / React Toastify 
•	SweetAlert2 
Backend
•	Node.js 
•	Express.js 
•	Socket.IO 
•	Multer 
•	Nodemailer 
Database
•	MongoDB 
•	Mongoose 
Artificial Intelligence
•	Google Gemini API 
•	@google/genai 
Authentication & Security
•	JSON Web Token (JWT) 
•	bcryptjs 
•	dotenv 
•	CORS 
Development Tools
•	Git 
•	GitHub 
•	VS Code 
•	Nodemon 
•	ESLint 
________________________________________
7. Project Architecture
SCIMS follows a client-server architecture.
                    ┌──────────────────────┐
                    │      SCIMS Users     │
                    │ Student / Faculty /  │
                    │        Admin         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │                      │
                    │ Pages                │
                    │ Components           │
                    │ Context              │
                    │ Services             │
                    │ Routes               │
                    └──────────┬───────────┘
                               │
                         HTTP / REST
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express Backend    │
                    │                      │
                    │ Routes               │
                    │ Controllers          │
                    │ Services             │
                    │ Middleware           │
                    │ Validators           │
                    └───────┬───────┬──────┘
                            │       │
                  ┌─────────┘       └──────────┐
                  ▼                            ▼
        ┌──────────────────┐          ┌──────────────────┐
        │    MongoDB       │          │   Gemini AI      │
        │                  │          │                  │
        │ Users            │          │ Classification   │
        │ Complaints       │          │ Priority         │
        │ Notifications    │          │ Emergency        │
        │ History          │          │ Summary          │
        └──────────────────┘          └──────────────────┘
                            │
                            ▼
                    ┌──────────────────┐
                    │    Socket.IO     │
                    │ Real-Time Events │
                    │ & Notifications  │
                    └──────────────────┘
________________________________________
8. AI Components
SCIMS integrates AI-assisted functionality into the incident-management workflow.
8.1 Incident Classification
The AI analyzes the reported incident and assigns an appropriate incident category.
8.2 Priority Prediction
The system uses AI-assisted analysis to determine an incident priority level.
8.3 Emergency Detection
Reported incidents can be analyzed for potential emergency conditions.
8.4 AI Confidence
The system records an AI confidence value associated with the analysis.
8.5 AI Summary
The incident can be summarized automatically to assist faculty and administrators in understanding the reported issue.
8.6 AI Reasoning
The system can retain reasoning information associated with the AI analysis.
8.7 Duplicate Detection
SCIMS contains functionality for detecting potentially duplicate incidents.
8.8 Semantic Duplicate Detection
Semantic comparison is used to identify incidents that may have similar meaning even when their wording is different.
8.9 Faculty Recommendation
The system provides faculty recommendations using incident information and workload-related information.
Research note: The AI components are part of the project's functional prototype. Formal statistical validation on a representative labelled campus dataset is considered an important part of future research evaluation.
________________________________________
9. User Roles
SCIMS is designed around three primary user roles.
Student
Students can:
•	Submit incidents 
•	Provide incident information 
•	Report incidents anonymously where supported 
•	View submitted incidents 
•	Track incident status 
•	Receive relevant notifications 
Faculty
Faculty members can:
•	View assigned incidents 
•	Review incident information 
•	Receive notifications 
•	Manage incident status 
•	Participate in incident resolution 
Administrator
Administrators can:
•	Manage users and campus incident information 
•	Monitor reported incidents 
•	Manage assignments 
•	Monitor system activity 
•	Support overall incident management 
________________________________________
10. Project Folder Structure
The major project structure is:
SCIMS/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── styles/
│   │   └── utils/
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── evaluation/
│   ├── middleware/
│   ├── models/
│   ├── prompts/
│   ├── routes/
│   ├── services/
│   ├── testing/
│   ├── uploads/
│   ├── utils/
│   ├── validators/
│   │
│   ├── .env.example
│   ├── package.json
│   ├── app.js
│   └── server.js
│
├── database/
│
├── .gitignore
├── LICENSE
└── README.md
________________________________________
11. Prerequisites
Before running SCIMS locally, install:
•	Node.js 
•	npm 
•	MongoDB or a MongoDB Atlas database 
•	Git 
•	A Google Gemini API key 
•	A modern web browser 
Recommended development environment:
Node.js
npm
MongoDB
Git
VS Code
________________________________________
12. Environment Variables
The backend uses environment variables for configuration and sensitive credentials.
Create a local:
server/.env
based on:
server/.env.example
Example configuration:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key
Important
Do not commit .env to GitHub.
Only the following template should be committed:
server/.env.example
________________________________________
13. Installation
Clone the repository:
git clone <YOUR_GITHUB_REPOSITORY_URL>
Enter the project:
cd SCIMS
Install Backend Dependencies
cd server
npm install
Install Frontend Dependencies
Open another terminal or return to the project root:
cd ../client
npm install
________________________________________
14. MongoDB Setup
SCIMS uses MongoDB through Mongoose.
You can use either:
•	Local MongoDB 
•	MongoDB Atlas 
Configure the connection string in:
server/.env
Example:
MONGODB_URI=your_mongodb_connection_string
The backend initializes the database connection when the server starts.
________________________________________
15. Running the Backend
Navigate to the server directory:
cd server
For development:
npm run dev
For normal execution:
npm start
The backend uses:
http://localhost:5000
by default.
________________________________________
16. Running the Frontend
Navigate to the client directory:
cd client
Start the Vite development server:
npm run dev
The frontend normally runs at:
http://localhost:5173
The backend Socket.IO configuration is currently configured to allow the local Vite frontend origin:
http://localhost:5173
________________________________________
17. Production Build
To create a production frontend build:
cd client
npm run build
To preview the production build locally:
npm run preview
________________________________________
18. Security & GitHub Guidelines
The repository follows basic security practices for public-source-code management.
Environment Security
Sensitive environment files should never be committed:
.env
The repository instead contains:
.env.example
with placeholder values.
Dependency Security
Generated dependency directories such as:
node_modules/
are excluded from Git.
Uploaded Files
Runtime uploaded/generated files are excluded from Git.
The upload directory is preserved using:
server/uploads/.gitkeep
Logs
Runtime logs and temporary files are excluded from Git.
API Keys
API keys and other credentials must remain outside the repository.
Before publishing the repository, contributors should verify that no:
•	API keys 
•	passwords 
•	database credentials 
•	JWT secrets 
•	private keys 
•	personal credentials 
are included in tracked files.
________________________________________
19. Research & Evaluation
SCIMS is developed as an academic research prototype investigating the application of artificial intelligence to campus incident management.
The research focuses on:
•	AI-assisted incident classification 
•	Priority prediction 
•	Emergency detection 
•	Duplicate detection 
•	Semantic similarity 
•	Intelligent faculty recommendation 
•	Workload-aware assignment 
•	Real-time incident management 
Evaluation Direction
Future controlled evaluation should use a representative labelled dataset and measure appropriate metrics such as:
•	Accuracy 
•	Precision 
•	Recall 
•	F1-score 
•	Confusion matrix 
•	Duplicate-detection performance 
•	Faculty recommendation performance 
•	Processing latency 
•	AI failure/error rate 
Evaluation should distinguish between:
1.	Correct AI predictions 
2.	Incorrect predictions 
3.	AI service failures 
4.	Fallback responses 
5.	Processing-time measurements 
This distinction is important for producing scientifically valid research results.
Existing prototype evaluation outputs should not automatically be interpreted as statistically validated real-world performance. Controlled experiments using a properly labelled dataset are required for stronger research conclusions.
________________________________________
20. Future Scope
Potential future extensions include:
Dataset Development
•	Creation of an anonymized campus incident dataset 
•	Human-labelled training/evaluation data 
•	Multilingual campus incident datasets 
AI Improvements
•	Improved incident classification 
•	Advanced priority prediction 
•	Multimodal incident analysis 
•	Image-based incident understanding 
•	Voice-based incident processing 
•	Context-aware incident reasoning 
Advanced Analytics
•	Incident trend analysis 
•	Campus safety dashboards 
•	Predictive incident analysis 
•	Incident hotspot identification 
•	Predictive maintenance integration 
Intelligent Management
•	Improved faculty recommendation 
•	Advanced workload balancing 
•	Automated escalation 
•	SLA-based incident prioritization 
•	Intelligent resolution recommendations 
Smart Campus Integration
Future versions could integrate SCIMS with:
•	IoT sensors 
•	Campus security systems 
•	Emergency systems 
•	Smart infrastructure 
•	Mobile applications 
•	Institutional communication platforms 
________________________________________
21. Contributors
Project Developer
Divyakumar Patel
B.Tech Computer Science / Computer Engineering
Silver Oak University
Project Guide
Sanket Shah
Silver Oak University
Contributor and authorship information should be updated according to the official college/research-paper requirements.
________________________________________
22. Academic Context
This project is developed as an academic Advanced Programming with Project-I project for the B.Tech CE/CSE program.
Academic Year: 2026–27
Semester: 7
Institution: Silver Oak University / Silver Oak College of Engineering and Technology
Project Title
AI Smart Campus Incident Management System
Research Paper Title
AI Smart Campus Incident Management System: An Intelligent Framework for Campus Incident Analysis, Triage, Assignment, and Resolution
Research Area
•	Artificial Intelligence 
•	Smart Campus 
•	Incident Management 
•	Natural Language Processing 
•	Intelligent Classification 
•	Semantic Similarity 
•	Recommendation Systems 
•	Real-Time Web Applications 
•	Campus Safety and Management 
________________________________________
23. License
This project is intended primarily for academic and research purposes.
See the repository LICENSE file for the applicable license terms.
________________________________________
24. Disclaimer
SCIMS is an academic research prototype.
AI-generated classifications, priorities, emergency assessments, summaries, recommendations, and related outputs should be reviewed by authorized personnel before being used for real-world campus decisions.
The system should not be considered a replacement for official emergency services, campus security procedures, or institutional decision-making processes.
________________________________________
25. Project Status
Status: Functional Academic Research Prototype
The project is being developed and evaluated as part of the B.Tech academic project and associated research work.
Further validation, dataset development, performance evaluation, and deployment hardening are planned as part of future research.

