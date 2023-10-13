import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from '../entities';
import { CreateCardService } from '../../libs/dtos/CardServiceDto';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);

  constructor(
    @InjectRepository(CardEntity)
    private readonly repo: Repository<CardEntity>,
  ) {}

  async create(card: CreateCardService) {
    return this.repo.save(card);
  }

  async findOne(id: string) {
    return this.repo.findOne({
      where: {
        id,
      },
      relations: {
        fieldTranslation: true,
      },
    });
  }

  async findByFieldId(fieldId: string) {
    return this.repo.findOne({
      where: {
        fieldId,
      },
      relations: {
        fieldTranslation: true,
      },
    });
  }

  async findByChapterId(chapterId: string) {
    return this.repo.find({
      where: {
        chapterId,
      },
      relations: {
        fieldTranslation: true,
      },
    });
  }
}
