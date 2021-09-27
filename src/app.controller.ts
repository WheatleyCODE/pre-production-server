import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  @Get()
  getUsers() {
    return this.appService.getUsers();
  }
}
