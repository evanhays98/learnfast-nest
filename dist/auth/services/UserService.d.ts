import { Repository } from 'typeorm';
import { CreateUserDto } from "../dtos";
import { User } from "../entities/User";
export declare class UsersService {
    private readonly repo;
    private readonly logger;
    constructor(repo: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findByIdentifier(identifier: string): Promise<User>;
}
