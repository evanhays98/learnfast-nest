import { IsString, IsUUID } from 'class-validator';

export class CreateChapterService {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUUID('4')
  ownerId: string;
}
