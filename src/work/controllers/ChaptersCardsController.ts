import { Controller, Get, Logger, Param } from '@nestjs/common';
import { CardService } from '../services';
import { HasPermission, Permissions } from '../../libs/decorators';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('chapters/:id/cards')
export class ChaptersCardsController {
  private logger = new Logger(ChaptersCardsController.name);

  constructor(private readonly cardService: CardService) {}

  @Get('')
  @HasPermission(Permissions.CHAPTER_OWNER)
  async create(
    @Param('id') chapterId: string,
    @Paginate() query: PaginateQuery,
  ) {
    return this.cardService.findPaginatedByChapterId(chapterId, query);
  }
}
