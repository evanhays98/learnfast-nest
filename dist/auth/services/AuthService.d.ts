import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from "../dtos";
import { UsersService } from "./UserService";
import { User } from "../entities/User";
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateLogin(identifier: string, password: string): Promise<User>;
    loginUser(user: User): Promise<{
        access_token: string;
        userInfo: Record<string, any>;
    }>;
    login(loginForm: LoginUserDto): Promise<{
        access_token: string;
        userInfo: Record<string, any>;
    }>;
    signup(signUpForm: CreateUserDto): Promise<{
        access_token: string;
        userInfo: Record<string, any>;
    } | void>;
}
