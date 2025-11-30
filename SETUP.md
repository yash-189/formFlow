# FormFlow - Setup & Testing Guide

## Prerequisites

1. **Node.js** - Version 18+ installed
2. **MongoDB** - Running locally or connection string ready

## Setup Steps

### 1. Install MongoDB (if not already installed)

**Windows:**
```powershell
# Using Chocolatey
choco install mongodb

# Or download from: https://www.mongodb.com/try/download/community
```

**Start MongoDB:**
```powershell
# Create data directory
mkdir C:\data\db

# Start MongoDB
mongod
```

### 2. Backend Setup

```powershell
cd backend

# Install dependencies (already done)
npm install

# Create .env file
Copy-Item .env.example .env

# Edit .env and set:
# MONGODB_URI=mongodb://localhost:27017/form

# Seed the database with sample form
npm run seed

# Start backend server
npm run dev
```

Backend will run on **http://localhost:3000**

### 3. Frontend Setup

```powershell
cd frontend

# Update API base URL in .env (if needed)
# VITE_API_BASE_URL=http://localhost:3000/api

# Start frontend
npm run dev
```

Frontend will run on **http://localhost:5173**



## API Endpoints

### Forms
- `GET /api/forms/schema` - Get the active form schema

### Submissions
- `POST /api/submissions` - Create a new submission
  ```json
  {
    "data": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "age": 25
    }
  }
  ```
- `GET /api/submissions?page=1&limit=10&sortBy=createdAt&sortOrder=desc` - Get paginated submissions
- `GET /api/submissions/:id` - Get a single submission



## Architecture Overview

**Backend (Port 3000):**
- Functional + Factories pattern
- Feature-based structure (forms, submissions)
- Request logging with execution time
- MongoDB with Mongoose
- Zod validation

**Frontend (Port 5173):**
- React 19 + Vite
- FSA-lite architecture
- Business logic in hooks (`useTablePagination`, `useSubmissionsTable`)
- TanStack Query for data fetching
- Tailwind CSS v4 + ShadCN UI
