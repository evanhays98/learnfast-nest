import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthUser, CreateFieldTranslation } from '../../libs/dtos';
import { FieldTranslationService } from '../services';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwtAuthGuard';

@Controller('fields-translation')
export class FieldTranslationController {
  constructor(
    private readonly fieldTranslationService: FieldTranslationService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async create(@Body() field: CreateFieldTranslation, @Req() req: Request) {
    const user = req.user as AuthUser;
    return this.fieldTranslationService.create({ ...field, ownerId: user.id });
  }
}
