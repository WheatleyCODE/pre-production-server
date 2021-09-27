import { User } from './../users/schemas/user.schema';
import { Injectable, HttpStatus, HttpException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  async registration({ email, password }: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(email);
    if (candidate) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, 8);
    console.log('end');
    const user = await this.usersService.createUser({
      email,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken({ email, id, role }: User) {
    const payload = { email, id, role };
    return {
      token: this.jwtService.sign(payload),
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
