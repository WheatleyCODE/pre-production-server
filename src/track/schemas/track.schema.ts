import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  artist: string;

  @Prop({
    type: String,
  })
  text: string;

  @Prop({
    type: Number,
  })
  listens: number;

  @Prop({
    type: String,
  })
  picture: string;

  @Prop({
    type: String,
  })
  audio: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
