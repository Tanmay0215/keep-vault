import { Request, Response } from 'express';
import User from '../models/user.model';

const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
}

const getUser = async (req: Request, res: Response) => {}

export { createUser, getUser };