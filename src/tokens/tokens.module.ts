import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { AccessTokenModule } from './access-token/access-token.module';
import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Module({
  providers: [TokensService],
  imports: [AccessTokenModule, RefreshTokenModule],
})
export class TokensModule {}
