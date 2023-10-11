import { Strategy } from 'passport-jwt';
import { AuthUser } from "../../libs/dtos";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly logger;
    constructor();
    validate(payload: any): Promise<AuthUser>;
}
export {};
