import { compare } from 'bcrypt';

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService, UserWithoutPassword } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const existingUser = await this.usersService.findOne(username);

    const isPasswordEqual = await compare(password, existingUser.password);

    if (!isPasswordEqual) {
      throw new UnprocessableEntityException('Invalid username or password');
    }
    const { password: _password, ...user } = existingUser.toJSON();
    return user;
  }
}
