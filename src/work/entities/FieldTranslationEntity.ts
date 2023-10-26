import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@Entity()
export class FieldTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4', { always: true })
  id: string;

  @Column()
  sentence: string;

  @Column({ array: true, type: 'text' })
  @IsString({ always: true, each: true })
  answers: string[];

  @Column()
  @IsString({ always: true })
  translation: string;

  @Column({ nullable: true })
  @IsOptional()
  information?: string;
}
