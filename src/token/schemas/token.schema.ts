import { User } from '../../users/schemas/user.schema';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({
    type: String,
    required: true,
  })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
