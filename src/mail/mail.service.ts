import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'qb.wheatley@gmail.com',
      pass: '89108821300',
    },
  } as SMTPTransport.Options);

  async sendActivationMail(to: string, link: string) {
    try {
      console.log('Отправляем письмо: ' + to);

      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Активация аккаунта' + process.env.API_URL,
        text: '',
        html: `
          <div>
            <h1>Для активации аккаунта перейдите по ссылке</h1>
            <a href="${link}">Ссылка для активации аккаунта</a>
          </div>
        `,
      });
    } catch (e) {
      throw new HttpException(
        { message: 'Ошибка при отправке письма' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
