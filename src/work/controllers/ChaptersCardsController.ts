import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { CardService } from '../services';
import { HasPermission, Permissions } from '../../libs/decorators';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CardEntity } from '../entities';
import { JwtAuthGuard } from '../../auth/guards/jwtAuthGuard';

@Controller('chapters/:id/cards')
export class ChaptersCardsController {
  private logger = new Logger(ChaptersCardsController.name);

  constructor(private readonly cardService: CardService) {}

  @Get('count')
  @UseGuards(JwtAuthGuard)
  async countByChapterId(@Param('id') id: string) {
    return this.cardService.countByChapterId(id);
  }

  @Get('')
  @HasPermission(Permissions.CHAPTER_OWNER)
  async create(
    @Param('id') chapterId: string,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<CardEntity>> {
    return this.cardService.findPaginatedByChapterId(chapterId, query);
  }
}
