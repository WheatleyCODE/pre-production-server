import { FilesService, FileType } from './../files/files.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private filesService: FilesService,
  ) {}
  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.filesService.createFileTwo(FileType.AUDIO, audio);
    const picturePath = this.filesService.createFileTwo(
      FileType.IMAGE,
      picture,
    );
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track;
  }

  async addComment({
    trackId,
    text,
    username,
  }: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(trackId);
    const comment = await this.commentModel.create({ trackId, text, username });
    track.comments.push(comment._id);
    await track.save();

    return comment;
  }

  async addListen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    await track.save();
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });

    return tracks;
  }
}
