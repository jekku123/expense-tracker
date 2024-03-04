import { inject, injectable } from 'inversify';
import { INTERFACE_TYPE } from '../utils/dependencies';

import { IAuthService } from '../types/IAuthService';
import AppError from '../utils/errors/AppError';
import { ERROR_MESSAGES } from '../utils/errors/errorMessages';
import { STATUS_CODES } from '../utils/errors/statusCodes';

import User from '../models/user';
import { ITokenService } from '../types/ITokenService';
import { logger } from './logger.service';

@injectable()
export class AuthService implements IAuthService {
  private tokenService: ITokenService;

  constructor(@inject(INTERFACE_TYPE.TokenService) tokenService: ITokenService) {
    this.tokenService = tokenService;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!email || !password) {
      throw new AppError(ERROR_MESSAGES.MISSING_CREDENTIALS, STATUS_CODES.BAD_REQUEST);
    }

    const user = await User.findOne({ email });

    if (!user || !(await Bun.password.verify(password, user.password))) {
      throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED, {
        email,
      });
    }

    const { accessToken, refreshToken } = this.tokenService.generateTokens({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

    logger.info(`User with email ${email} logged in`, AuthService.name);

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<string> {
    const decoded = this.tokenService.verifyRefreshToken(refreshToken);

    if (!decoded.user) {
      throw new AppError(ERROR_MESSAGES.INVALID_TOKEN, STATUS_CODES.UNAUTHORIZED);
    }

    const user = await User.findById(decoded.user.id);

    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND, {
        email: decoded.user.email,
      });
    }

    const accessToken = this.tokenService.generateAccessToken({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

    logger.info(`User with email ${user.email} refreshed token`, AuthService.name);

    return accessToken;
  }
}
