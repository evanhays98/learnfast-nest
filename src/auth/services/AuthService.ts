import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { instanceToPlain } from 'class-transformer';
import { AuthUser } from '../../libs/dtos';
import { CreateUserDto, LoginUserDto } from '../dtos';
import { UsersService } from './UserService';

import { UserEntity } from '../entities/UserEntity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateLogin(
    identifier: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.usersService.findByIdentifier(identifier);
    this.logger.debug(user.salt);
    if (
      user &&
      user.password ===
        crypto.createHmac('sha256', user.salt + password).digest('hex')
    ) {
      return user;
    }
    throw new BadRequestException(
      `Invalid credentials : \n identifier: ${identifier}\n password: ${password}`,
    );
  }

  async loginUser(user: UserEntity) {
    const payload: AuthUser = {
      id: user.id,
      pseudo: user.pseudo,
      mail: user.mail,
    };
    const tmpSignedPayload = this.jwtService.sign(payload);
    return {
      access_token: tmpSignedPayload,
      userInfo: instanceToPlain(user),
    };
  }

  async login(loginForm: LoginUserDto) {
    const user = await this.validateLogin(
      loginForm.identifier,
      loginForm.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload: AuthUser = {
      id: user.id,
      pseudo: user.pseudo,
      mail: user.mail,
    };
    return {
      access_token: this.jwtService.sign(payload),
      userInfo: instanceToPlain(user),
    };
  }

  signup(
    signUpForm: CreateUserDto,
  ): Promise<{ access_token: string; userInfo: Record<string, any> } | void> {
    return this.usersService
      .create(signUpForm)
      .then((user) => {
        return this.loginUser(user);
      })
      .catch((err) => {
        this.logger.error(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
