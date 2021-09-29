import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokensService } from './refresh-token.service';

@Module({
  providers: [RefreshTokensService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY_REFRESH || 'SECRET_REFRESH',
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
  exports: [RefreshTokensService],
})
export class RefreshTokenModule {}
