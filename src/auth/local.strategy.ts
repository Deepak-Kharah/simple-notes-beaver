import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserWithoutPassword } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    try {
      const user = await this.authService.validateUser(username, password);
      return user;
    } catch (error) {
      throw new UnauthorizedException('invalid username or password');
    }
  }
}
