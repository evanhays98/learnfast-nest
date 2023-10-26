import { CardType } from '../enums';
import { IsEnum, IsUUID } from 'class-validator';
import { FieldTranslationEntity } from '../../work/entities';

export class CreateCard {
  @IsEnum(CardType, { always: true })
  type: CardType;

  @IsUUID('4')
  chapterId: string;

  field: FieldTranslationEntity;
}

export class UpdateCard {
  @IsEnum(CardType, { always: true })
  type?: CardType;
  field?: FieldTranslationEntity;
}
