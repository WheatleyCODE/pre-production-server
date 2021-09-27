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

  async createUser(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userDto);

    return newUser.save();
  }

  async getUserByEmail(email: string) {
    const user = this.userModel.findOne({ email });
    return user;
  }
}
