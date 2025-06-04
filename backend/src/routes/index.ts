import { Router } from 'express';
import userRoutes from './user.route';
import noteRoutes from './note.route';
import authRoutes from './auth.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);

export default router;
