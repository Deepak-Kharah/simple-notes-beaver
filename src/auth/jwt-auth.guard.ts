import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(
    err: any,
    user: any,
    info: { name?: string; message?: string },
    context: any,
    status?: any,
  ) {
    const response: Response = context.getResponse();

    if (info?.name === 'TokenExpiredError') {
      response.clearCookie('access_token');
      throw new UnauthorizedException('Access token expired');
    } else if (info?.message?.toLowerCase() === 'no auth token') {
      throw new UnauthorizedException('No access token');
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
