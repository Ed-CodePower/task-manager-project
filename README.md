# TaskFlow - Full-Stack Task Management Web Application

## Project Overview

TaskFlow is a full-stack web application that allows users to register, log in, and manage tasks efficiently. Users can create, update, delete, and organize tasks into different statuses such as To Do, In Progress, Hold, Done, and Need Revisit.

This project demonstrates frontend, backend, database integration, authentication, and deloyment readiness.

---

## Live Demo
https://taskflow-app-z8pa.onrender.com

## Features

- User Registration and Login (JWT Authentication)
- Password hashing using bcrypt
- Create, Read, Update, Delete (CRUD) tasks
- Task status management:
    - To DO
    - In Progress
    - Hold
    - Done
    - Need Revisit
- Protected routes (only logged-in users can access tasks)
- Responsive UI (mobile-first design)
- Persistent data storage using SQLite
- Full deployment on Render

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- CSS (mobile-first design)

### Backend
- Node.js
- Express.js
- JWT (Authentication)
- bcryptjs (Password hashing)

### Database
- PostgreSQL (Render Cloud Database)

## Deployment
- Render (Web Service)

---

## Project Structure
task-manager-project/
|
|- frontend/
|   |- src/
|   |   |- components/
|   |   |- pages/
|   |   |- services/
|   |   |- styles/
|
|- backend/
|   |- controllers/
|   |- routes/
|   |- middleware/
|   |- config/
|   |-server.js

---

## Installation & Setup

### 1. Clone the repository
git clone https://github.com/Ed-CodePower/task-manager-project.git
cd task-manager-project

--- 

### 2. Setup Backend
cd backed
npm install
npm run dev

---

### 3. Setup Frontend
Open a new terminal:
cd frontend
npm install
npm run dev

Frontend runs at:
http:/localhost:3000

---

## Environment Variables

### Backend (`backend/.env)
- DATABASE_URL = postgresql://taskflow_ey92_user:liiG9Z1wj6EnNQYMmWL042jmveK9aXIL@dpg-d7jp85navr4c73chb7ig-a.virginia-postgres.render.com/taskflow_ey92
- JWT_SECRET = supersecretkey123

### Frontend (`frontend/.env.development)
- VITE_API_URL = https://localhost:5000/api

---

## Authentication

- Users must register and log in
- JWT token is stored in localStorage
- Token is required to access task routes

---

## API Endpoits

### AUTH
- POST `/api/auth/register`
- POST `/api/auth/login`

### Tasks
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

---

## Deployment

The application is deployed using Render:

- Backend and frontend served from a single Web Service
- PostgreSQL database hosted on Render
- Environment variables configured for secure access

---

## Future Improvements

- Add due dates and priorities
- Drag-and-Drop task movement
- Dark mode UI
- Change color palette

---

## Author
Edward Cicio