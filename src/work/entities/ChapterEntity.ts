import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../libs/entities/BaseEntity';
import { CardEntity } from './CardEntity';
import { Exclude, Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import {WorkingCardEntity} from "./WorkingCardEntity";

@Entity()
export class ChapterEntity extends BaseEntity {
  @Column()
  @IsUUID('4', { always: true })
  ownerId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => CardEntity, (card) => card.chapter)
  @Exclude({ toClassOnly: true })
  @Type(() => CardEntity)
  @IsOptional()
  cards?: CardEntity[];

  @OneToMany(() => WorkingCardEntity, (workingCard) => workingCard.chapter)
  @Exclude({ toClassOnly: true })
  @Type(() => WorkingCardEntity)
  @IsOptional()
  workingCards?: WorkingCardEntity[];

  @Column({ default: 'fr-FR' })
  @IsString()
  lng: string;

  //Add image
}
