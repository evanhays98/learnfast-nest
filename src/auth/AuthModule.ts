import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import * as controllers from './controllers';
import * as services from './services';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/User";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: 'secretJwtToken',
            signOptions: { expiresIn: '3660s' },
        }),
    ],
    controllers: [...Object.values(controllers)],
    providers: [TypeOrmModule, ...Object.values(services)],
})
export class AuthModule {}