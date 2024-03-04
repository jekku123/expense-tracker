import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { ITokenService } from '../types/ITokenService';

const ACCESS_TOKEN = Bun.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN = Bun.env.REFRESH_TOKEN_SECRET as string;

@injectable()
export class TokenService implements ITokenService {
  private sign(payload: any, secret: string, options?: any): string {
    return jwt.sign(payload, secret, options);
  }

  private verify(token: string, secret: string): any {
    return jwt.verify(token, secret);
  }

  generateAccessToken(payload: any): string {
    return this.sign(payload, ACCESS_TOKEN, { expiresIn: '15m' });
  }

  generateRefreshToken(payload: any): string {
    return this.sign(payload, REFRESH_TOKEN, { expiresIn: '7d' });
  }

  verifyRefreshToken(token: string): any {
    return this.verify(token, REFRESH_TOKEN);
  }

  generateTokens(payload: any): { accessToken: string; refreshToken: string } {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
}
