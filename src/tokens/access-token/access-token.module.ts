import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AccessTokenService } from './access-token.service';

@Module({
  providers: [AccessTokenService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  exports: [AccessTokenService, JwtModule],
})
export class AccessTokenModule {}
