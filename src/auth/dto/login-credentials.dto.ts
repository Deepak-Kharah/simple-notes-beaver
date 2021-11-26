import { IsNotEmpty } from 'class-validator';

export class LoginCredentialsDto {
  @IsNotEmpty({ message: 'username is required' })
  readonly username: string;

  @IsNotEmpty({ message: 'password is required' })
  readonly password: string;
}
