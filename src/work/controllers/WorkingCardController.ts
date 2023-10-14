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
import { AnswerWorkingCard, AuthUser } from '../../libs/dtos';
import { Request } from 'express';

@Controller('working-cards')
export class WorkingCardController {
  constructor(private readonly workingCardService: WorkingCardService) {}

  @Get('chapters/:id')
  @UseGuards(JwtAuthGuard)
  async getWorkingCards(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as AuthUser;
    return this.workingCardService.getWorkingCard(id, user.id);
  }

  @Post('/verification/:id')
  @UseGuards(JwtAuthGuard)
  async verification(
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async find(@Param('id') id: string) {
    return this.workingCardService.findOne(id);
  }
}
