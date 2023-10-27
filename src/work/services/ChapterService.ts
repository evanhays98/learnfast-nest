import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChapterEntity } from '../entities';
import { CreateChapterService, UpdateChapterService } from '../../libs/dtos';

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

  async findOne(id: string) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return this.repo.delete({
      id
    })
  }

  async update({ id, description, title, lng }: UpdateChapterService) {
    const chapterToUpdate = await this.findOne(id);
    if (
      title === chapterToUpdate.title &&
      description === chapterToUpdate.description
    ) {
      return chapterToUpdate;
    }
    chapterToUpdate.lng = lng;
    chapterToUpdate.title = title;
    chapterToUpdate.description = description;
    return this.repo.save(chapterToUpdate);
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
}
