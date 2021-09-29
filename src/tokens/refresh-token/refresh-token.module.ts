import { Module } from '@nestjs/common';
import { RefreshTokensService } from './refresh-token.service';

@Module({
  providers: [RefreshTokensService],
  exports: [RefreshTokensService],
})
export class RefreshTokenModule {}
