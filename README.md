# AI Teacher - Learning Platform

A mini learning platform that allows users to select what they want to learn by category and sub-category, send prompts to an AI to receive generated lessons, and view their learning history.

---

## Technologies Used

**Backend:**
- Node.js + TypeScript
- Express.js
- MongoDB + Mongoose
- OpenAI GPT API
- JWT Authentication
- cors
- dotenv

**Frontend:**
- React + TypeScript
- React Router DOM
- Axios

---

## Project Structure

```
פרויקט פרקטיקום/
├── backend/                  # Backend REST API
│   └── src/
│       ├── config/           # Database connection
│       ├── controllers/      # Request handlers
│       ├── models/           # Mongoose models (User, Category, SubCategory, Prompt)
│       ├── routes/           # API route definitions
│       ├── services/         # Business logic & AI integration
│       ├── Middleware/       # Authentication & Authorization
│       ├── app.ts            # Express app setup
│       └── server.ts         # Entry point
└── frontend/                 # Frontend Web Application
    └── src/
        ├── pages/            # React pages (SignIn, SignUp, Customer, History, Admin)
        ├── components/       # Shared components (Header)
        ├── hooks/            # Custom React hooks
        ├── services/         # API calls
        └── App.tsx           # Main application component
```

---

## API Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /users | Register a new user | None |
| POST | /users/signin/:id | Login and receive JWT token | None |
| GET | /users | Get all users | Admin |
| GET | /categories | Get all categories | User |
| GET | /sub-categories/category/:category_id | Get sub-categories by category | User |
| POST | /prompts | Send prompt to AI and save lesson | User |
| GET | /prompts/user/:user_id | Get user's learning history | User |
| GET | /prompts/all | Get all prompts history | Admin |

---

## Assumptions

- Users are identified by a unique ID string
- Admin accounts are determined by matching the user ID with the ADMIN_ID environment variable
- Categories and sub-categories must exist before users can submit prompts
- The AI generates lesson-like responses using OpenAI GPT API
- All protected routes require JWT authentication via Bearer token
- MongoDB Atlas is used as the cloud database solution
- The frontend runs on port 3001 and the backend on port 3000

---

## Setup Instructions

### Prerequisites
- Node.js v16+
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd פרויקט פרקטיקום
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file inside `backend/`:
```
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
ADMIN_ID=236589475
```

4. Run the backend:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd ../frontend
```

2. Install frontend dependencies:
```bash
npm install
```

3. Run the frontend:
```bash
npm start
```

The frontend will start on `http://localhost:3001`

---

## Sample .env File

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
GROQ_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_key_here
ADMIN_ID=236589475
```

---

## How to Run Locally

1. Start the backend server (Terminal 1):
```bash
cd backend
npm run dev
```

2. Start the frontend (Terminal 2):
```bash
cd frontend
npm start
```

3. Open your browser at `http://localhost:3001`

---

## Viewing Database Content

The project uses MongoDB Atlas as the cloud database. The database is publicly accessible (IP whitelist: 0.0.0.0/0):

**MongoDB Connection String:**
```
mongodb+srv://naomi0548553334_db_user:RAjmc66llkdXGWsE@practicum-project.eiui5o8.mongodb.net/Practicum-Project?retryWrites=true&w=majority
```

**Collections:**
- **users** - All registered users
- **categories** - Learning categories (e.g., Science, Math)
- **sub_categories** - Sub-categories under each category (e.g., Space, Physics)
- **prompts** - All user questions and AI responses (learning history)

**How to view:**

1. **Via MongoDB Compass (Recommended):**
   - Download MongoDB Compass from https://www.mongodb.com/products/compass
   - Paste the connection string above
   - Click "Connect"
   - Browse the collections visually

2. **Via MongoDB Atlas Web Interface:**
   - Log in to MongoDB Atlas at https://cloud.mongodb.com
   - Use the connection string above

---

## Example Use Case

1. Israel registers with his ID, name, and phone number
2. He logs in and selects **Science → Space**
3. He enters a prompt: "Teach me about black holes"
4. The system sends the prompt to OpenAI and returns a structured lesson
5. Israel can revisit the History page later to view all his lessons

---

## Bonus Features Implemented

The following optional bonuses from the task requirements were implemented:

- TypeScript used in both frontend and backend
- JWT-based user authentication with role-based access control
- Admin dashboard to view all users and their prompt history
