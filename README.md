# AI Teacher – AI-Driven Learning Platform

A learning platform where a user picks a category and sub-category, sends a prompt, and receives an AI-generated lesson. Every lesson is saved, so users can come back to their learning history, and an admin can see all users and their prompts.

## Features

- Sign up and sign in with JWT authentication
- Role-based access: regular users and an admin
- Choose a topic by category and sub-category
- Send a prompt and get a structured lesson from the OpenAI API
- Personal learning history
- Admin dashboard with all users and their prompt history

## Tech stack

| Layer | Technologies |
| --- | --- |
| Front end | React, TypeScript, React Router, Axios |
| Back end | Node.js, Express, TypeScript |
| Database | MongoDB with Mongoose |
| AI | OpenAI Chat Completions API |
| Auth | JSON Web Tokens |

## Project structure

```
AIDrivenLearningPlatform/
├── backend/
│   └── src/
│       ├── config/        # Database connection
│       ├── controllers/   # Request handlers
│       ├── models/        # Mongoose models: User, Category, SubCategory, Prompt
│       ├── routes/        # API routes
│       ├── services/      # Business logic and AI integration
│       ├── Middleware/    # Authentication and authorization
│       ├── app.ts         # Express app setup
│       └── server.ts      # Entry point
└── frontend/
    └── src/
        ├── pages/         # SignIn, SignUp, Customer, History, Admin
        ├── components/    # Shared components
        ├── hooks/         # Custom React hooks
        ├── services/      # API calls
        └── App.tsx
```

## API

| Method | Route | Description | Access |
| --- | --- | --- | --- |
| POST | `/users` | Register a new user | Public |
| POST | `/users/signin/:id` | Sign in and receive a JWT | Public |
| GET | `/users` | List all users | Admin |
| GET | `/categories` | List categories | User |
| GET | `/sub-categories/category/:category_id` | List sub-categories of a category | User |
| POST | `/prompts` | Send a prompt to the AI and save the lesson | User |
| GET | `/prompts/user/:user_id` | A user's learning history | User |
| GET | `/prompts/all` | All prompts | Admin |

Protected routes expect an `Authorization: Bearer <token>` header. A Postman collection is included in `backend/postman_collection.json`.

## Getting started

### Prerequisites

- Node.js
- A MongoDB database (MongoDB Atlas or local)
- An OpenAI API key

### Back end

```bash
cd backend
npm install
cp .env.example .env   # then fill in your own values
npm run dev
```

The server runs on `http://localhost:3000`.

Environment variables in `backend/.env`:

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `OPENAI_API_KEY` | OpenAI API key |
| `JWT_SECRET` | Secret used to sign tokens |
| `ADMIN_ID` | ID of the user who gets admin access |

Never commit the `.env` file or real credentials.

### Front end

```bash
cd frontend
npm install
npm start
```

The app runs on `http://localhost:3001`.

## Example flow

1. A user registers with an ID, name and phone number.
2. They sign in and choose **Science → Space**.
3. They send the prompt "Teach me about black holes".
4. The server sends the prompt to the AI, saves the lesson and returns it.
5. The lesson appears on the History page for later review.
