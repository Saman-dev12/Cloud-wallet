import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET as string);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authMiddleware;
