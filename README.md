# Hono.js with Bun, Drizzle ORM, and PostgreSQL

A clean, maintainable API built with Hono.js, Bun, Drizzle ORM, and PostgreSQL. This project follows a modular architecture with separate files for each function to ensure maintainability.

## Features

- **Hono.js**: Fast, lightweight web framework
- **Bun**: JavaScript/TypeScript runtime with built-in bundler, transpiler, task runner, and npm client
- **Drizzle ORM**: TypeScript ORM with a focus on type safety
- **PostgreSQL**: Powerful, open-source relational database
- **Docker**: Containerization for easy development and deployment

## Project Structure

```
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── db/             # Database related files
│   │   ├── migrations/ # Database migrations
│   │   └── schema/     # Database schema definitions
│   ├── middlewares/    # Custom middleware functions
│   ├── models/         # Data models
│   ├── routes/         # Route definitions
│   ├── services/       # Business logic
│   └── utils/          # Utility functions
├── .gitignore
├── docker-compose.yml  # Docker configuration
├── Dockerfile          # Docker image definition
├── drizzle.config.ts   # Drizzle ORM configuration
├── package.json        # Project dependencies
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.2.x or higher)
- [Docker](https://www.docker.com/get-started) and Docker Compose

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

### Development

#### Running with Docker

This will start both the application and PostgreSQL database:

```bash
docker-compose up
```

#### Running Locally

1. Start PostgreSQL (you can use Docker for this):

```bash
docker-compose up postgres
```

2. Start the development server:

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

To build for production:

```bash
bun run build
```

To start the production server:

```bash
bun run start
```

## License

MIT
