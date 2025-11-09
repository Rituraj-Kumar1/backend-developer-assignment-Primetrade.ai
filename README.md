# 🚀 Backend Developer Assignment - Full Stack Application

A production-ready MERN stack application with authentication, role-based access control, and task management.

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Scalability](#scalability)
- [Security](#security)

## ✨ Features

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

### Frontend

- ✅ Modern React 18 with Vite
- ✅ Tailwind CSS for Styling
- ✅ User Authentication (Login/Register)
- ✅ Protected Routes
- ✅ Task CRUD Operations
- ✅ Task Filtering (Status, Priority)
- ✅ Real-time Statistics Dashboard
- ✅ Responsive Design
- ✅ Toast Notifications
- ✅ JWT Token Auto-Refresh

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS, express-rate-limit, express-mongo-sanitize
- **Validation**: express-validator
- **Logging**: Winston, Morgan
- **Documentation**: Swagger (swagger-jsdoc, swagger-ui-express)
- **Password Hashing**: bcryptjs

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **State Management**: Context API

## 📁 Project Structure

```
backend-developer-assignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── config.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── validation.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── v1/
│   │   │   │   ├── auth.js
│   │   │   │   └── tasks.js
│   │   │   └── index.js
│   │   ├── swagger/
│   │   │   └── swagger.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   └── validators.js
│   │   └── server.js
│   ├── logs/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── Postman_Collection.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── common/
│   │   │   └── layout/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
├── docker-compose.yml
└── README.md
```

## 🚀 Installation

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd backend-developer-assignment
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Start MongoDB

```bash
# Windows
net start MongoDB

# Or use MongoDB Compass
```

## 🎮 Running the Application

### Development Mode

#### Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

Backend will run on: http://localhost:5000

#### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend will run on: http://localhost:3000

### Production Mode

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:

**Swagger UI**: http://localhost:5000/api-docs

### API Endpoints

#### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (Protected)
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user (Protected)

#### Tasks

- `GET /api/v1/tasks` - Get all tasks (Protected)
- `GET /api/v1/tasks/:id` - Get single task (Protected)
- `POST /api/v1/tasks` - Create task (Protected)
- `PUT /api/v1/tasks/:id` - Update task (Protected)
- `DELETE /api/v1/tasks/:id` - Delete task (Protected)
- `GET /api/v1/tasks/stats` - Get task statistics (Protected)
- `GET /api/v1/tasks/admin/all` - Get all tasks (Admin only)

### Postman Collection

Import `backend/Postman_Collection.json` into Postman for quick API testing.

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Testing

```bash
cd frontend
npm test
```

### Manual Testing Steps

1. **Register a User**

   - Go to http://localhost:3000/register
   - Fill in the form and submit

2. **Login**

   - Go to http://localhost:3000/login
   - Enter credentials

3. **Create Tasks**

   - Click "+ Create Task"
   - Fill in task details

4. **Manage Tasks**
   - Edit, delete, and filter tasks
   - View statistics

## 🌐 Deployment

### Backend Deployment

#### Heroku

```bash
cd backend
heroku create your-app-name
git push heroku main
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
```

#### Render

1. Connect your GitHub repo
2. Select backend folder
3. Set environment variables
4. Deploy

### Frontend Deployment

#### Vercel

```bash
cd frontend
npm run build
vercel --prod
```

#### Netlify

```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables

#### Backend (.env)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
CORS_ORIGIN=your-frontend-url
```

#### Frontend (Update API URL in src/services/api.js)

```javascript
const API_URL = "your-backend-url/api/v1";
```

## 📈 Scalability

### Current Architecture

- **Modular Structure**: Easy to add new features
- **API Versioning**: Backward compatibility
- **Database Indexing**: Optimized queries
- **Error Handling**: Centralized and consistent

### Future Enhancements

#### Microservices

```
┌─────────────────┐     ┌─────────────────┐
│  Auth Service   │     │  Task Service   │
│  (Node.js)      │◄───►│  (Node.js)      │
└─────────────────┘     └─────────────────┘
         │                       │
         └───────┬───────────────┘
                 │
         ┌───────▼────────┐
         │  API Gateway   │
         │   (Nginx)      │
         └────────────────┘
```

#### Caching Layer

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────►│  Redis   │────►│ MongoDB  │
└──────────┘     └──────────┘     └──────────┘
                 (Cache Layer)     (Database)
```

#### Load Balancing

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
┌────▼──────────┐
│ Load Balancer │
│   (Nginx)     │
└───┬───┬───┬───┘
    │   │   │
    ▼   ▼   ▼
  [Server Instances]
```

### Recommended Improvements

1. **Database Optimization**

   - Implement database sharding
   - Add read replicas
   - Use connection pooling

2. **Caching Strategy**

   - Redis for session management
   - Cache frequently accessed data
   - Implement cache invalidation

3. **Message Queue**

   - RabbitMQ/Kafka for async operations
   - Email notifications
   - Background jobs

4. **Monitoring & Logging**

   - Application Performance Monitoring (APM)
   - Centralized logging (ELK Stack)
   - Error tracking (Sentry)

5. **CI/CD Pipeline**

   - GitHub Actions for automated testing
   - Automated deployment
   - Blue-green deployment

6. **Security Enhancements**
   - OAuth 2.0 integration
   - 2FA authentication
   - API rate limiting per user
   - DDoS protection

## 🔐 Security Best Practices

### Implemented

- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT token authentication
- ✅ Refresh token mechanism
- ✅ Input validation and sanitization
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ CORS configuration
- ✅ Helmet for security headers
- ✅ MongoDB injection prevention
- ✅ Error handling without exposing stack traces

### Additional Recommendations

- Implement OAuth 2.0 (Google, GitHub)
- Add 2-Factor Authentication
- Use HTTPS in production
- Implement API key authentication for services
- Regular security audits
- Keep dependencies updated

## 📝 Environment Variables

### Backend Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/backend_assignment
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Failed

```bash
# Check if MongoDB is running
mongosh

# Windows: Start MongoDB service
net start MongoDB
```

#### Port Already in Use

```bash
# Find and kill process
# Backend (Port 5000)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend (Port 3000)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### CORS Errors

- Check CORS_ORIGIN in backend .env
- Ensure frontend URL matches

#### JWT Token Expired

- Clear localStorage
- Login again

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Rituraj Kumar**

- Email: rituraj123@gmail.com
- GitHub: [@Rituraj-Kumar1](https://github.com/Rituraj-Kumar1)

## 🙏 Acknowledgments

- MERN stack community
- All open-source contributors

---

**Made with ❤️ using MERN Stack (MongoDB, Express.js, React.js, Node.js) + Tailwind CSS**
