<div align="center">

# 🎯 TaskMaster

### Modern Task Management Application

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0-47A248?logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**A full-stack task management system with secure authentication, real-time updates, and advanced filtering capabilities.**

[Features](#-features) • [Quick Start](#-quick-start) • [API Docs](#-api-endpoints) • [Screenshots](#-screenshots)

</div>

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Tailwind CSS, Vite, Axios |
| **Backend** | Node.js, Express.js, RESTful API |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Security** | Bcrypt password hashing, Protected routes |

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login with JWT
- Password hashing with bcrypt
- Protected API routes
- Auto logout on token expiration

### ✅ Task Management
- **Create** tasks with title, description, and priority
- **Edit** existing tasks on the fly
- **Delete** tasks with confirmation modal
- **Toggle** completion status instantly
- Priority levels: 🟢 Low, 🟡 Medium, 🔴 High

### 📊 Dashboard & Analytics
- Task statistics cards with visual indicators
- Completion rate tracking with progress bars
- High-priority task alerts
- Responsive grid layout

### 👤 User Profile
- View and edit profile information
- Change password securely
- Track total and completed tasks
- Account statistics


## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB (running on port 27017)

### Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/pushkargupta75/Task_primetrade.ai.git
cd Task_primetrade.ai
```

#### 2️⃣ Setup Backendnd
```bash
cd taskmaster-backend
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start backend server
npm run dev
```

✅ Backend runs on `http://localhost:5000`

#### 3️⃣ Setup Frontend (in new terminal)
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


## 📸 Screenshots

<table>
<tr>
<td width="50%">

### 🏠 Dashboard
- Statistics cards (Total, Completed, Pending, High Priority)
- Task grid with priority badges
- Search and filter bar
- Create task button

</td>
<td width="50%">

### ✏️ Task Management
- Create/Edit modal with rich form
- Priority selection dropdown
- Delete confirmation dialog
- Status toggle checkboxes

</td>
</tr>
<tr>
<td width="50%">

### 👤 User Profile
- Profile information display
- Edit name functionality
- Change password form
- Task completion statistics

</td>
<td width="50%">

### 🔐 Authentication
- Modern gradient backgrounds
- Floating blob animations
- Form validation
- Error handling

</td>
</tr>
</table>

## Security

- Passwords hashed with bcrypt
- JWT tokens with 7-day expiration
- Protected API routes
- CORS enabled
- Input validation

## 📦 Dependencies

### Backend
- `express` - Fast, unopinionated web framework
- `mongoose` - MongoDB object modeling
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT implementation
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

### Frontend
- `react` - UI library
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `tailwindcss` - Utility-first CSS framework
- `vite` - Next-generation build tool

## 🎯 Why TaskMaster?

- **🚀 Fast & Efficient** - Built with Vite for lightning-fast development
- **🎨 Beautiful UI** - Modern design with Tailwind CSS and custom animations
- **🔒 Secure** - Industry-standard JWT authentication and password hashing
- **📱 Responsive** - Works seamlessly on desktop, tablet, and mobile
- **🛠️ Developer Friendly** - Clean code structure and comprehensive documentation
- **🔧 Customizable** - Easy to extend and modify for your needs

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/pushkargupta75/Task_primetrade.ai/issues).

