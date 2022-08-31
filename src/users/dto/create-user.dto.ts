import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  nickName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;


}
