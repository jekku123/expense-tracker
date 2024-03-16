import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { INTERFACE_TYPE } from '../config/dependencies';

import AppError from '../config/errors/AppError';
import { ERROR_MESSAGES } from '../config/errors/errorMessages';
import { STATUS_CODES } from '../config/errors/statusCodes';
import { IAuthService } from '../types/IAuthService';

@injectable()
export class AuthController {
  private authService: IAuthService;

  constructor(@inject(INTERFACE_TYPE.AuthService) authService: IAuthService) {
    this.authService = authService;
  }

  /**
   * @route POST /api/auth/register
   * @desc Register a new user
   * @access Public
   */
  async onLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const { accessToken, refreshToken } = await this.authService.login(email, password);

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(STATUS_CODES.OK).send({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route POST /api/auth/refresh-token
   * @desc Refresh access token
   * @access Public
   */
  async onRefreshToken(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;

    try {
      const refreshToken = cookies?.jwt;
      if (!refreshToken) {
        throw new AppError(ERROR_MESSAGES.MISSING_TOKEN, STATUS_CODES.BAD_REQUEST);
      }
      const accessToken = await this.authService.refreshToken(refreshToken);
      res.status(STATUS_CODES.OK).send({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route POST /api/auth/logout
   * @desc Logout
   * @access Public
   */
  async onLogout(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(STATUS_CODES.NO_CONTENT);
    }
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(STATUS_CODES.OK).send({ message: 'Logged out' });
  }
}
