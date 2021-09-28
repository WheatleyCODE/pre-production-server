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
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
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
    try {
      const activationLink = req.params.link;
      this.authService.activateAccount(activationLink);
      return res.redirect(process.env.API_URL);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Нужнон ли тут блок трайкетч?',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('/refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }
}
