import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { UserWithoutPassword } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Request() req: Request & { user: UserWithoutPassword },
    @Body() _loginCred: LoginCredentialsDto,
  ) {
    return req.user;
  }
}
