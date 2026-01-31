# Task Manager Web Application

A full-stack Task Manager application built with the MERN stack (MongoDB, Express, React, Node.js). This application enables users to securely manage their tasks with features like priority setting, due dates, and status tracking.

## 🧠 Project Overview
- **User Authentication:** Secure registration and login using JWT and Bcrypt.
- **Task Management:** Create, Read, Update, and Delete (CRUD) tasks.
- **Filtering:** Filter tasks by status (Pending, In Progress, Completed).
- **Responsive Design:** Premium UI built with Tailwind CSS, fully responsive for all devices.
- **Security:** Protected routes ensuring users only access their own data.

## 🧱 Tech Stack
- **Frontend:** React.js, Tailwind CSS, Vite, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT)

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas Connection String)

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following content:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

### 2. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get token
- `GET /api/auth/me` - Get current user details (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 📂 Folder Structure
```
Task Manager/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route logic
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Global state (Auth)
│   │   ├── pages/      # Application views
│   │   ├── services/   # API configuration
│   │   └── App.jsx     # Main React component
│   └── tailwind.config.js
```

## 🎨 Features & Design
- **Modern UI:** Clean, glassmorphic elements, consistent color palette.
- **UX:** Loading states, toast notifications for actions, smooth transitions.
