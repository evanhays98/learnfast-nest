import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { BaseEntity } from '../../libs/entities/BaseEntity';
import { WorkingCardHistoryEnums } from '../../libs/enums';
import { Exclude } from 'class-transformer';
import { CardEntity } from './CardEntity';
import { ChapterEntity } from './ChapterEntity';

@Entity()
export class WorkingCardEntity extends BaseEntity {
  @Column()
  @IsUUID('4', { always: true })
  ownerId: string;

  @ManyToOne(() => CardEntity, (card) => card.workingCards, {
    eager: true,
  })
  @Exclude({ toClassOnly: true })
  @JoinColumn({ name: 'cardId' })
  card: CardEntity;

  @ManyToOne(() => ChapterEntity, (chapter) => chapter.workingCards)
  @Exclude({ toClassOnly: true })
  @JoinColumn({ name: 'chapterId' })
  chapter: ChapterEntity;

  @Column({ type: 'uuid' })
  @IsUUID('4', { always: true })
  chapterId: string;

  @Column()
  @IsUUID('4', { always: true })
  cardId: string;

  @Column({ default: 0 })
  points: number;

  @Column({ default: 5 })
  maxPoints: number;

  @Column({ type: 'boolean', default: false })
  isValidate: boolean;

  @Column({ type: 'timestamp', nullable: true })
  @IsDate({ always: true })
  @IsOptional()
  startedAt?: Date;

  @Column({
    type: 'enum',
    enum: WorkingCardHistoryEnums,
    nullable: false,
    array: true,
    default: [],
  })
  @IsEnum(WorkingCardHistoryEnums, { each: true, always: true })
  history: WorkingCardHistoryEnums[];

  @BeforeUpdate()
  updateDate() {
    if (this.history.length === 1) {
      this.startedAt = new Date();
    }
  }
}
