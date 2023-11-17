import { IsString, IsUUID } from 'class-validator';

export class WorkingCards {
  @IsUUID('4', { always: true })
  chapterId: string;
}

export class AnswerWorkingCard {
  @IsString({ always: true })
  answer: string;
}

export interface LastUsageUser {
  pseudo: string;
  lastUsage: Date;
}
