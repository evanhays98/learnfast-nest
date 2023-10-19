import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import isEmail from 'validator/lib/isEmail';
import { UserEntity } from '../entities/UserEntity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    if (!isEmail(createUserDto.mail)) {
      throw new BadRequestException('Mail is not an email');
    }
    if (isEmail(createUserDto.pseudo)) {
      throw new BadRequestException('Pseudo cannot be an email');
    }
    if (await this.repo.findOne({ where: { mail: createUserDto.mail } })) {
      throw new BadRequestException('Mail already exists');
    }
    if (await this.repo.findOne({ where: { pseudo: createUserDto.pseudo } })) {
      throw new BadRequestException('Pseudo already exists');
    }
    const newUser = new UserEntity();
    newUser.mail = createUserDto.mail;
    newUser.pseudo = createUserDto.pseudo;
    newUser.password = createUserDto.password;
    return this.repo.save(newUser);
  }

  async findByIdentifier(identifier: string): Promise<UserEntity> {
    return (
      (await this.repo.findOne({
        where: {
          mail: identifier,
        },
      })) ||
      this.repo.findOne({
        where: {
          pseudo: identifier,
        },
      })
    );
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUser: UpdateUserDto): Promise<UserEntity> {
    if (
      updateUser.mail &&
      (await this.repo.findOne({ where: { mail: updateUser.mail } }))
    ) {
      throw new BadRequestException('Mail already exists');
    }
    if (
      updateUser.pseudo &&
      (await this.repo.findOne({ where: { pseudo: updateUser.pseudo } }))
    ) {
      throw new BadRequestException('Pseudo already exists');
    }
    return this.repo.save({
      id,
      ...updateUser,
    });
  }
}
