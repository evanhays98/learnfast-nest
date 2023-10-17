import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../libs/entities/BaseEntity';
import { CardEntity } from './CardEntity';
import { Exclude, Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@Entity()
export class ChapterEntity extends BaseEntity {
  @Column()
  @IsUUID('4', { always: true })
  ownerId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => CardEntity, (card) => card.chapterId)
  @Exclude({ toClassOnly: true })
  @Type(() => CardEntity)
  @IsOptional()
  cards?: CardEntity[];

  @Column({ default: 'fr-FR' })
  @IsString()
  lng: string;

  //Add image
}
