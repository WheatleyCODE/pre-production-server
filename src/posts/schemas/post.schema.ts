import { User } from '../../users/schemas/user.schema';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @ApiProperty({ example: '1', description: 'User ID' })
  @Prop()
  id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Post title', description: 'Title' })
  @Prop({
    required: true,
  })
  title: string;

  @ApiProperty({ example: 'Post content', description: 'Content' })
  @Prop({
    required: true,
  })
  content: string;

  @ApiProperty({ example: 'http:/doodle.com/img.jpg', description: 'Img url' })
  @Prop({
    required: true,
  })
  image: string;

  @ApiProperty({ example: '12dsadffsda', description: 'User Id' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
