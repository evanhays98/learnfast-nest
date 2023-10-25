import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../../auth/guards/jwtAuthGuard';
import {CardService} from '../services';
import {Request} from 'express';
import {AuthUser} from '../../libs/dtos';
import {HasPermission, Permissions} from "../../libs/decorators";

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

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
