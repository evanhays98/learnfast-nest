import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateFieldTranslation {
  @IsUUID('4', { always: true })
  chapterId: string;

  @IsString({ always: true })
  sentence: string;

  @IsString({ always: true })
  translation: string;

  @IsOptional()
  @IsString({ always: true })
  information?: string;
}
