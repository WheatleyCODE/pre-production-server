import { TokensService } from '../tokens/tokens.service';
import { FilesService } from './../files/files.service';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private filesService: FilesService,
    private tokensService: TokensService,
  ) {}
  async createPost(req: Request, createPostDto: CreatePostDto, image: any) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];

      const user = this.tokensService.verifyAccessToken(token);
      const fileName = await this.filesService.createFile(image);

      const post = new this.postModel({
        ...createPostDto,
        image: fileName,
        author: user._id,
      });
      return post.save();
    } catch (e) {
      throw new HttpException(
        'Ошбка при создании поста',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllPosts(): Promise<PostDocument[]> {
    return this.postModel.find().populate('author').exec();
  }
}
