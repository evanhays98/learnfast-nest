import { IsOptional } from 'class-validator';

export class CreateUserDto {
  pseudo: string;
  mail: string;
  password: string;
}

export class LoginUserDto {
  identifier: string;
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  pseudo?: string;

  @IsOptional()
  mail?: string;
}
