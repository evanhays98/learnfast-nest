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

  async getCardsToWork(meId: string, chapterId: string) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 4);
    const cardsToRetry = await this.repo
      .createQueryBuilder('card')
      .addSelect('RANDOM()', 'seeded_random')
      .innerJoin(
        'card.workingCards',
        'workingCard',
        'workingCard.ownerId = :meId ' +
          'AND ARRAY_LENGTH(workingCard.history, 1) IS NOT NULL ' +
          'AND workingCard.updatedAt < :date ' +
          'AND workingCard.isValidate = false',
        { meId, date },
      )
      .where('card.chapterId = :chapterId', { chapterId })
      .orderBy('seeded_random', 'DESC')
      .take(17)
      .getMany();
    const cardsToLearn = await this.repo
      .createQueryBuilder('card')
      .addSelect('RANDOM()', 'seeded_random')
      .leftJoin(
        'card.workingCards',
        'workingCard',
        'workingCard.ownerId = :meId AND workingCard.isValidate = false AND ARRAY_LENGTH(workingCard.history, 1) IS NULL',
        { meId },
      )
      .where('card.chapterId = :chapterId', { chapterId })
      .orderBy('seeded_random', 'DESC')
      .distinct(true)
      .take(20)
      .getMany();
    return [...cardsToRetry, ...cardsToLearn].slice(0, 20);
  }
}
