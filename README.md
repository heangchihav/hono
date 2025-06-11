# Hono.js with Bun, Drizzle ORM, PostgreSQL and Expo Router

A full-stack application with a clean, maintainable API built with Hono.js, Bun, Drizzle ORM, and PostgreSQL, plus a frontend built with Expo Router. This project follows a modular architecture with separate frontend and backend directories.

## Features

- **Hono.js**: Fast, lightweight web framework for the backend
- **Expo Router**: File-based routing for the frontend web application
- **Bun**: JavaScript/TypeScript runtime with built-in bundler, transpiler, task runner, and npm client
- **Drizzle ORM**: TypeScript ORM with a focus on type safety
- **PostgreSQL**: Powerful, open-source relational database
- **Docker**: Multi-container setup for easy development and deployment
- **Zod**: Schema validation for API requests and environment variables

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── db/             # Database related files
│   │   │   ├── migrations/ # Database migrations
│   │   │   └── schema/     # Database schema definitions
│   │   ├── middlewares/    # Custom middleware functions
│   │   ├── models/         # Data models
│   │   ├── routes/         # Route definitions
│   │   ├── schemas/        # Zod validation schemas
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── Dockerfile          # Backend Docker image definition
│   ├── drizzle.config.ts   # Drizzle ORM configuration
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # Backend TypeScript configuration
├── frontend/
│   ├── app/               # Expo Router pages
│   ├── assets/            # Static assets
│   ├── components/        # React components
│   ├── Dockerfile         # Frontend Docker image definition
│   └── package.json       # Frontend dependencies
├── .gitignore
├── docker-compose.yml     # Multi-container Docker configuration
└── package.json           # Root package.json for workspace management
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.2.x or higher)
- [Docker](https://www.docker.com/get-started) and Docker Compose

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/honojs2.git
cd honojs2
```

2. Install dependencies for both frontend and backend:
```bash
bun install
```

3. Set up environment variables:
```bash
# Create .env file in the backend directory
cp backend/.env.example backend/.env
# Edit the .env file with your database credentials and other settings
```

## How to Use This Project

### Development Workflow

#### Option 1: Running with Docker (Recommended for Full Environment)

This will start the frontend, backend, and PostgreSQL database in containers:

```bash
bun run docker:up
```

Access your application at:
- Frontend: http://localhost:3000
- API: http://localhost:3000/api
- API Health Check: http://localhost:3000/api

#### Option 2: Running Locally

1. Start PostgreSQL (you can use Docker for this):

```bash
docker-compose up postgres
```

2. Start both frontend and backend development servers:

```bash
bun run dev
```

Or run them separately:

```bash
bun run dev:backend  # Runs on http://localhost:3000
bun run dev:frontend  # Runs on http://localhost:19006
```

### Making Changes

#### Frontend Development

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Create or modify components in the `components/` directory
3. Create or update pages in the `app/` directory following Expo Router conventions
4. Test your changes with:
```bash
bun run dev
```

#### Backend Development

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create or modify API endpoints in the `src/routes/` directory
3. Implement business logic in the `src/services/` directory
4. Add validation schemas in the `src/schemas/` directory
5. Test your changes with:
```bash
bun run dev
```

### Database Management

#### Generate Migrations

```bash
bun run db:generate
```

#### Apply Migrations

```bash
bun run db:migrate
```

#### Drizzle Studio (Database UI)

```bash
bun run db:studio
```

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Deployment

### Option 1: Docker Deployment (Recommended)

Build and start the containers:

```bash
bun run docker:build  # Build the Docker images
bun run docker:up      # Start the containers
```

This will:
1. Build the frontend static files
2. Build the backend application
3. Start PostgreSQL database
4. Serve the application at http://localhost:3000

### Option 2: Manual Deployment

1. Build both frontend and backend for production:

```bash
bun run build  # Builds both frontend and backend
```

Or build them separately:

```bash
bun run build:frontend  # Builds frontend static files to frontend/dist
bun run build:backend    # Builds backend to backend/dist
```

2. Start the production server (which will serve both the API and frontend):

```bash
bun run start  # Serves both frontend and API
```

### Deployment to Production

For production deployment, consider:

1. Setting up proper environment variables for production
2. Using a process manager like PM2 or containerization
3. Setting up a reverse proxy like Nginx
4. Configuring SSL/TLS certificates

Example production docker-compose configuration is provided in `docker-compose.prod.yml`

## License

MIT
