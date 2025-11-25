# TaskMaster - Task Management Application

A modern, full-stack task management system with authentication, CRUD operations, and advanced filtering capabilities.

## Tech Stack

**Frontend:** React 18, Tailwind CSS, Vite  
**Backend:** Node.js, Express.js, MongoDB  
**Authentication:** JWT

## Features

- 🔐 User authentication (Register/Login with JWT)
- ✅ Complete CRUD operations for tasks
- 🎯 Priority levels (Low, Medium, High)
- 🔍 Search and filter by status/priority
- 👤 User profile management
- 📊 Task statistics dashboard
- 🎨 Modern, responsive UI with animations

## Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB (running on port 27017)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd TASK
```

2. **Setup Backend**
```bash
cd taskmaster-backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`

3. **Setup Frontend** (in new terminal)
```bash
cd taskmaster-frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Environment Variables

Create `.env` in `taskmaster-backend/` (see `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/taskmaster
JWT_SECRET=your_secret_key_here
```

## Project Structure

```
TASK/
├── taskmaster-backend/      # Express.js API
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth middleware
│   └── server.js           # Entry point
│
└── taskmaster-frontend/     # React application
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Route pages
    │   └── utils/          # API & auth utilities
    └── vite.config.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks (Protected)
- `GET /api/tasks` - Get all tasks (with filters)
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### User (Protected)
- `GET /api/user/profile` - Get profile & stats
- `PUT /api/user/profile` - Update name
- `PUT /api/user/password` - Change password

## Database Schema

**Users:**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

**Tasks:**
```javascript
{
  userId: ObjectId,
  title: String,
  description: String,
  status: String ('todo' | 'completed'),
  priority: String ('low' | 'medium' | 'high'),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

1. Register a new account or login
2. Create tasks with title, description, and priority
3. Mark tasks as complete/incomplete
4. Use search and filters to organize tasks
5. View statistics and manage profile

## Development

**Backend:**
```bash
cd taskmaster-backend
npm run dev  # Runs with nodemon
```

**Frontend:**
```bash
cd taskmaster-frontend
npm run dev  # Runs with Vite HMR
```

## Production Build

**Backend:**
```bash
cd taskmaster-backend
npm start
```

**Frontend:**
```bash
cd taskmaster-frontend
npm run build
```

## Screenshots

- **Dashboard:** Task list with statistics cards and filters
- **Task Management:** Create, edit, delete tasks with priority indicators
- **Profile:** User statistics and account settings
- **Authentication:** Modern login/register pages with validation

## Security

- Passwords hashed with bcrypt
- JWT tokens with 7-day expiration
- Protected API routes
- CORS enabled
- Input validation

## Dependencies

**Backend:** express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv  
**Frontend:** react, react-router-dom, axios, tailwindcss

---

Built with ❤️ using modern web technologies
