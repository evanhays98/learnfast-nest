import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkingCardService } from '../services';
import { JwtAuthGuard } from '../../auth/guards/jwtAuthGuard';
import { AnswerWorkingCard, AuthUser, WorkingCards } from '../../libs/dtos';
import { Request } from 'express';

@Controller('working-cards')
export class WorkingCardController {
  constructor(private readonly workingCardService: WorkingCardService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getWorkingCards(@Body() info: WorkingCards, @Req() req: Request) {
    const user = req.user as AuthUser;
    return this.workingCardService.getWorkingCard(info.chapterId, user.id);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async answer(
    @Body() info: AnswerWorkingCard,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    const user = req.user as AuthUser;
    return this.workingCardService.answerFieldTranslation({
      answer: info.answer,
      ownerId: user.id,
      workingCardId: id,
    });
  }
}
