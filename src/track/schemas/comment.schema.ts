import { Track } from './track.schema';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({
    type: String,
  })
  username: string;

  @Prop({
    type: String,
  })
  text: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
  })
  trackId: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
