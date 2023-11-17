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
import { AnswerWorkingCard, AuthUser, LastUsageUser } from '../../libs/dtos';
import { Request } from 'express';
import { HasPermission, Permissions } from '../../libs/decorators';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

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

  @Post(':id/validate')
  @UseGuards(JwtAuthGuard)
  async validate(@Param('id') id: string) {
    return this.workingCardService.validate(id);
  }

  @Get('last-usage-user')
  @HasPermission(Permissions.IS_ADMIN)
  async create(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<LastUsageUser>> {
    return this.workingCardService.getLastUsageForUser(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async find(@Param('id') id: string) {
    return this.workingCardService.findOne(id);
  }
}
