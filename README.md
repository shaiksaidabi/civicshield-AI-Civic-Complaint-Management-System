# 🛡️ CivicShield AI

## Anonymous Citizen Grievance & Smart Government Routing System

CivicShield AI is an AI-powered civic complaint management platform designed to make reporting public issues simpler, smarter, and more organized.

The platform allows citizens to report civic problems such as road damage, potholes, garbage, street-light issues, water leakage, drainage problems, and other public-service concerns.

The system uses AI to analyze complaints and assist in determining the appropriate **department, priority, and complaint summary**, helping authorities process civic issues more efficiently.

---

# 🚀 Project Overview

CivicShield AI combines:

- 🤖 Artificial Intelligence
- 🌐 Full-Stack Web Development
- 🔐 JWT Authentication
- 🏛️ Role-Based Access
- 📊 Complaint Management
- 🗄️ PostgreSQL Database
- 🔌 REST APIs
- 🧠 AI/NLP Integration

The main goal is to provide a centralized platform where citizens can submit civic complaints and authorities can efficiently review, manage, and update them.

---

# ✨ Key Features

## 👤 Citizen Features

- Citizen registration
- Citizen login
- Secure JWT authentication
- Anonymous complaint submission
- Complaint category handling
- Unique complaint tracking token
- My Complaints dashboard
- Complaint status tracking
- Complaint details and history
- Responsive user interface

## 🏛️ Authority Features

Authorities can manage complaints assigned to their department.

The authority dashboard provides functionality for:

- Viewing complaints
- Filtering complaints
- Viewing complaint details
- Checking priority
- Updating complaint status
- Monitoring department-level complaints
- Viewing dashboard statistics

---

# 📊 Complaint Status

Complaints can move through different stages:

```text
PENDING
   ↓
IN_PROGRESS
   ↓
RESOLVED
```

---

# 🤖 AI-Powered Complaint Analysis

One of the core features of CivicShield AI is AI-assisted complaint analysis.

When a citizen submits a complaint, the system can analyze the complaint content and generate structured information such as:

## 🏛️ Department Classification

The complaint can be classified into an appropriate department.

Examples:

```text
WOMEN_SAFETY
PUBLIC_WORKS
MUNICIPAL
ELECTRICITY
HEALTH
```

## 🚩 Priority Classification

The system can determine the urgency of a complaint.

Examples:

```text
CRITICAL
HIGH
NORMAL
```

## 📝 AI Summary

The complaint can also be summarized into a concise description that helps authorities quickly understand the reported issue.

---

# 🧠 AI-Assisted Development

AI was also used as a development assistant during the creation of CivicShield AI.

AI-assisted development was used for:

- 💡 Exploring implementation ideas
- 🎨 UI/UX improvements
- 🐛 Debugging
- 🔍 Problem solving
- 🧩 Code assistance
- 🔄 Iterative development
- 📚 Understanding unfamiliar concepts
- ✨ Improving the overall user experience

At the same time, AI/NLP is incorporated directly into the application for complaint analysis.

This project demonstrates how AI can be used both **during software development** and **inside a real-world application**.

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       Citizen        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │      User Portal     │
                    └──────────┬───────────┘
                               │
                            REST APIs
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌────────────┐   ┌─────────────┐   ┌─────────────┐
       │ PostgreSQL │   │ AI Analysis │   │ JWT Security│
       │  Database  │   │    Layer    │   │             │
       └────────────┘   └──────┬──────┘   └─────────────┘
                               │
                               ▼
                        ┌─────────────┐
                        │ Local Ollama│
                        │     LLM     │
                        └─────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

- React.js
- JavaScript
- HTML
- CSS
- Vite

## Backend

- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- Maven

## Database

- PostgreSQL
- Hibernate / JPA

## AI / NLP

- Local AI integration
- Ollama
- Llama 3.2

## Security

- JWT Authentication
- Role-Based Authorization

## Development Tools

- IntelliJ IDEA
- Visual Studio Code
- Postman
- Git
- GitHub

---

# 📂 Project Structure

```text
civicshield-ai/
│
├── civicshield-backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── civicshield/
│   │   │   │           ├── ai/
│   │   │   │           ├── controller/
│   │   │   │           ├── dto/
│   │   │   │           ├── entity/
│   │   │   │           ├── exception/
│   │   │   │           ├── repository/
│   │   │   │           ├── security/
│   │   │   │           └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── civicshield-frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🔄 Complaint Workflow

```text
Citizen
   │
   ▼
Register / Login
   │
   ▼
Submit Complaint
   │
   ▼
Complaint Stored
   │
   ▼
AI Analysis
   │
   ├── Department
   ├── Priority
   └── Summary
   │
   ▼
Complaint Tracking Token Generated
   │
   ▼
Authority Reviews Complaint
   │
   ▼
Status Updated
   │
   ▼
