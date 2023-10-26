/*
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FieldTranslationEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CardService } from './CardService';
import { CardType } from '../../libs/enums';
import {
  CreateFieldTranslationService,
  UpdateFieldTranslationService,
} from '../../libs/dtos/FieldTranslationServiceDto';

@Injectable()
export class FieldTranslationService {
  private readonly logger = new Logger(FieldTranslationService.name);

  constructor(
    @InjectRepository(FieldTranslationEntity)
    private readonly repo: Repository<FieldTranslationEntity>,
    private readonly cardService: CardService,
  ) {}

  async create(info: CreateFieldTranslationService) {
    const matches = info.sentence.match(/\/\/(.*?)\/\//g);
    const answers = matches.map((match) => {
      return match.match(/\/\/(.*?)\/\//)[1];
    });
    const fieldTrans = await this.repo.save({ ...info, answers });
    await this.cardService.create({
      ownerId: info.ownerId,
      type: CardType.TRANSLATION,
      fieldId: fieldTrans.id,
      chapterId: info.chapterId,
    });
    return fieldTrans;
  }

  async update(info: UpdateFieldTranslationService) {
    const matches = info.sentence.match(/\/\/(.*?)\/\//g);
    const answers = matches.map((match) => {
      return match.match(/\/\/(.*?)\/\//)[1];
    });
    const fieldTrans = await this.repo.findOne({
      where: {
        id: info.id,
      },
    });
    fieldTrans.sentence = info.sentence;
    fieldTrans.translation = info.translation;
    fieldTrans.information = info.information;
    fieldTrans.answers = answers;
    await this.repo.save(fieldTrans);
  }
}
*/
