import { CardType } from '../enums';
import { IsEnum, IsUUID } from 'class-validator';

export class CreateCard {
  @IsEnum(CardType, { always: true })
  type: CardType;

  @IsUUID('4')
  fieldRef: string;
}
