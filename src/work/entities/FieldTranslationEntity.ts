import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../libs/entities/BaseEntity';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CardEntity } from './CardEntity';

@Entity()
export class FieldTranslationEntity extends BaseEntity {
  @Column()
  @IsUUID('4', { always: true })
  ownerId: string;

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

  @OneToOne(() => CardEntity, (field) => field.id)
  card: CardEntity;
}
