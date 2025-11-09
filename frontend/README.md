# Frontend - Task Manager Application

A modern React application with Vite and Tailwind CSS for managing tasks with authentication.

## 🚀 Features

- ✅ User Authentication (Login/Register)
- ✅ JWT Token Management with Auto-Refresh
- ✅ Protected Routes
- ✅ Task CRUD Operations
- ✅ Task Filtering (Status, Priority)
- ✅ Real-time Statistics Dashboard
- ✅ Responsive Design with Tailwind CSS
- ✅ Toast Notifications
- ✅ Modern UI/UX

## 📋 Prerequisites

- Node.js (v14 or higher)
- Backend API running on http://localhost:5000

## 🛠️ Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── TaskManager.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskStats.jsx
│   │   ├── common/
│   │   │   └── ProtectedRoute.jsx
│   │   └── layout/
│   │       ├── Layout.jsx
│   │       └── Navbar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── taskService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Features Breakdown

### Authentication

- Login with email and password
- Register new users
- JWT token storage in localStorage
- Automatic token refresh on expiry
- Logout functionality

### Task Management

- Create new tasks
- View all tasks with pagination
- Filter tasks by status and priority
- Edit existing tasks
- Delete tasks
- View task statistics

### Dashboard

- Total tasks count
- Tasks by status (Pending, In Progress, Completed)
- Tasks by priority (Low, Medium, High)
- Real-time updates

## 🔧 Configuration

### API Endpoint

The API base URL is configured in `src/services/api.js`:

```javascript
const API_URL = "http://localhost:5000/api/v1";
```

### Vite Proxy

Proxy configuration in `vite.config.js` allows requests to `/api` to be forwarded to the backend:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
}
```

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🎯 Key Technologies

- **React 18** - UI Framework
- **Vite** - Build Tool
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **React Hot Toast** - Notifications

## 🚀 Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📝 Usage

### Login

1. Navigate to `/login`
2. Enter credentials
3. Click "Sign in"

### Register

1. Navigate to `/register`
2. Fill in the form
3. Click "Create account"

### Create Task

1. Click "+ Create Task" button
2. Fill in task details
3. Click "Create Task"

### Edit Task

1. Click the edit icon on any task
2. Modify task details
3. Click "Update Task"

### Delete Task

1. Click the delete icon on any task
2. Confirm deletion

### Filter Tasks

1. Use the Status dropdown to filter by status
2. Use the Priority dropdown to filter by priority
3. Tasks update automatically

## 🔐 Security

- JWT tokens stored in localStorage
- Automatic token refresh
- Protected routes require authentication
- API interceptors handle token expiry
- CORS configured for backend communication

## 🎨 Tailwind CSS Classes

Custom classes defined in `index.css`:

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.btn-danger` - Danger button style
- `.input-field` - Input field style
- `.card` - Card container style

## 📦 Dependencies

### Production

- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.20.0
- axios: ^1.6.2
- react-hot-toast: ^2.4.1

### Development

- vite: ^5.0.8
- tailwindcss: ^3.3.6
- autoprefixer: ^10.4.16
- postcss: ^8.4.32
- @vitejs/plugin-react: ^4.2.1

## 🐛 Troubleshooting

### CORS Issues

Make sure the backend CORS configuration includes `http://localhost:3000`

### API Connection

Verify backend is running on `http://localhost:5000`

### Token Issues

Clear localStorage and login again:

```javascript
localStorage.clear();
```

---

Built with React + Vite + Tailwind CSS
