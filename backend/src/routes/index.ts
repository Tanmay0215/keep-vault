import { Router } from 'express';
import userRoutes from './user.route';
import noteRoutes from './note.route';
import authRoutes from './auth.route';

import shareRoutes from './share.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);

router.use('/shares', shareRoutes);

export default router;