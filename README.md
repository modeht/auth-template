# Easygenerator Auth

## Features

- Fastify as the underlying server for fast performance
- User authentication (register, login)
- JWT token generation and validation
- Secure password handling
- Session management
- Rate limiting (100 requests per 1 second as a default)
  - 10 requests per 1 minute for register
  - 10 requests per 1 minute for login
- Frontend is built with React (React Router V7) and TypeScript
- Backend is built with NestJS and TypeScript
- Database is built with MongoDB
- Authentication is built with JWT
- Backend Async Logging with Pino
- Use of Helmet for security
- Full Auth Module Testing
- Modular and clean code
- Composable and reusable components
- Good Separation of Concerns
- Subtle animations with Motion
- Use of tailwindcss for styling
- Defined types for all entities
- No magic numbers and strings
- Swagger API Documentation
- Conventional Commits

## Usage

### With Docker

```bash
docker compose up -d
```

Backend will be available at `http://localhost:3001`

Frontend will be available at `http://localhost:3000/en`

DB will be available at `mongodb://username:password@localhost:27019/database`

### Without Docker

- Install mongodb server or use the one provided by docker

- Install pnpm

- Clone the repository

- Run `pnpm deps:install`

- Create a `.env` file in the root of the project and copy the content of `.env.example`

- Create a `.env` file in the backend folder and copy the content of `.env.example` in the backend folder

- Go Back to the root of the project

- For development run `pnpm dev`

- For production run `pnpm start`

Backend will be available at `http://localhost:3001`

Frontend dev server will be available at `http://localhost:5173/en`

Frontend production server will be available at `http://localhost:3000/en`

DB will be available at `mongodb://username:password@localhost:27019/database` or `mongodb://localhost:27019/database`
if you are using the default credentials

## API Documentation

Swagger API Documentation will be available at `http://localhost:3001/api` and json file will be available at
`http://localhost:3001/api-json`

## Testing

Backend testing is done with Jest and Supertest

To run the tests run `pnpm test`
