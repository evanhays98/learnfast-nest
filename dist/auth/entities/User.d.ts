import { BaseEntity } from "../../libs/entities/BaseEntity";
export declare class User extends BaseEntity {
    hashPassword(): void;
    id: string;
    pseudo: string;
    salt: string;
    mail: string;
    password: string;
}
