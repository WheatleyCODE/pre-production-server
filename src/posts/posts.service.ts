import { FilesService } from './../files/files.service';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PostsService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private filesService: FilesService,
  ) {}
  async createPost(req: Request, createPostDto: CreatePostDto, image: any) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const user = this.jwtService.verify(token);
    const fileName = await this.filesService.createFile(image);

    const post = new this.postModel({
      ...createPostDto,
      image: fileName,
      author: user._id,
    });
    return post.save();
  }
}