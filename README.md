# TaskFlow

A simple task management app built with Next.js, Sequelize, and MySQL.

## Features

- User registration and login
- JWT authentication with HTTP-only cookies
- Add, update, and delete tasks
- Task status (To Do, In Progress, Done)
- Role-based access (User/Admin)

## Tech Stack

- Next.js 16 (App Router)
- Sequelize ORM
- MySQL
- Tailwind CSS
- bcryptjs for password hashing
- jsonwebtoken for JWT

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create MySQL database:
```sql
CREATE DATABASE taskflow;
```

3. Configure environment variables in `.env`:
```
DB_NAME=taskflow
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=your_secret_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## Project Structure

```
app/
  api/
    auth/
      login/route.ts
      register/route.ts
      logout/route.ts
    tasks/route.ts
  dashboard/page.tsx
  login/page.tsx
  register/page.tsx
lib/
  auth.ts
  sequelize.ts
models/
  User.ts
  Task.ts
middleware.ts
```

## API Endpoints

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create task
- PUT `/api/tasks` - Update task
- DELETE `/api/tasks` - Delete task
