import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkingCardEntity } from '../entities';
import { WorkingCardHistoryEnums } from '../../libs/enums';
import {
  answerFieldTranslationWorkingCard,
  CreateWorkingCardService,
  LastUsageUser,
} from '../../libs/dtos';
import { CardService } from './CardService';
import { deburr } from 'lodash';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { UserEntity } from '../../auth/entities/UserEntity';

@Injectable()
export class WorkingCardService {
  private readonly logger = new Logger(WorkingCardService.name);

  constructor(
    @InjectRepository(WorkingCardEntity)
    private readonly repo: Repository<WorkingCardEntity>,
    private readonly cardService: CardService,
  ) {}

  async create(workingCard: CreateWorkingCardService) {
    const cardExist = await this.repo.findOne({
      where: {
        ownerId: workingCard.ownerId,
        cardId: workingCard.cardId,
      },
    });
    if (cardExist) {
      return cardExist;
    }
    return this.repo.save(workingCard);
  }

  async addPoint(id: string) {
    const card = await this.repo.findOne({
      where: {
        id,
      },
    });
    card.points += 1;
    if (card.points === card.maxPoints || card.points === 1) {
      card.points = card.maxPoints;
      card.isValidate = true;
      card.history.push(WorkingCardHistoryEnums.FINISH_CARD);
    } else {
      card.history.push(WorkingCardHistoryEnums.ADD_ONE_POINT);
    }
    return this.repo.save(card);
  }

  async validate(id: string) {
    const card = await this.repo.findOne({
      where: {
        id,
      },
    });
    card.isValidate = true;
    card.points = card.maxPoints;
    card.history.push(WorkingCardHistoryEnums.MARK_AS_KNOWN);
    return this.repo.save(card);
  }

  async miss(id: string) {
    const card = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (card.points === 0) {
      card.points += 1;
    }
    card.history.push(WorkingCardHistoryEnums.MISS_ANSWER);
    return this.repo.save(card);
  }

  async reset(id: string) {
    const card = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!card.isValidate) {
      throw new Error('You cant reset a card that is not validate');
    }
    card.isValidate = false;
    card.history.push(WorkingCardHistoryEnums.RESET_CARD);
    card.points = 0;
    return this.repo.save(card);
  }

  async answerFieldTranslation(answer: answerFieldTranslationWorkingCard) {
    const workingCard = await this.repo.findOne({
      where: {
        id: answer.workingCardId,
      },
    });
    const answers = workingCard.card.fieldTranslation.answers;

    if (
      deburr(answer.answer.trim().toLowerCase()) ===
      deburr(answers[0].trim().toLowerCase())
    ) {
      return this.addPoint(answer.workingCardId);
    }
    return this.miss(answer.workingCardId);
  }

  async getWorkingCard(chapterId: string, meId: string) {
    const cardsToLearn = await this.cardService.getCardsToWork(meId, chapterId);
    if (!cardsToLearn.length) {
      return [];
    }
    const cardIds = cardsToLearn.map((card) => card.id);
    for (const card of cardsToLearn) {
      await this.create({
        ownerId: meId,
        cardId: card.id,
        chapterId,
      });
    }
    return this.repo
      .createQueryBuilder('workingCard')
      .leftJoinAndSelect('workingCard.card', 'card')
      .leftJoinAndSelect('card.fieldTranslation', 'fieldTs')
      .where('workingCard.cardId IN (:...cardIds)', { cardIds })
      .andWhere('workingCard.ownerId = :meId', { meId })
      .orderBy('RANDOM()')
      .getMany();
  }

  async findOne(id: string) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  async workingCardCountByChapter(chapterId: string, ownerId: string) {
    const result = await this.repo
      .createQueryBuilder('card')
      .select([
        'COUNT(*) as total',
        'SUM(CASE WHEN card.ownerId = :ownerId AND card.isValidate = true THEN 1 ELSE 0 END) as learn',
        'SUM(CASE WHEN card.ownerId = :ownerId AND ARRAY_LENGTH(card.history, 1) IS NOT NULL AND card.isValidate = false THEN 1 ELSE 0 END) as started',
      ])
      .where('card.chapterId = :chapterId', { chapterId })
      .setParameters({ ownerId })
      .getRawOne();

    return {
      total: parseInt(result.total) || 0,
      learn: parseInt(result.learn) || 0,
      started: parseInt(result.started) || 0,
    };
  }

  async getLastUsageForUser(
    query: PaginateQuery,
  ): Promise<Paginated<LastUsageUser>> {
    query.limit = query.limit || 10;
    query.page = query.page || 1;
    query.search = query.search || '';
    const lastUsageUser: LastUsageUser[] = await this.repo
      .createQueryBuilder('wc')
      .leftJoin(UserEntity, 'user', 'user.id = wc."ownerId"::uuid')
      .select(['user.pseudo as pseudo, MAX(wc.updatedAt) as "lastUsage"'])
      .where('user.pseudo LIKE :search', { search: `%${query.search}%` })
      .groupBy('user.pseudo')
      .orderBy('MAX(wc.updatedAt)', 'DESC')
      .offset(query.limit * (query.page - 1))
      .limit(query.limit)
      .getRawMany();

    return {
      data: lastUsageUser,
      meta: {
        itemsPerPage: query.limit,
        totalItems: lastUsageUser.length,
        currentPage: query.page,
        totalPages: Math.ceil(lastUsageUser.length / query.limit),
        sortBy: undefined,
        searchBy: undefined,
        search: query.search,
        select: undefined,
        filter: undefined,
      },
      links: {
        first: undefined,
        previous: undefined,
        current: undefined,
        next: undefined,
        last: undefined,
      },
    };
  }
}
