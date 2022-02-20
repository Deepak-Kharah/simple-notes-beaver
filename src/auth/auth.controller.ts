import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';

import { UserWithoutPassword } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LogoutMessageDto } from './dto/logout.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { RequestWithUser } from './types/strategy.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: RequestWithUser,
    @Body() _loginCred: LoginCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserWithoutPassword> {
    const jwtToken = await this.authService.getJwtToken(req.user);
    response.cookie('access_token', jwtToken, { httpOnly: true });
    return req.user;
  }

  @Get('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<LogoutMessageDto> {
    response.clearCookie('access_token');
    console.log('mayhem', response);
    return {
      isLoggedOut: true,
      message: 'Successfully logged out',
    };
  }
}
