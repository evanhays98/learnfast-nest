import { IsString, IsUUID } from 'class-validator';

export class CreateWorkingCardService {
  @IsUUID('4', { always: true })
  ownerId: string;

  @IsUUID('4', { always: true })
  cardId: string;

  @IsUUID('4', { always: true })
  chapterId: string;
}

export class answerFieldTranslationWorkingCard {
  @IsString({ always: true })
  answer: string;

  @IsUUID('4', { always: true })
  ownerId: string;

  @IsUUID('4', { always: true })
  workingCardId: string;
}
