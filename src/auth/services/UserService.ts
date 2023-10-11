import {BadRequestException, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateUserDto} from "../dtos";
import isEmail from 'validator/lib/isEmail';
import {User} from "../entities/User";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        if (!isEmail(createUserDto.mail)) {
            throw new BadRequestException('mail is not an email');
        }
        if (isEmail(createUserDto.pseudo)) {
            throw new BadRequestException('pseudo cannot be an email');
        }
        const newUser = new User();
        newUser.mail = createUserDto.mail;
        newUser.pseudo = createUserDto.pseudo;
        newUser.password = createUserDto.password;
        return this.repo.save(newUser);
    }

    async findByIdentifier(identifier: string): Promise<User> {
        return await this.repo.findOne({
            where: {
                mail: identifier,
            },
        }) || this.repo.findOne({
            where: {
                pseudo: identifier,
            }
        });
    }
}
