import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

import AppError from '../utils/errors/AppError';
import { ERROR_MESSAGES } from '../utils/errors/errorMessages';

export const JWT_SECRET: Secret = Bun.env.ACCESS_TOKEN_SECRET as string;

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization || (req.headers.Authorization as string);

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError(ERROR_MESSAGES.MISSING_TOKEN);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AppError(ERROR_MESSAGES.MISSING_TOKEN);
    }

    const decoded: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded.user) {
      throw new AppError(ERROR_MESSAGES.INVALID_TOKEN);
    }

    req.user = decoded.user;

    next();
  } catch (error) {
    next(error);
  }
};
