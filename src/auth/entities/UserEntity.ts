import { BeforeInsert, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../libs/entities/BaseEntity';
import * as crypto from 'crypto';
import { Role } from '../dtos';
import { IsEnum } from 'class-validator';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  pseudo: string;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
    array: true,
    default: [Role.ANONYMOUS],
  })
  @IsEnum(Role, { always: true, each: true })
  role: Role[];

  @Column()
  @Exclude()
  salt: string;

  @Column({ unique: true })
  mail: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto
      .createHmac('sha256', this.salt + this.password)
      .digest('hex');
  }
}
