import { IsOptional } from 'class-validator';

export class CreateChapter {
  title: string;
  description: string;
}

export class UpdateChapter {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  lng?: string;
}
