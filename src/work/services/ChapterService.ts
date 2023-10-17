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

  async findAll(ownerId: string) {
    const chaptersWorked = await this.repo
      .createQueryBuilder('chapter')
      .innerJoin('chapter.workingCards', 'workingCard')
      .where('workingCard.ownerId = :ownerId', { ownerId })
      .groupBy('chapter.id')
      .orderBy('MAX(workingCard.updatedAt)', 'DESC')
      .getMany();

    const chapters = await this.repo
      .createQueryBuilder('chapter')
      .leftJoin(
        'chapter.workingCards',
        'workingCard',
        'workingCard.ownerId = :ownerId',
        { ownerId },
      )
      .where('workingCard.id IS NULL')
      .getMany();

    return [...chaptersWorked, ...chapters];
  }

  async findLastWorked(ownerId: string) {
    return this.repo
      .createQueryBuilder('chapter')
      .innerJoin('chapter.workingCards', 'workingCard')
      .where('workingCard.ownerId = :ownerId', { ownerId })
      .groupBy('chapter.id')
      .orderBy('MAX(workingCard.updatedAt)', 'DESC')
      .getOne();
  }

  async findOne(id: string) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }
}
