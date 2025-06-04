import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Error handling middleware
// app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Something went wrong!' });
// });

// Routes
app.use('/api', routes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
