export interface ITokenService {
  generateAccessToken(payload: any): string;
  generateRefreshToken(payload: any): string;
  verifyRefreshToken(token: string): any;
  generateTokens(payload: any): { accessToken: string; refreshToken: string };
}
