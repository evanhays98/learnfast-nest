import { IsEnum, IsUUID } from 'class-validator';
import { CardType } from '../enums';

export class CreateCardService {
  @IsUUID('4')
  ownerId: string;

  @IsEnum(CardType, { always: true })
  type: CardType;

  @IsUUID('4')
  chapterId: string;

  @IsUUID('4')
  fieldId: string;
}
