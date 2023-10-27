import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { CardService } from '../services';
import { HasPermission, Permissions } from '../../libs/decorators';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CardEntity } from '../entities';
import { JwtAuthGuard } from '../../auth/guards/jwtAuthGuard';

@Controller('chapters/:id/working-cards')
export class ChaptersWorkingCardsController {
  private logger = new Logger(ChaptersWorkingCardsController.name);

  constructor(private readonly cardService: CardService) {}

  @Get('count')
  @UseGuards(JwtAuthGuard)
  async countByChapterId(@Param('id') id: string) {
    return this.cardService.countByChapterId(id);
  }
}
