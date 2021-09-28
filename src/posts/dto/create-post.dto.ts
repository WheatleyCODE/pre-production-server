import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
export class CreatePostDto {
  @ApiProperty({ example: 'Post title', description: 'Title' })
  @IsString({ message: 'Should be string' })
  @Length(0, 20, {
    message: 'Title must be no more than 20',
  })
  title: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  @IsString({ message: 'Should be string' })
  content: string;

  // @ApiProperty({ example: 'http:/doodle.com/img.jpg', description: 'Url img' })
  // @IsString({ message: 'Should be string' })
  // image: string;
}
