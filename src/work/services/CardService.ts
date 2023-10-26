import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from '../entities';
import {
  CreateCardService,
  UpdateCardService,
} from '../../libs/dtos/CardServiceDto';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);

  constructor(
    @InjectRepository(CardEntity)
    private readonly repo: Repository<CardEntity>,
  ) {}

  async create(card: CreateCardService) {
    const matches = card.fieldTranslation.sentence.match(/\/\/(.*?)\/\//g);
    card.fieldTranslation.answers = matches.map((match) => {
      return match.match(/\/\/(.*?)\/\//)[1];
    });
    return this.repo.save(card);
  }

  async update(newCard: UpdateCardService) {
    const card = await this.repo.findOne({
      where: {
        id: newCard.id,
      },
    });
    const matches = card.fieldTranslation.sentence.match(/\/\/(.*?)\/\//g);
    card.fieldTranslation.answers = matches.map((match) => {
      return match.match(/\/\/(.*?)\/\//)[1];
    });
    card.fieldTranslation = newCard.fieldTranslation;
    card.type = newCard.type;
    return this.repo.save(card);
  }

  async findOne(id: string) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  async findPaginatedByChapterId(chapterId: string, query: PaginateQuery) {
    return await paginate(query, this.repo, {
      defaultSortBy: undefined,
      filterableColumns: undefined,
      searchableColumns: [
        'fieldTranslation.translation',
        'fieldTranslation.sentence',
        'fieldTranslation.information',
        'type',
      ],
      relations: ['fieldTranslation'],
      select: ['*'],
      sortableColumns: ['updatedAt', 'createdAt', 'type', 'fieldTranslation'],
      where: {
        chapterId,
      },
    });
  }

  async getCardsToWork(meId: string, chapterId: string) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 10);
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
        'workingCard.ownerId = :meId',
        { meId },
      )
      .where(
        'card.chapterId = :chapterId AND workingCard.isValidate = false AND ARRAY_LENGTH(workingCard.history, 1) IS NULL',
        { chapterId },
      )
      .orWhere('card.chapterId = :chapterId AND workingCard.id IS NULL')
      .orderBy('seeded_random', 'DESC')
      .distinct(true)
      .take(20)
      .getMany();
    return [...cardsToRetry, ...cardsToLearn].slice(0, 20);
  }
}
