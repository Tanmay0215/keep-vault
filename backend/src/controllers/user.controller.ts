import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        user.password = await bcrypt.hash(password, 10);
        await user.save();
        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'yourSecretToken', // Use environment variable for secret
            { expiresIn: 360000 } // Token expires in 100 hours
        );

        res.cookie('token', token)
        return res.status(201).json({ user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Server error during registration', error: error.message });
        }
        return res.status(500).json({ message: 'An unknown server error occurred during registration' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT Payload
        const payload = {
            user: {
                id: user.id,
            },
        };        // Sign token and return response
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'yourSecretToken', // Use environment variable for secret
            { expiresIn: 360000 } // Token expires in 100 hours
        );

        return res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Server error during login', error: error.message });
        }
        return res.status(500).json({ message: 'An unknown server error occurred during login' });
    }
};
