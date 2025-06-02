import express from 'express';
import { createUser, getUser } from '../controllers/user.controller.js';

const router = express.Router();

// Route to get user details
router.get('/create', createUser);
router.get('/:id', getUser);

export default router;