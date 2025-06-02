import { Router } from 'express';
import userRoutes from './user.route'; 

const router = Router();

// Routes will be imported here
// Example: import authRoutes from './auth.routes';
router.use('/user', userRoutes);

export default router;
