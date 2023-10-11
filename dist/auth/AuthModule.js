"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const controllers = require("./controllers");
const services = require("./services");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("./entities/User");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secret: 'secretJwtToken',
                signOptions: { expiresIn: '3660s' },
            }),
            typeorm_1.TypeOrmModule.forFeature([User_1.User])
        ],
        controllers: [...Object.values(controllers)],
        providers: [typeorm_1.TypeOrmModule, ...Object.values(services)],
    })
], AuthModule);
//# sourceMappingURL=AuthModule.js.map