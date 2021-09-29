import { TokensModule } from './../tokens/tokens.module';
import { MailModule } from './../mail/mail.module';
import { UsersModule } from './../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule), MailModule, TokensModule],
  exports: [AuthService],
})
export class AuthModule {}
