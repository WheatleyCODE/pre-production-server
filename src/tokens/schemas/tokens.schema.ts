import { User } from './../../users/schemas/user.schema';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TokensDocument = Tokens & Document;

@Schema()
export class Tokens {
  @Prop({
    type: String,
    required: true,
  })
  accessToken: string;

  @Prop({
    type: String,
    required: true,
  })
  refreshToken: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  userId: User;
}

export const UserSchema = SchemaFactory.createForClass(Tokens);
