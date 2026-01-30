# Employee Directory Application

A modern, full-stack employee management system built with React, Node.js, and PostgreSQL.

**Production URL:** [https://employeedirectory.chandanjainnhp.in/](https://employeedirectory.chandanjainnhp.in/)

---

## 🌟 Features

- **Employee Management** - Create, read, update, and delete employee records
- **Advanced Search & Filtering** - Search by name, email, role, or filter by department
- **Statistics Dashboard** - Visual analytics with charts and metrics
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Modern UI** - Clean, professional interface with smooth animations
- **RESTful API** - Well-structured backend API
- **Docker Support** - Easy deployment with Docker and Docker Compose

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **CSS3** - Styling with custom design system

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client

### DevOps
- **Docker** - Containerization
- **Nginx** - Web server and reverse proxy
- **Docker Compose** - Multi-container orchestration

---

## 📋 Prerequisites

- **Node.js** 20+ (for local development)
- **npm** or **bun** (package manager)
- **PostgreSQL** 12+ (database)
- **Docker** & **Docker Compose** (for containerized deployment)

---

## 🚀 Quick Start

### Local Development

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd EmployeeDirectoryApplication
```

#### 2. Set Up Backend
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=employee_directory
# DB_USER=postgres
# DB_PASSWORD=your-password

# Start backend server
npm run dev
```

Backend will run on http://localhost:5000

#### 3. Set Up Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start frontend dev server
npm run dev
```

Frontend will run on http://localhost:5173

---

## 🐳 Docker Deployment

### Quick Deploy
```bash
# Create environment file
cp .env.example .env

# Edit .env with your database credentials

# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f
```

### Access Points
- **Frontend:** http://localhost
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

For detailed Docker deployment instructions, see [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)

---

## 📦 Project Structure

```
EmployeeDirectoryApplication/
├── backend/                    # Node.js backend
│   ├── routes/                 # API routes
│   ├── database-postgresql.js  # Database configuration
│   ├── server.js              # Express server
│   ├── Dockerfile             # Backend container
│   └── package.json
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   └── utils/             # Utility functions
│   ├── nginx.conf             # Nginx configuration
│   ├── Dockerfile             # Frontend container
│   └── package.json
│
├── docker-compose.yml          # Docker orchestration
├── .env.example               # Environment template
└── README.md                  # This file
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_directory
DB_USER=postgres
DB_PASSWORD=your-password
DB_SSL=false

# Application
NODE_ENV=development
PORT=5000
```

---

## 📡 API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Statistics
- `GET /api/employees/stats/summary` - Get statistics summary

### Health
- `GET /api/health` - Health check endpoint

---

## 🗄️ Database Schema

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  age INTEGER NOT NULL,
  date_of_joining DATE NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚢 Production Deployment

For production deployment to **https://employeedirectory.chandanjainnhp.in/**, see:

- [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) - Complete production guide
- [PRODUCTION_READY.md](PRODUCTION_READY.md) - Quick deployment summary

---

## 📚 Documentation

- [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md) - Docker deployment guide
- [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) - Production deployment
- [PRODUCTION_READY.md](PRODUCTION_READY.md) - Quick production reference

---

## 👤 Author

**Chandan Jain**
- Website: [chandanjainnhp.in](https://chandanjainnhp.in)
- Production App: [employeedirectory.chandanjainnhp.in](https://employeedirectory.chandanjainnhp.in)

---

**Built with ❤️ using React, Node.js, and PostgreSQL**
