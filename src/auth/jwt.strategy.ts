import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { UsersService, UserWithoutPassword } from 'src/users/users.service';

export declare interface JwtPayload {
  iat: number;
  exp: number;
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configuration: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) return null;
        return req.cookies['access_token'];
      },
      secretOrKey: configuration.get('jwt.secret'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<UserWithoutPassword> {
    const { password: _password, ...user } = await (
      await this.usersService.findOneByUsername(payload.sub)
    ).toJSON();

    return user;
  }
}
