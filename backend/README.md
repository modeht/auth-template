# Easygenerator Auth

## Overview

Easygenerator Auth is an authentication system designed for Easygenerator applications. It provides secure user authentication, authorization, and session management capabilities to integrate with Easygenerator products.

## Features

- User authentication (login/logout)
- User registration and account management
- JWT token generation and validation
- Secure password handling
- Session management
- Rate limiting (100 requests per 1 second as a default)
  - 10 requests per 1 minute for register
  - 10 requests per 1 minute for login

## Repository Structure

```
project/
├── src/                  # Source code
    ├── auth/             # Auth module
    ├── db/               # DB module definition
    ├── users/            # Users module
└── scripts/              # Utility scripts
```

## Installation

```bash
# Clone the repository
git clone https://github.com/modeht/auth-template.git

# Navigate to the project directory
cd backend

# Install dependencies
pnpm install
```

## Configuration

```bash
cp .env.example .env
```

Edit the `.env` file with your own values.

## API Reference

For detailed API documentation, please refer to the [API Reference]('http://localhost:3001/api').

## Development

### With Docker

1- Run a mongodb container

```bash
docker run -d --name mongodb -p 27017:27017 mongo:8
```

Edit the `.env` file with the required values.

2- Start development server

```bash
pnpm start:dev
```

### With Local MongoDB

1- Make sure you have a local mongodb instance running

2- Edit the `.env` file with the required values

3- Start the development server

```bash
pnpm start:dev
```

### Running Auth Module Tests

```bash
pnpm test -- auth
```

### Building for Production

```bash
pnpm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
