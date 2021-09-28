import { MailService } from './../mail/mail.service';
import { User, UserDocument } from './../users/schemas/user.schema';
import {
  Injectable,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  async registration({ email, password }: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким Email уже сущетсвует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(password, 8);
    // ! Можно использовать захешированный пароль для создания ссылки активации
    const activationLink = uuid.v4();
    const user = await this.usersService.createUser({
      email,
      password: hashPassword,
      activationLink,
    });
    this.mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`,
    );

    return this.generateToken(user);
  }

  async logout() {
    return null;
  }

  async refreshToken() {
    return null;
  }

  async activateAccount(link: string) {
    const user = await this.usersService.getUserByActivationLink(link);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    user.isActivated = true;
    await user.save();
  }

  private generateToken({ email, _id, role }: UserDocument) {
    const payload = { email, _id, role };
    return {
      accesstoken: this.jwtService.sign(payload),
    };
  }

  private async validateUser({ email, password }: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(email);
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Uncorrect Email or Password' });
  }
}
