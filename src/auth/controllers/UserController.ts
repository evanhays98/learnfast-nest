import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Patch,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtAuthGuard';
import { UsersService } from '../services';
import { Request } from 'express';
import { AuthUser } from '../../libs/dtos';
import { UpdateUserDto } from '../dtos';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async me(@Req() req: Request) {
    const user: AuthUser = req.user as AuthUser;
    return this.userService.findOne(user.id);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Req() req: Request, @Body() body: UpdateUserDto) {
    const user: AuthUser = req.user as AuthUser;
    return this.userService.update(user.id, body);
  }
}
