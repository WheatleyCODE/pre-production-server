import { AppService } from './app.service';
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  @Get()
  getUsers(@Req() req: Request) {
    console.log(req.cookies);
    return this.appService.getUsers();
  }
}
