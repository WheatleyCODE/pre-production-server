import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userDto);

    return newUser.save();
  }
}
