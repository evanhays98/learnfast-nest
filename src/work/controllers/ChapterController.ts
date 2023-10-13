import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthUser, CreateChapter } from '../../libs/dtos';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwtAuthGuard';
import { ChapterService } from '../services/ChapterService';
import { CardService } from '../services';

@Controller('chapters')
export class ChapterController {
  constructor(
    private readonly chapterService: ChapterService,
    private readonly cardService: CardService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async create(@Body() chapter: CreateChapter, @Req() req: Request) {
    const user = req.user as AuthUser;
    return this.chapterService.create({ ...chapter, ownerId: user.id });
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req: Request) {
    const user = req.user as AuthUser;
    return this.chapterService.findAllByUserId(user.id);
  }

  @Get(':id/cards')
  @UseGuards(JwtAuthGuard)
  async getCards(@Param('id') id: string) {
    return this.cardService.findByChapterId(id);
  }
}
