import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, LeanDocument, Model } from 'mongoose';
import { hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/users.schema';

const saltRounds = 10;

export declare interface UserWithoutPassword
  extends Omit<FlattenMaps<LeanDocument<UserDocument>>, 'password'> {}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: CreateUserDto): Promise<UserWithoutPassword> {
    const existingUser = await this.userModel
      .findOne({ username: userDto.username })
      .exec();

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = await hash(userDto.password, saltRounds);

    const createdUser = await new this.userModel({
      username: userDto.username,
      password: passwordHash,
    }).save();

    const { password: _password, ...user } = createdUser.toJSON();
    return user;
  }

  async findOne(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }
}
