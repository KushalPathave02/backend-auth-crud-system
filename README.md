# Secure Task API System

A scalable Full Stack Task Management System with JWT Authentication and Role-Based Access Control.

## Features
- **Authentication**: Secure register and login with JWT.
- **Role-Based Access**: ADMIN and USER roles with different permissions.
- **Task CRUD**: Create, Read, Update, and Delete tasks.
- **API Documentation**: Interactive Swagger UI.
- **Validation**: Input validation using express-validator.
- **Security**: Password hashing with bcrypt, protected routes, and CORS enabled.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB Atlas, JWT, bcrypt, Swagger.
- **Frontend**: React.js, Tailwind CSS, Axios, Lucide Icons.

## Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file with your MongoDB URI and JWT Secret.
4. `npm run dev` (starts on port 5000)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev` (starts on Vite default port)

## API Endpoints
- **Auth**: `/api/v1/auth/register`, `/api/v1/auth/login`
- **Tasks**: `/api/v1/tasks` (GET, POST, PUT, DELETE)
- **Docs**: `/api-docs`

## Folder Structure
Industry-standard modular structure for scalability.
