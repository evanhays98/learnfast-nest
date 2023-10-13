import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateFieldTranslationService {
  @IsUUID('4', { always: true })
  chapterId: string;

  @IsUUID('4', { always: true })
  @IsString({ always: true })
  sentence: string;

  @IsUUID('4', { always: true })
  ownerId: string;

  @IsString({ always: true })
  translation: string;

  @IsOptional()
  @IsString({ always: true })
  information?: string;
}
