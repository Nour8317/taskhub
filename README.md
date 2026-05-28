# TaskHub Microservices

This project contains three microservices: user-service, task-service, and notification-service, all orchestrated with Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Using Docker Compose (Recommended)

1. Navigate to the project root directory:
   ```bash
   cd d:\github_repositories\taskhub
   ```

2. Start all services with MongoDB:
   ```bash
   docker-compose up
   ```

   To run in detached mode:
   ```bash
   docker-compose up -d
   ```

3. Stop all services:
   ```bash
   docker-compose down
   ```

   To also remove volumes (MongoDB data):
   ```bash
   docker-compose down -v
   ```

### Services

- **User Service** - Manages user data
  - URL: `http://localhost:8000`
  - Endpoints:
    - `POST /users` - Create a new user
    - `GET /users` - Get all users

- **Task Service** - Manages tasks
  - URL: `http://localhost:8001`
  - Endpoints:
    - `POST /tasks` - Create a new task
    - `GET /tasks` - Get all tasks

- **Notification Service** - Manages notifications
  - URL: `http://localhost:8002`
  - Endpoints:
    - `POST /notifications` - Create a new notification
    - `GET /notifications` - Get all notifications

- **MongoDB** - Database
  - URL: `mongodb://localhost:27017`
  - Username: `admin`
  - Password: `password`

### Running Services Locally (Without Docker)

1. Navigate to each service directory and install dependencies:
   ```bash
   cd services/user-service
   npm install
   ```

2. Create a `.env` file in each service with:
   ```
   MONGO_URI=mongodb://localhost:27017/taskhub
   ```

3. Run each service:
   ```bash
   npm run dev
   ```

### Example Requests

**Create a User:**
```bash
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

**Get All Users:**
```bash
curl http://localhost:8000/users
```

**Create a Task:**
```bash
curl -X POST http://localhost:8001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread", "status": "pending"}'
```

**Get All Tasks:**
```bash
curl http://localhost:8001/tasks
```

**Create a Notification:**
```bash
curl -X POST http://localhost:8002/notifications \
  -H "Content-Type: application/json" \
  -d '{"recipientEmail": "john@example.com", "message": "Your task has been completed", "read": false}'
```

**Get All Notifications:**
```bash
curl http://localhost:8002/notifications
```

## Docker Compose Configuration

The `docker-compose.yml` file defines:

- **MongoDB** container with persistent volume storage
- **User Service** on port 8000
- **Task Service** on port 8001
- **Notification Service** on port 8002
- All services connected via a custom bridge network
- Health checks for MongoDB with service dependency management

## Environment Variables

Each service uses the following environment variables:

- `MONGO_URI` - MongoDB connection string
- `NODE_ENV` - Node environment (set to `production` in Docker)

For local development, create a `.env` file in each service directory.

## Troubleshooting

**Cannot connect to MongoDB:**
- Ensure MongoDB is running and healthy: `docker-compose ps`
- Check MongoDB logs: `docker-compose logs mongodb`
- Verify connection string matches the one in docker-compose.yml

**Service not starting:**
- Check service logs: `docker-compose logs user-service`
- Verify port availability (8000, 8001, 8002 not in use)
- Ensure MongoDB is healthy before services start

**Rebuild images after code changes:**
```bash
docker-compose up --build
```
