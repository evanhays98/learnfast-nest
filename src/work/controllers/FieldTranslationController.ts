/*
import {Body, Controller, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {AuthUser, CreateFieldTranslation} from '../../libs/dtos';
import {FieldTranslationService} from '../services';
import {Request} from 'express';
import {JwtAuthGuard} from '../../auth/guards/jwtAuthGuard';
import {HasPermission, Permissions} from "../../libs/decorators";

@Controller('fields-translation')
export class FieldTranslationController {
  constructor(
    private readonly fieldTranslationService: FieldTranslationService,
  ) {}

  @Post('')
  @HasPermission(Permissions.CHAPTER_OWNER)
  async create(@Body() field: CreateFieldTranslation, @Req() req: Request) {
    const user = req.user as AuthUser;
    return this.fieldTranslationService.create({ ...field, ownerId: user.id });
  }

  @Patch(':id')
  @HasPermission(Permissions.CHAPTER_OWNER)
  async update(@Body() field: CreateFieldTranslation, @Param('id') id: string) {
    return this.fieldTranslationService.update({ ...field, id });
  }
}
*/
