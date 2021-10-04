import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import {
  Controller,
  HttpCode,
  Post,
  Get,
  UsePipes,
  HttpStatus,
  Body,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: Post })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Req() req: Request,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image,
  ): any {
    return this.postsService.createPost(req, createPostDto, image);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  getAllPosts() {
    return this.postsService.getAllPosts();
  }
}
