# Interactive Task Manager - MERN Stack

A full-stack task management application built with MongoDB, Express, React, and Node.js, featuring real-time collaboration using Socket.io.

## 📋 Features

- **CRUD Operations**: Create, read, update, and delete tasks
- **Status Management**: Track tasks with three states (To Do, In Progress, Completed)
- **Real-Time Collaboration**: Instant updates across all connected clients using Socket.io
- **Email Notifications**: Automatic email notifications when tasks are marked as completed
- **Status Filtering**: Filter tasks by status (All, To Do, In Progress, Completed)
- **Responsive UI**: Clean and intuitive interface built with React

## 🚀 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 📦 Installation & Setup

### 1. Clone the Repository

git clone <your-repository-url> //Enter the actual github url 
cd task-manager


### 2. Backend Setup

Navigate to the server directory and install dependencies:

cd server
npm install


Create a `.env` file in the `server` directory with the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development

Email Configuration (for completion notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password


**Note**: For Gmail, you need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

Start the backend server:
npm run dev


The server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal, navigate to the client directory, and install dependencies:

cd client
npm install


Start the React development server:
npm start


The client will run on `http://localhost:3000`

## 🏗️ Project Structure

task-manager/
├── client/ # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/ # React components
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── FilterBar.jsx
│   │   ├── services/ # API services
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── server/ # Node.js backend
│   ├── config/ # Configuration files
│   │   └── db.js
│   ├── controllers/ # Request handlers
│   │   └── taskController.js
│   ├── middleware/ # Custom middleware
│   │   └── validation.js
│   ├── models/ # MongoDB schemas
│   │   └── Task.js
│   ├── routes/ # API routes
│   │   └── taskRoutes.js
│   ├── utils/ # Utility functions
│   │   └── emailService.js
│   ├── server.js # Entry point
│   └── package.json
│
└── README.md


## 🔌 Socket.io Implementation

### Approach

The real-time collaboration feature is implemented using **Socket.io**, enabling instant synchronization across multiple browser sessions without requiring manual page refreshes.

**Backend Implementation:**
On the server side, Socket.io is integrated with the Express server. Whenever a CRUD operation occurs (create, update, or delete) via the REST API endpoints, the server emits corresponding events to all connected clients:
- `taskCreated`: Emitted when a new task is created
- `taskUpdated`: Emitted when a task's status or details are modified
- `taskDeleted`: Emitted when a task is removed

**Frontend Implementation:**
The React application establishes a Socket.io connection when the `App` component mounts. The client listens for the three events mentioned above and updates the local state immediately when any event is received. This ensures that all users see the same data in real-time, creating a collaborative experience.

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task's status or details |
| DELETE | `/api/tasks/:id` | Delete a task |


## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time bidirectional communication
- **Nodemailer** - Email sending functionality

### Frontend
- **React** - UI library
- **Socket.io-client** - Client-side Socket.io library
- **Axios** - HTTP client for API requests

## 📧 Email Notification Feature

When a task's status is changed to "Completed", an automated email notification is sent to the task owner using Nodemailer with Gmail SMTP. The email includes:
- Task title
- Task description
- Completion timestamp

