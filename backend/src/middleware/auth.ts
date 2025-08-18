import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { JwtPayload, AuthUser } from '@/types';
import { prisma } from '@/config/database';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Access token required'
      });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    
    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId, isActive: true },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        isActive: true
      }
    });

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'User not found or inactive'
      });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName || '',
      lastName: user.lastName || ''
    };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
      return;
    }
    
    res.status(500).json({
      success: false,
      error: 'Authentication error'
    });
  }
};

export const generateToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
  // @ts-ignore - JWT types issue with newer versions
  return jwt.sign(
    { userId: payload.userId, email: payload.email, username: payload.username },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
};
