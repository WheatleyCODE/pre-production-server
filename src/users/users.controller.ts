import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getUsers(): Promise<UserDocument[]> {
    return this.usersService.getAll();
  }
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUser: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUser);
  }
}
