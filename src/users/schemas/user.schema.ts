import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: '1', description: 'User ID' })
  @Prop()
  id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  @Prop({
    type: String,
    required: true,
  })
  password: string;

  // ! Сделать апи
  @Prop()
  resetToken: string;
  @Prop()
  resetTokenExp: Date;

  @ApiProperty({ example: 'Vasya', description: 'FirstName' })
  @Prop()
  firstName: string;

  @ApiProperty({ example: 'Pupkin', description: 'LastName' })
  @Prop()
  lastName: string;

  @ApiProperty({ example: false, description: 'User banned? y/n' })
  @Prop({ default: false })
  banned: boolean;

  @ApiProperty({ example: 'Very hot', description: 'Reason banned' })
  @Prop()
  banReason: string;

  // ! Сделать апи
  @Prop({ default: [] }) // ! my events (for artist)
  events: [];
  @Prop({ default: [] }) // ! Подписки на евенты (для пользователей)
  subscribe: [];

  @ApiProperty({
    example: 'user',
    description: 'Role: "USER | ARTIST | ADMIN"',
  })
  @Prop({
    default: 'USER',
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
