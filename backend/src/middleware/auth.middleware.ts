import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    user: {
        id: string;
    }
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload['user'];
        }
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretToken') as JwtPayload;

        // Add user from payload to request object
        req.user = decoded.user;
        req.body.userId = decoded.user.id;
        next();
        return;
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};
