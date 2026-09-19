# 🛡️ CivicShield AI

## Intelligent Citizen Grievance & Smart Government Routing System

CivicShield AI is an AI-powered civic complaint management platform designed to make it easier for citizens to report public issues and for authorities to manage, classify, prioritize, and track those complaints efficiently.

The platform combines a modern React frontend, Java Spring Boot backend, PostgreSQL database, JWT-based authentication, and local AI/NLP capabilities to create a practical smart-government solution.

---

## 🚀 Project Overview

Citizens can submit complaints related to common civic problems such as:

- 🕳️ Potholes and road damage
- 🗑️ Garbage and waste management
- 💡 Street light issues
- 💧 Water leakage
- 🌊 Drainage problems
- 🚦 Traffic-related issues
- 🏥 Public health concerns
- 🛣️ Other infrastructure-related problems

Each complaint can be tracked using a unique tracking token, while authorities can access and manage complaints based on their role.

The system also uses AI to analyze complaint information and assist with classification, prioritization, department routing, and complaint summarization.

---

## ✨ Key Features

### 👤 Citizen Features

- Citizen registration and login
- Secure JWT-based authentication
- Anonymous civic complaint submission
- Complaint category selection
- Complaint tracking using a unique tracking token
- My Complaints dashboard
- Complaint status tracking
- Complaint details and history
- Responsive user interface

### 🏛️ Authority Features

- Secure authority login
- Role-based access
- View submitted complaints
- Analyze complaint details
- Manage complaint status
- Department-based complaint handling
- Priority-based complaint management

### 🤖 AI-Powered Features

CivicShield AI integrates AI/NLP capabilities to assist with:

- Complaint analysis
- Complaint categorization
- Priority identification
- Department routing
- Complaint summarization
- Understanding the context of citizen complaints

The project currently uses a local AI setup through **Ollama** and the **Llama 3.2** model.

---

## 🔄 How the System Works

```text
Citizen
   ↓
Register / Login
   ↓
Submit Civic Complaint
   ↓
Complaint Stored in PostgreSQL
   ↓
AI Analysis
   ↓
Category + Priority + Department
   ↓
Authority Dashboard
   ↓
Complaint Processing
   ↓
Status Updates
   ↓
Citizen Tracks Complaint


🧠 AI Workflow

The AI component is designed to understand the complaint submitted by a citizen and assist the system in deciding:

Complaint Text
      ↓
AI Analysis
      ↓
Complaint Understanding
      ↓
Category Identification
      ↓
Priority Identification
      ↓
Department Routing
      ↓
Complaint Summary

This helps reduce manual classification and provides a structured way to process civic complaints.



🏗️ System Architecture
                    ┌──────────────────────┐
                    │      Citizen         │
                    │   React Frontend     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Spring Boot      │
                    │    REST Backend     │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌─────────────┐  ┌──────────────┐  ┌─────────────┐
       │ PostgreSQL  │  │ JWT Security │  │  AI / NLP   │
       │  Database   │  │ Authentication│  │   Ollama    │
       └─────────────┘  └──────────────┘  └─────────────┘
                                                │
                                                ▼
                                         ┌─────────────┐
                                         │ Llama 3.2   │
                                         └─────────────┘
🛠️ Technology Stack
Frontend
React.js
Vite
JavaScript
HTML5
CSS3
Responsive UI
Backend
Java
Spring Boot
Spring REST APIs
JWT Authentication
Role-Based Access Control
Database
PostgreSQL
AI / NLP
Ollama
Llama 3.2
AI-assisted complaint analysis
Development Tools
IntelliJ IDEA
Visual Studio Code
Postman
Git
GitHub
📁 Project Structure
civicshield-ai/
│
├── civicshield-backend/
│   │
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── ...
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── civicshield-frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
⚙️ Local Setup
1️⃣ Clone the Repository
git clone https://github.com/shaiksaidabi/civicshield-AI-Civic-Complaint-Management-System.git
cd civicshield-ai
2️⃣ Database Setup

Install PostgreSQL and create a database named:

civicshield

Configure the database connection in the backend configuration.

For security, use your own local database credentials and avoid committing real passwords or secrets to GitHub.

3️⃣ Setup Ollama

Install Ollama and make sure it is running locally.

Pull the required model:

ollama pull llama3.2

Ollama runs locally and is used by CivicShield AI for AI-powered complaint analysis.

▶️ Running the Backend

Open a terminal inside:

civicshield-backend

On Windows:

.\mvnw.cmd spring-boot:run

The backend runs on:

http://localhost:8080

API base URL:

http://localhost:8080/api
▶️ Running the Frontend

Open another terminal inside:

civicshield-frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Then open the URL displayed by Vite in your browser.

🔐 Security

CivicShield AI includes security mechanisms such as:

JWT-based authentication
Role-based access control
Protected API endpoints
Secure citizen and authority access
Separation of citizen and authority functionality

Sensitive credentials and API secrets should always be stored locally or through environment variables rather than being committed to the public repository.

📡 API Overview

The application exposes REST APIs for major operations such as:

POST   /api/auth/register
POST   /api/auth/login

POST   /api/complaints
GET    /api/complaints/my
GET    /api/complaints/{trackingToken}

Additional APIs are used for authority operations, complaint management, authentication, and AI-powered processing.

🤖 AI-Assisted Development

AI has been used in this project in two different ways.

1. AI as a Development Assistant

AI tools were used during development for:

Exploring project ideas
Designing application workflows
UI/UX improvements
Debugging
Problem solving
Code assistance
Understanding errors
Iterating on features
2. AI Inside the Application

AI is also a core part of CivicShield AI itself.

The application uses local AI/NLP capabilities to assist with:

Complaint understanding
Classification
Priority identification
Department routing
Complaint summarization

This makes AI not only a development tool, but also an important component of the actual application.

📍 Future Enhancements

The project is continuously being improved.

Planned enhancements include:

🗺️ Interactive map-based complaint location selection
📍 Automatic latitude and longitude capture
📸 Image upload for complaint evidence
🔔 Complaint status notifications
📊 Advanced authority analytics
📈 Complaint trend dashboards
🤖 Improved AI-based classification
🔎 Advanced complaint search and filtering
📱 Further mobile responsiveness improvements
🎯 Project Goal

The main goal of CivicShield AI is to demonstrate how modern technologies such as:

Java + Spring Boot + React + PostgreSQL + JWT + AI/NLP

can be combined to build a practical civic technology platform.

The project focuses on improving the way civic complaints can be submitted, understood, routed, managed, and tracked.

🌟 Why CivicShield AI?

Traditional complaint systems can require citizens to manually identify departments and provide structured information.

CivicShield AI aims to simplify this process by allowing citizens to describe their problems naturally while using AI to assist with organizing and routing the complaint.

Citizen's Problem
       ↓
Natural Complaint
       ↓
AI Understanding
       ↓
Category
       ↓
Priority
       ↓
Department
       ↓
Authority Action
       ↓
Citizen Tracking


📌 Project Status

🚧 Actively developing and improving

New features, UI improvements, AI capabilities, and usability enhancements are being added as the project evolves.

👨‍💻 Developer

Shaik Saidabi

GitHub:
https://github.com/shaiksaidabi

Project Repository:
https://github.com/shaiksaidabi/civicshield-AI-Civic-Complaint-Management-System

