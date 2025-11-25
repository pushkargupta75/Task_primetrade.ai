# TaskMaster API Documentation

Complete REST API documentation for the TaskMaster application.

**Base URL**: `http://localhost:5000/api`

---

## 🔐 Authentication

All endpoints except `/auth/register` and `/auth/login` require JWT authentication.

**Authorization Header Format:**
```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Endpoints

### **Authentication Endpoints**

#### 1. Register User
Create a new user account.

- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth Required**: No

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400 Bad Request`: User already exists
- `500 Internal Server Error`: Server error

---

#### 2. Login User
Authenticate existing user and receive JWT token.

- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth Required**: No

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid credentials
- `500 Internal Server Error`: Server error

---

### **Task Endpoints**

#### 3. Get All Tasks
Retrieve all tasks for authenticated user with optional filters.

- **URL**: `/tasks`
- **Method**: `GET`
- **Auth Required**: Yes

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| search | string | No | Search by task title (case-insensitive) |
| status | string | No | Filter by status: `all`, `todo`, `completed` |
| priority | string | No | Filter by priority: `all`, `low`, `medium`, `high` |

**Example Request:**
```
GET /tasks?search=project&status=todo&priority=high
```

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "todo",
    "priority": "high",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `500 Internal Server Error`: Server error

---

#### 4. Get Single Task
Retrieve a specific task by ID.

- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Auth Required**: Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | MongoDB ObjectId of the task |

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "todo",
  "priority": "high",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `404 Not Found`: Task not found
- `500 Internal Server Error`: Server error

---

#### 5. Create Task
Create a new task for authenticated user.

- **URL**: `/tasks`
- **Method**: `POST`
- **Auth Required**: Yes

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "priority": "high",
  "status": "todo"
}
```

**Field Validation:**
| Field | Type | Required | Default | Allowed Values |
|-------|------|----------|---------|----------------|
| title | string | Yes | - | Any non-empty string |
| description | string | No | "" | Any string |
| priority | string | No | "medium" | "low", "medium", "high" |
| status | string | No | "todo" | "todo", "completed" |

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "todo",
  "priority": "high",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `500 Internal Server Error`: Server error

---

#### 6. Update Task
Update an existing task.

- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Auth Required**: Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | MongoDB ObjectId of the task |

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "priority": "medium",
  "status": "completed"
}
```

**Note**: All fields are optional. Only provided fields will be updated.

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "title": "Updated task title",
  "description": "Updated description",
  "status": "completed",
  "priority": "medium",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:20:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `404 Not Found`: Task not found
- `500 Internal Server Error`: Server error

---

#### 7. Delete Task
Delete a task.

- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | MongoDB ObjectId of the task |

**Success Response (200):**
```json
{
  "message": "Task deleted"
}
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `404 Not Found`: Task not found
- `500 Internal Server Error`: Server error

---

### **User Profile Endpoints**

#### 8. Get User Profile
Retrieve authenticated user's profile with task statistics.

- **URL**: `/user/profile`
- **Method**: `GET`
- **Auth Required**: Yes

**Success Response (200):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "totalTasks": 25,
  "completedTasks": 15
}
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `500 Internal Server Error`: Server error

---

#### 9. Update User Profile
Update user's name.

- **URL**: `/user/profile`
- **Method**: `PUT`
- **Auth Required**: Yes

**Request Body:**
```json
{
  "name": "John Smith"
}
```

**Success Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439012",
    "name": "John Smith",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: No token or invalid token
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

---

#### 10. Change Password
Change user's password.

- **URL**: `/user/password`
- **Method**: `PUT`
- **Auth Required**: Yes

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Success Response (200):**
```json
{
  "message": "Password updated successfully"
}
```

**Error Responses:**
- `400 Bad Request`: Current password is incorrect
- `401 Unauthorized`: No token or invalid token
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

---

## 🔒 Security

### JWT Token Details
- **Algorithm**: HS256
- **Expiration**: 7 days
- **Payload**: `{ userId: string }`

### Password Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Minimum password length: 6 characters

---

## ⚠️ Error Response Format

All error responses follow this structure:

```json
{
  "message": "Error description here"
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (validation error or duplicate) |
| 401 | Unauthorized (missing or invalid token) |
| 404 | Not Found (resource doesn't exist) |
| 500 | Internal Server Error |

---

## 📊 Rate Limiting

**Currently**: No rate limiting implemented in development

**Production Recommendation**:
- Auth endpoints: 5 requests per 15 minutes per IP
- API endpoints: 100 requests per 15 minutes per IP

---

## 🧪 Testing with cURL

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get All Tasks (with token)
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task description","priority":"high"}'
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- Task IDs are MongoDB ObjectIds (24-character hexadecimal strings)
- The API uses CORS middleware, allowing requests from any origin in development
- All responses are in JSON format

---

## 🔄 Changelog

### v1.0.0 (Current)
- Initial API release
- Authentication with JWT
- CRUD operations for tasks
- User profile management
- Search and filter capabilities