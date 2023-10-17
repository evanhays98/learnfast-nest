import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChapterEntity } from '../entities';
import { CreateChapterService } from '../../libs/dtos';

@Injectable()
export class ChapterService {
  private readonly logger = new Logger(ChapterService.name);

  constructor(
    @InjectRepository(ChapterEntity)
    private readonly repo: Repository<ChapterEntity>,
  ) {}

  async create(chapter: CreateChapterService) {
    return this.repo.save(chapter);
  }

  async findAllByUserId(ownerId: string) {
    return this.repo.find({
      where: {
        ownerId: ownerId,
      },
    });
  }

  async findAll(userId: string) {
    return this.repo.find();
    /*return this.repo
      .createQueryBuilder('chapter')
      .leftJoinAndSelect('workingCard.card', 'card')
      .leftJoinAndSelect('card.fieldTranslation', 'fieldTs')
      .where('workingCard.cardId IN (:...cardIds)', { cardIds })
      .andWhere('workingCard.ownerId = :meId', { meId })
      .orderBy('RANDOM()')
      .getMany();*/
  }

  async findOne(id: string) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }
}
