import { TokensModule } from './../tokens/tokens.module';
import { AuthModule } from './../auth/auth.module';
import { User, UserSchema } from './schemas/user.schema';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    TokensModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
