import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendActivationMail(to: string, link: string) {
    console.log('Отправляем письмо: ' + to);
    return null;
  }
}
