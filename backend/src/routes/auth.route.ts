import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/user.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

// @route   POST api/auth/logout
// @desc    Logout user & clear cookie
// @access  Public
router.post('/logout', (_, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.json({ message: 'Logged out successfully' });
});

// @route   GET api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.get('/verify', auth, (_, res) => res.json({ isValid: true }));

export default router;
