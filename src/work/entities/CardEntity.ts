import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CardType } from '../../libs/enums';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { BaseEntity } from '../../libs/entities/BaseEntity';
import { ChapterEntity } from './ChapterEntity';
import { Exclude } from 'class-transformer';
import { FieldTranslationEntity } from './FieldTranslationEntity';
import { WorkingCardEntity } from './WorkingCardEntity';

@Entity()
export class CardEntity extends BaseEntity {
  @Column()
  @IsUUID('4', { always: true })
  ownerId: string;

  @Column({
    type: 'enum',
    enum: CardType,
  })
  @IsEnum(CardType, { always: true })
  type: CardType;

  @ManyToOne(() => ChapterEntity, (chapter) => chapter.cards)
  @Exclude({ toClassOnly: true })
  @JoinColumn({ name: 'chapterId' })
  chapter: ChapterEntity;

  @Column()
  @IsUUID('4', { always: true })
  chapterId: string;

  @OneToOne(() => FieldTranslationEntity, (field) => field.card)
  @IsOptional()
  @JoinColumn({ name: 'fieldId' })
  fieldTranslation?: FieldTranslationEntity;

  @Column()
  @IsUUID('4', { always: true })
  fieldId: string;

  @OneToMany(() => WorkingCardEntity, (field) => field.card)
  @Exclude({ toClassOnly: true })
  workingCards: WorkingCardEntity[];
}
