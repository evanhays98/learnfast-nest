import { Controller, Get, Logger, Param, Req, UseGuards } from '@nestjs/common';
import { WorkingCardService } from '../services';
import { JwtAuthGuard } from '../../auth/guards/jwtAuthGuard';
import { Request } from 'express';
import { AuthUser } from '../../libs/dtos';

@Controller('chapters/:id/working-cards')
export class ChaptersWorkingCardsController {
  private logger = new Logger(ChaptersWorkingCardsController.name);

  constructor(private readonly workingCardService: WorkingCardService) {}

  @Get('count')
  @UseGuards(JwtAuthGuard)
  async countByChapterId(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as AuthUser;
    return this.workingCardService.workingCardCountByChapter(id, user.id);
  }
}
