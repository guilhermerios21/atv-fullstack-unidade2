# Node.js TypeScript Express MongoDB JWT Application

This project is a backend application built using Node.js, TypeScript, Express, and MongoDB. It implements user authentication using JWT (JSON Web Tokens) and follows a layered architecture.

## Project Structure

```
node-ts-express-mongo-jwt
├── src
│   ├── app.ts                # Entry point of the application, configures middleware and routes
│   ├── server.ts             # Starts the server and connects to the MongoDB database
│   ├── config
│   │   ├── index.ts          # Exports general application configurations
│   │   └── db.ts             # Contains logic to connect to MongoDB
│   ├── controllers
│   │   ├── auth.controller.ts # Handles user registration and authentication
│   │   └── user.controller.ts # Contains user-related operations
│   ├── services
│   │   ├── auth.service.ts    # Business logic for authentication and registration
│   │   └── user.service.ts     # Business logic related to users
│   ├── repositories
│   │   └── user.repository.ts  # Methods to interact with the user collection in MongoDB
│   ├── models
│   │   └── user.model.ts       # Defines the user model with properties and validations
│   ├── routes
│   │   ├── index.ts            # Configures all application routes
│   │   ├── auth.routes.ts       # Routes related to authentication (e.g., /register, /login)
│   │   └── user.routes.ts       # Routes related to user operations
│   ├── middlewares
│   │   ├── auth.middleware.ts   # Middleware to verify JWT token validity
│   │   └── error.middleware.ts   # Middleware to handle errors and send appropriate responses
│   ├── utils
│   │   └── jwt.ts               # Utility functions for generating and verifying JWT tokens
│   ├── types
│   │   └── index.ts             # Exports interfaces and types used throughout the application
│   └── tests
│       ├── auth.test.ts         # Tests for authentication functionalities
│       └── user.test.ts         # Tests for user-related functionalities
├── package.json                 # npm configuration file listing dependencies and scripts
├── tsconfig.json                # TypeScript configuration file specifying compilation options
├── .env.example                 # Example of environment variables to be configured
├── .gitignore                   # Lists files and folders to be ignored by Git
├── jest.config.ts               # Jest configuration for testing (can be removed if not needed)
├── Dockerfile                   # Instructions to build the Docker image for the application
├── docker-compose.yml           # Defines and runs Docker services, including MongoDB
└── README.md                    # Documentation for installation and usage
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd node-ts-express-mongo-jwt
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` and set your MongoDB connection string and other variables.

4. Start the application:
   ```
   npm run start
   ```

## Usage

- Register a new user:
  ```
  POST /api/auth/register
  ```

- Login an existing user:
  ```
  POST /api/auth/login
  ```

- Access user-related operations (requires authentication):
  ```
  GET /api/users
  ```

## Testing

To run tests, use:
```
npm run test
```

## Docker

To run the application using Docker, use:
```
docker-compose up
```

This will start the application along with a MongoDB instance.