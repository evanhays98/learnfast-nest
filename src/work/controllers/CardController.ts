import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwtAuthGuard';
import { CardService } from '../services';
import { Request } from 'express';
import { AuthUser, CreateCard, UpdateCard } from '../../libs/dtos';
import { HasPermission, Permissions } from '../../libs/decorators';
import { CardType } from '../../libs/enums';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @HasPermission(Permissions.CHAPTER_OWNER)
  async create(
    @Body() { chapterId, type, field }: CreateCard,
    @Req() req: Request,
  ) {
    const user = req.user as AuthUser;
    return this.cardService.create({
      chapterId,
      type,
      fieldTranslation: type === CardType.TRANSLATION ? field : undefined,
      ownerId: user.id,
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() { type, field }: UpdateCard) {
    return this.cardService.update({
      id,
      type,
      fieldTranslation: type === CardType.TRANSLATION ? field : undefined,
    });
  }

  @Get('work')
  @UseGuards(JwtAuthGuard)
  async getCardsToWork(
    @Req() req: Request,
    @Body() body: { chapterId: string },
  ) {
    const user = req.user as AuthUser;
    return this.cardService.getCardsToWork(user.id, body.chapterId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }
}
