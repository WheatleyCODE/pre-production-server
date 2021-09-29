import { UserDocument } from './../users/schemas/user.schema';
import { AccessTokenService } from './access-token/access-token.service';
import { RefreshTokensService } from './refresh-token/refresh-token.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokensService {
  constructor(
    private refreshToken: RefreshTokensService,
    private accessTokenService: AccessTokenService,
  ) {}

  verifyAccessToken(token: string) {
    return this.accessTokenService.verify(token);
  }

  verifyRefreshToken(token: string) {
    return this.refreshToken.verify(token);
  }

  generateTokens({ email, _id, role }: UserDocument) {
    const payload = { email, _id, role };
    return {
      accessToken: this.accessTokenService.generateToken(payload),
      refreshToken: this.refreshToken.generateToken({
        ...payload,
        secretTest: 'Тестовое поле',
      }),
    };
  }
}
