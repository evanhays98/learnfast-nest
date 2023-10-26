import { IsEnum, IsUUID } from 'class-validator';
import { CardType } from '../enums';
import { FieldTranslationEntity } from '../../work/entities';

export class CreateCardService {
  @IsUUID('4')
  ownerId: string;

  @IsEnum(CardType, { always: true })
  type: CardType;

  @IsUUID('4')
  chapterId: string;

  fieldTranslation?: FieldTranslationEntity | undefined;
}

export class UpdateCardService {
  @IsUUID('4')
  id: string;
  @IsEnum(CardType, { always: true })
  type?: CardType;

  fieldTranslation?: FieldTranslationEntity;
}
