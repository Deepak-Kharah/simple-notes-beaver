import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UsersService, UserWithoutPassword } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const existingUser = await this.usersService.findOneByUsername(username);

    const isPasswordEqual = await compare(password, existingUser.password);

    if (!isPasswordEqual) {
      throw new UnprocessableEntityException('Invalid username or password');
    }
    const { password: _password, ...user } = existingUser.toJSON();
    return user;
  }

  async getJwtToken(user: UserWithoutPassword) {
    return this.jwtService.sign({}, { subject: String(user.username) });
  }
}
