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
    // Get token from cookie
    const token = req.cookies.token;

    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const secret = process.env.JWT_SECRET || 'yourSecretToken';
        const decoded = jwt.verify(token, secret) as JwtPayload;

        // Add user from payload to request object
        req.user = decoded.user;
        req.body.userId = decoded.user.id;
        return next();
    } catch (error) {
        console.error('Token verification failed:', error);
        // Clear the invalid cookie
        res.cookie('token', '', { expires: new Date(0) });
        return res.status(401).json({
            message: 'Token is not valid',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
