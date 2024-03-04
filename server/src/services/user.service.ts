import { injectable } from 'inversify';

import { ERROR_MESSAGES } from '../utils/errors/errorMessages';

import User, { UserType } from '../models/user';
import AppError from '../utils/errors/AppError';
import { STATUS_CODES } from '../utils/errors/statusCodes';

import { IUserService } from '../types/IUserService';
import { logger } from './logger.service';

@injectable()
export class UserService implements IUserService {
  async register(username: string, email: string, password: string): Promise<UserType> {
    const user = await User.findOne({ email });

    if (user) {
      throw new AppError(ERROR_MESSAGES.USER_ALREADY_EXISTS, STATUS_CODES.CONFLICT, { email });
    }

    const userObj = new User({ username, email, password });
    const newUser = await userObj.save();

    logger.log(`User with email ${email} registered`, UserService.name);

    return newUser;
  }

  async getUserProfile(id: string): Promise<UserType> {
    const user = await User.findById(id);

    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND, { id });
    }

    logger.log(`User with id ${id} fetched`, UserService.name);

    return user;
  }

  async updatePassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<UserType | null> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND, { email });
    }

    if (!user || !(await Bun.password.verify(oldPassword, user.password))) {
      throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED);
    }

    const hashedPassword = await Bun.password.hash(newPassword);
    const updatedUser = await User.findOneAndUpdate(
      {
        email,
      },
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      throw new AppError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }

    logger.log(`User with email ${email} updated password`, UserService.name);

    return updatedUser;
  }
}
