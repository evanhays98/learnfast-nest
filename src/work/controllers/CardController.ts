import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwtAuthGuard';
import { CardService } from '../services';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }
}
