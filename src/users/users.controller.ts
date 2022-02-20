import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/types/strategy.types';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService, UserWithoutPassword } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@Request() req: RequestWithUser) {
    return req.user;
  }
}
