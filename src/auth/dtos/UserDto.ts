export class CreateUserDto {
  pseudo: string;
  mail: string;
  password: string;
}

export class LoginUserDto {
  identifier: string;
  password: string;
}
