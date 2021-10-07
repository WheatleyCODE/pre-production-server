import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './../users/schemas/user.schema';
import { AccessTokenService } from './access-token/access-token.service';
import { RefreshTokensService } from './refresh-token/refresh-token.service';
import { Injectable } from '@nestjs/common';
import { Tokens, TokensDocument } from './schemas/tokens.schema';
import { Model } from 'mongoose';

@Injectable()
export class TokensService {
  constructor(
    private refreshToken: RefreshTokensService,
    private accessTokenService: AccessTokenService,
    @InjectModel(Tokens.name) private tokensModel: Model<TokensDocument>,
  ) {}

  verifyAccessToken(token: string) {
    return this.accessTokenService.verify(token);
  }

  verifyRefreshToken(token: string) {
    return this.refreshToken.verify(token);
  }

  async generateTokens({
    email,
    _id,
    role,
    isActivated,
    userName,
  }: UserDocument) {
    const payload = { email, _id, role, isActivated };
    const accessToken = this.accessTokenService.generateToken(payload);
    const refreshToken = this.refreshToken.generateToken({
      ...payload,
      secretTest: 'Тестовое поле',
    });

    await this.saveTokens(_id, accessToken, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: { ...payload, userName },
    };
  }

  async removeTokens(refreshToken: string) {
    const tokenData = this.tokensModel.deleteOne({ refreshToken });
    return tokenData;
  }

  private async saveTokens(userId, accessToken: string, refreshToken: string) {
    try {
      const tokensData = await this.tokensModel.findOne({ userId });

      if (tokensData) {
        tokensData.refreshToken = refreshToken;
        tokensData.accessToken = accessToken;
        return tokensData.save();
      }

      const tokens = await this.tokensModel.create({
        userId,
        accessToken,
        refreshToken,
      });

      return tokens.save();
    } catch (e) {
      console.log(e);
    }
  }

  async validateRefreshTokenToken(token: string) {
    try {
      const userData = this.verifyRefreshToken(token);
      const refreshTokenData = await this.tokensModel.findOne({
        refreshToken: token,
      });

      if (!userData || !refreshTokenData) {
        return false;
      }

      return {
        userData,
        refreshTokenData,
      };
    } catch (e) {
      return false;
    }
  }
}
