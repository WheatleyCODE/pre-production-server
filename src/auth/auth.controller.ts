import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@ApiTags('Autorization')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const userData = await this.authService.login(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @Get('/activate/:link')
  activateAccount(@Req() req: Request, @Res() res: Response) {
    const activationLink = req.params.link;
    this.authService.activateAccount(activationLink);
    return res.redirect(process.env.API_URL);
  }

  @Get('/refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }
}
