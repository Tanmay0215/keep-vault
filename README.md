# Keep Vault

A secure and modern note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript.

## 🚀 Features

- Secure user authentication
- Create, read, update, and delete notes
- Modern and responsive UI with Chakra UI
- Type-safe backend and frontend with TypeScript
- RESTful API architecture

## 📦 Tech Stack

### Backend
- Node.js + Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled
- Environment variables support

### Frontend
- React with Vite
- TypeScript
- Chakra UI for components
- Axios for API calls
- React Router for navigation
- Local storage for persistent data

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

4. Start the development server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── types/          # TypeScript interfaces
│   └── utils/          # Helper functions
```

### Frontend Structure
```
frontend/
├── src/
│   ├── assets/         # Static files
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── store/          # State management
│   ├── types/          # TypeScript types
│   └── utils/          # Helper functions
```

## 🔑 API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Notes
- GET `/api/notes` - Get all notes
- POST `/api/notes` - Create a new note
- GET `/api/notes/:id` - Get a specific note
- PUT `/api/notes/:id` - Update a note
- DELETE `/api/notes/:id` - Delete a note

## 🔒 Environment Variables

### Backend
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## 📝 Scripts

### Backend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request
