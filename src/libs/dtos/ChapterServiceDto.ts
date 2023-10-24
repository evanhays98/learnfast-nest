import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateChapterService {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUUID('4')
  ownerId: string;
}

export class UpdateChapterService {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID('4')
  id: string;
}
