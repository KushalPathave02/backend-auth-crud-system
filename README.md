# Secure Task API System - RBAC Task Manager

A professional Full Stack Task Management System featuring Role-Based Access Control (RBAC), secure authentication, and a modular architecture.

## 🚀 Key Features

### 1. Authentication & Authorization
- **JWT Authentication**: Secure login and registration.
- **Role-Based Access Control (RBAC)**: Distinct permissions for `ADMIN` and `USER` roles.
- **Password Security**: Hashing using `bcryptjs`.

### 2. Admin Features
- **User Management**: View and delete regular users (hides other admins for security).
- **Task Assignment**: Create and assign tasks to specific users.
- **Full Oversight**: View all tasks across the system.

### 3. User Features
- **Personalized Dashboard**: View only tasks assigned to the user.
- **Status Management**: Update task status (`PENDING` -> `IN_PROGRESS` -> `COMPLETED`).
- **Privacy**: Admin details are hidden from the user view for a cleaner interface.

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose).
- **Frontend**: React.js (Vite), Tailwind CSS, Lucide Icons, Axios.
- **Testing**: Postman Collection included.

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed.
- MongoDB Atlas account.

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file in the `backend` folder:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
4. `npm run dev` (Starts on port 8000).

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Starts on default Vite port, usually 5173/5174).

## 🧪 API Documentation & Testing
A comprehensive Postman collection is included in the root directory: `postman_collection.json`.

### Main Endpoints
- **Auth**: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`
- **Tasks**: `GET /api/v1/tasks`, `POST /api/v1/tasks` (Admin), `PUT /api/v1/tasks/:id`
- **Admin**: `GET /api/v1/admin/users`, `DELETE /api/v1/admin/users/:id`

## 📁 Project Structure
```text
├── backend
│   ├── src
│   │   ├── config      # Database & app config
│   │   ├── controllers # Business logic
│   │   ├── models      # Mongoose schemas
│   │   ├── routes      # API endpoints
│   │   ├── middleware  # Auth & Role guards
│   │   └── utils       # Helper functions
├── frontend
│   ├── src
│   │   ├── api         # Axios instance
│   │   ├── context     # Auth state management
│   │   ├── pages       # UI Pages (Admin/User/Auth)
│   │   └── components  # Reusable UI elements
└── postman_collection.json # Ready-to-use testing tool
```

## 📝 Important Notes
- **Port Conflict**: Backend is configured to port **8000** to avoid conflicts with Mac AirPlay (Port 5000).
- **Initial Admin**: Register a user normally, then manually change their `role` to `ADMIN` in MongoDB Atlas to access the Admin Dashboard.
