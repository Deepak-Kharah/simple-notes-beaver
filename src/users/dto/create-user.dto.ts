import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username is required' })
  @MinLength(6, {
    message: 'username must be at least 6 characters',
    each: false,
  })
  @Matches(/^(?![_])(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_])$/, {
    message: 'username must be alphanumeric and not start or end with _',
  })
  @MaxLength(20, { message: 'username must be at most 20 characters' })
  readonly username: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8, { message: 'password must be at least 8 characters' })
  readonly password: string;
}
