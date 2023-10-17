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
import { CardService, ChapterService } from '../services';

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
    return this.chapterService.findAll(user.id);
  }

  @Get('last-worked')
  @UseGuards(JwtAuthGuard)
  async findLastWorked(@Req() req: Request) {
    const user = req.user as AuthUser;
    return this.chapterService.findLastWorked(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.chapterService.findOne(id);
  }

  @Get(':id/cards')
  @UseGuards(JwtAuthGuard)
  async getCards(@Param('id') id: string) {
    return this.cardService.findByChapterId(id);
  }
}
