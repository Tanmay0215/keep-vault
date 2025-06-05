import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import routes from './routes';
import morgan from 'morgan';

// Load environment variables
dotenv.config();

// Initialize express
const app: Express = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true // This is important for cookies
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
