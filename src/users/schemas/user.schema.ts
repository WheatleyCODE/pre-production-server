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
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  // *
  @Prop({
    type: Boolean,
    default: false,
  })
  isActivated: boolean;
  @Prop({
    type: String,
  })
  activationLink: string;
  // *

  @ApiProperty({ example: '123456', description: 'Password' })
  @Prop({
    type: String,
    required: true,
  })
  password: string;

  // ! Сделать апи
  @Prop({
    type: String,
  })
  resetToken: string;
  @Prop({
    type: Date,
  })
  resetTokenExp: Date;

  @ApiProperty({ example: 'Oxxxymiron', description: 'userName' })
  @Prop({
    type: String,
  })
  userName: string;

  @ApiProperty({ example: 'Vasya', description: 'FirstName' })
  @Prop({
    type: String,
  })
  firstName: string;

  @ApiProperty({ example: 'Pupkin', description: 'LastName' })
  @Prop({
    type: String,
  })
  lastName: string;

  @ApiProperty({ example: false, description: 'User banned? y/n' })
  @Prop({
    type: Boolean,
    default: false,
  })
  banned: boolean;

  @ApiProperty({ example: 'Very hot', description: 'Reason banned' })
  @Prop({
    type: String,
  })
  banReason: string;

  // ! Сделать апи
  @Prop({ default: [] }) // ! my events (for artist)
  events: [];
  @Prop({ default: [] }) // ! Подписки на евенты (для пользователей)
  subscribe: [];
  @Prop({ default: [] }) // ! Посты пользователя (Возможно и не нужно)
  posts: [];

  @ApiProperty({
    example: 'user',
    description: 'Role: "USER | ARTIST | ADMIN"',
  })
  @Prop({
    default: 'USER',
    type: String,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
