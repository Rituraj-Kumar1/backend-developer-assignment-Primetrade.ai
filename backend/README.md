# Backend Developer Assignment

A scalable REST API with Authentication & Role-Based Access Control built with Node.js, Express, and MongoDB.

## 🚀 Features

### Backend

- ✅ JWT Authentication (Access & Refresh Tokens)
- ✅ Role-Based Access Control (User & Admin)
- ✅ Password Hashing with bcrypt
- ✅ Input Validation & Sanitization
- ✅ API Versioning (/api/v1/)
- ✅ Comprehensive Error Handling
- ✅ Swagger API Documentation
- ✅ Request Logging (Winston & Morgan)
- ✅ Rate Limiting & Security Headers
- ✅ CRUD Operations for Tasks
- ✅ Pagination & Filtering
- ✅ MongoDB with Mongoose ODM

### Security

- ✅ Helmet for security headers
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ MongoDB sanitization
- ✅ Input validation with express-validator
- ✅ JWT token expiration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory (use `.env.example` as reference):

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/backend_assignment
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### 4. Start MongoDB

```bash
# Windows
net start MongoDB

# Or if using MongoDB Compass, just open it
```

### 5. Start the server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will be running at `http://localhost:5000`

## 📚 API Documentation

Interactive API documentation available at:

```
http://localhost:5000/api-docs
```

## 🔑 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (Protected)
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user (Protected)

### Tasks

- `GET /api/v1/tasks` - Get all tasks (Protected)
- `GET /api/v1/tasks/:id` - Get single task (Protected)
- `POST /api/v1/tasks` - Create task (Protected)
- `PUT /api/v1/tasks/:id` - Update task (Protected)
- `DELETE /api/v1/tasks/:id` - Delete task (Protected)
- `GET /api/v1/tasks/stats` - Get task statistics (Protected)
- `GET /api/v1/tasks/admin/all` - Get all tasks (Admin only)

## 📝 Sample API Requests

### Register User

```bash
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User

```bash
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Task (Protected)

```bash
POST http://localhost:5000/api/v1/tasks
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Complete assignment",
  "description": "Finish the backend developer assignment",
  "priority": "high",
  "status": "in-progress",
  "dueDate": "2025-11-12"
}
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # Database configuration
│   │   └── config.js          # App configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── taskController.js  # Task CRUD logic
│   ├── middleware/
│   │   ├── auth.js            # JWT & role-based auth
│   │   ├── validation.js      # Input validation
│   │   └── errorHandler.js    # Global error handler
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   ├── v1/
│   │   │   ├── auth.js        # Auth routes
│   │   │   └── tasks.js       # Task routes
│   │   └── index.js           # Route aggregator
│   ├── swagger/
│   │   └── swagger.js         # Swagger configuration
│   ├── utils/
│   │   ├── logger.js          # Winston logger
│   │   └── validators.js      # Validation rules
│   └── server.js              # App entry point
├── logs/                      # Log files
├── .env                       # Environment variables
├── .env.example              # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Security Best Practices

1. **Password Security**: Passwords hashed using bcrypt with salt rounds
2. **JWT Tokens**: Separate access and refresh tokens with expiration
3. **Input Validation**: All inputs validated using express-validator
4. **Rate Limiting**: Prevent brute force attacks
5. **CORS**: Configured for specific origins
6. **Helmet**: Security headers for Express
7. **MongoDB Sanitization**: Prevent NoSQL injection attacks

## 📈 Scalability Notes

### Current Architecture

- **Modular Structure**: Easy to add new modules/features
- **API Versioning**: v1 routes allow backward compatibility
- **Database Indexing**: Optimized queries for better performance
- **Error Handling**: Centralized error handling for consistency

### Future Enhancements

1. **Microservices**: Split auth and tasks into separate services
2. **Caching**: Implement Redis for frequently accessed data
3. **Message Queue**: Use RabbitMQ/Kafka for async operations
4. **Load Balancing**: Nginx or AWS ELB for horizontal scaling
5. **Database Sharding**: Partition data across multiple databases
6. **CDN**: For static assets and improved performance
7. **Monitoring**: Implement APM tools (New Relic, DataDog)
8. **CI/CD**: GitHub Actions for automated testing and deployment

## 🧪 Testing

```bash
# Run tests (to be implemented)
npm test
```

## 📦 Deployment

### Docker (Optional)

```bash
# Build image
docker build -t backend-api .

# Run container
docker run -p 5000:5000 backend-api
```

### Cloud Platforms

- **Heroku**: `git push heroku main`
- **AWS**: Use EC2, ECS, or Lambda
- **DigitalOcean**: Deploy on App Platform
- **Vercel/Render**: For quick deployment

## 🐛 Error Handling

All errors return a consistent JSON format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Optional validation errors
}
```

## 📊 Logging

- All requests logged using Morgan (development)
- Error logs stored in `logs/error.log`
- Combined logs stored in `logs/combined.log`
- Winston for structured logging

## 👨‍💻 Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Run in production mode
npm start
```

## 📄 License

ISC

## 👤 Author

Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Note**: Remember to change JWT secrets and other sensitive information in production!
