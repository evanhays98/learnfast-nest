import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dtos';
import { AuthService } from '../services';


@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async signIn(@Body() loginForm: LoginUserDto) {
    return this.authService.login(loginForm);
  }

  @Post('register')
  async signUp(@Body() signUpForm: CreateUserDto) {
    return this.authService.signup(signUpForm);
  }
}
