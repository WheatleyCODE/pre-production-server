import { UpproveUser } from './dto/upprove-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

interface ICreateUser {
  email: string;
  password: string;
  activationLink: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async createUser(userDto: ICreateUser): Promise<UserDocument> {
    const newUser = this.userModel.create(userDto);
    return newUser;
  }

  async getUserByEmail(email: string) {
    const user = this.userModel.findOne({ email });
    return user;
  }

  async addRole({ value, userId }: AddRoleDto) {
    const user = await this.userModel.findById(userId);
    if (user) {
      user.role = value;
      await user.save();
      return user;
    }

    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async banUser({ reason, userId }: BanUserDto) {
    const user = await this.userModel.findById(userId);
    if (user) {
      user.banned = true;
      user.banReason = reason;
      await user.save();
      return user;
    }

    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async upproveUser({ userId }: UpproveUser) {
    const user = await this.userModel.findById(userId);
    if (user) {
      user.banned = false;
      user.banReason = null;
      await user.save();
      return user;
    }

    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }
}
