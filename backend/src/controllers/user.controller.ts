import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendVerificationEmail } from '../services/email.service';

// Cookie options
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 360000 * 1000,
};

export const getUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: 'Error fetching user', error });
    }
}

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            emailVerificationToken: verificationToken,
            emailVerificationExpires: verificationExpires,
        });

        await user.save();

        // Send verification email
        await sendVerificationEmail(email, verificationToken);

        return res.status(201).json({
            message: 'User registered successfully. Please check your email to verify your account.',
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Server error during registration', error: error.message });
        }
        return res.status(500).json({ message: 'An unknown server error occurred during registration' });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = "";
        user.emailVerificationExpires = undefined;
        await user.save();

        return res.status(200).json({ message: 'Email verified successfully! You can now login.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error during verification' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if email is verified
        if (!user.isEmailVerified) {
            return res.status(400).json({ message: 'Please verify your email before logging in' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'yourSecretToken',
            { expiresIn: 360000 }
        );

        res.cookie('token', token, cookieOptions);

        return res.json({
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Server error during login', error: error.message });
        }
        return res.status(500).json({ message: 'An unknown server error occurred during login' });
    }
};