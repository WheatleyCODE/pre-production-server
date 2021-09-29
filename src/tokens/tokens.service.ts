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
}