Citizen Tracks Complaint
```

---

# 🔐 Security

CivicShield AI uses JWT-based authentication to protect application endpoints.

The application also uses role-based access control.

## 👤 Citizen

```text
CITIZEN
```

Citizens can:

- Submit complaints
- View their complaints
- Track complaints

## 🏛️ Authority

```text
AUTHORITY
```

Authorities can:

- View department complaints
- Manage complaints
- Update complaint status
- Monitor complaint statistics

---

# 📍 Location-Based Complaints

The project is being enhanced to support location-based complaint reporting.

The planned workflow is:

```text
Citizen submits complaint
        ↓
Browser requests location permission
        ↓
Latitude & Longitude obtained automatically
        ↓
Location stored with complaint
        ↓
Complaint displayed on map
```

This will allow citizens to report the location of an issue without manually entering latitude and longitude values.

---

# 📊 Dashboard

The system provides dashboards for different user roles.

## 👤 Citizen Dashboard

```text
Submit Complaint
       │
       ├── Track Complaint
       │
       └── My Complaints
```

## 🏛️ Authority Dashboard

```text
Complaint Statistics
       │
       ├── Department
       ├── Priority
       ├── Status
       └── Complaint Management
```

---

# 🧪 API Testing

REST APIs were tested using **Postman** during development.

Example API endpoints:

```text
POST   /api/auth/register
POST   /api/auth/login

POST   /api/complaints
GET    /api/complaints/my
GET    /api/complaints/all
GET    /api/complaints/{trackingToken}

PUT    /api/complaints/{id}/status

GET    /api/complaints/dashboard/stats
```

---

# ⚙️ Local Setup

## Prerequisites

Make sure the following are installed:

- Java 21+
- Maven
- PostgreSQL
- Node.js
- npm
- Ollama
- Git

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/shaiksaidabi/civicshield-AI-Civic-Complaint-Management-System.git
```

```bash
cd civicshield-AI-Civic-Complaint-Management-System
```

---

## 2️⃣ Configure PostgreSQL

Create a PostgreSQL database:

```sql
CREATE DATABASE civicshield;
```

Update the backend database configuration according to your local PostgreSQL setup.

> ⚠️ Do not commit real database passwords, API keys, tokens, or other secrets to GitHub.

---

## 3️⃣ Setup Ollama

Install Ollama and make sure the required model is available locally.

Pull the model:

```bash
ollama pull llama3.2
```

Start Ollama if required:

```bash
ollama serve
```

The application expects the local Ollama service at:

```text
http://localhost:11434
```

---

## 4️⃣ Run the Backend

Open a terminal inside:

```text
civicshield-backend
```

Run:

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

---

## 5️⃣ Run the Frontend

Open another terminal:

```bash
cd civicshield-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🧪 Current Project Status

## ✅ Completed

- Citizen registration
- Citizen login
- Authority login
- JWT authentication
- Role-based access
- Complaint submission
- Complaint tracking
- My Complaints dashboard
- Complaint status management
- Department classification
- Priority classification
- AI complaint analysis
- AI-generated complaint summary
- React frontend
- Spring Boot backend
- PostgreSQL integration
- REST API integration
- Postman API testing
- Git/GitHub version control

---

# 🚧 Future Enhancements

CivicShield AI is actively under development.

Planned improvements include:

- 🗺️ Interactive complaint map
- 📍 Automatic location detection
- 📌 Map-based complaint locations
- 📷 Improved image handling
- 🔔 Complaint status notifications
- 📊 Advanced analytics dashboard
- 📈 Complaint trend visualization
- 🤖 Improved AI classification
- 🧠 More advanced NLP processing
- 🔎 Advanced complaint filtering
- 📱 Improved mobile responsiveness
- ☁️ Cloud deployment
- 🚀 Production-ready deployment

---

# 🎯 Project Goals

The long-term goal of CivicShield AI is to build a practical civic technology platform that can:

- Make civic issue reporting easier
- Reduce manual complaint classification
- Help route complaints to appropriate departments
- Provide transparent complaint tracking
- Use AI to assist authorities in processing complaints
- Provide location-aware civic issue management

---

# 📸 Project Screenshots

Screenshots of the application will be added here as the project continues to evolve.

---

# 👨‍💻 Developer

## Shaik Saidabi

B.Tech Computer Science Graduate

### Areas of Interest

- Java Development
- Spring Boot
- Full-Stack Development
- Artificial Intelligence
- NLP
- Backend Development
- Software Engineering

### Connect

🔗 LinkedIn:

https://www.linkedin.com/in/shaiksaidabi

💻 GitHub:

https://github.com/shaiksaidabi

---

# ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

---

# 📌 Note

CivicShield AI is an educational and portfolio project currently under active development.

The AI-generated classifications and summaries are intended to assist complaint processing and should not be treated as a replacement for human decision-making by government authorities.
