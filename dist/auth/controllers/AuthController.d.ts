import { CreateUserDto, LoginUserDto } from "../dtos";
import { AuthService } from "../services/AuthService";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(loginForm: LoginUserDto): Promise<{
        access_token: string;
        userInfo: Record<string, any>;
    }>;
    signUp(signUpForm: CreateUserDto): Promise<void | {
        access_token: string;
        userInfo: Record<string, any>;
    }>;
}
