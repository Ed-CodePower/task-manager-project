# TaskFlow - Full-Stack Task Management Web Application

## Project Overview

TaskFlow is a full-stack web application that allows users to register, log in, and manage tasks efficiently. Users can create, update, delete, and organize tasks into different statuses such as To Do, In Progress, Hold, Done, and Need Revisit.

This project demonstrates frontend, backend, database integration, authentication, and deloyment readiness.

---

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
- Organized React component structure

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
- SQLite

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

backend runs at:
http://localhost:5000

---

### 3. Setup Frontend
Open a new terminal:
cd frontend
npm install
npm run dev

Frontend runs at:
http:/localhost:3000

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

## Testing

Test cases performed:
- User registration with valid input
- Login with correct/incorrect credentials
- Task creation
- Task movement between statuses
- Task deletion
- Empty input validation

---

## Future Improvements

- Add due dates and priorities
- Drag-and-Drop task movement
- Dark mode UI
- Change color palette

---

## Author
Edward Cicio