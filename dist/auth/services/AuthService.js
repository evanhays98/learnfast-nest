"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const crypto = require("crypto");
const class_transformer_1 = require("class-transformer");
const UserService_1 = require("./UserService");
let AuthService = AuthService_1 = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateLogin(identifier, password) {
        const user = await this.usersService.findByIdentifier(identifier);
        this.logger.debug(user.salt);
        if (user &&
            user.password ===
                crypto.createHmac('sha256', user.salt + password).digest('hex')) {
            return user;
        }
        throw new common_1.BadRequestException(`Invalid credentials : \n identifier: ${identifier}\n password: ${password}`);
    }
    async loginUser(user) {
        const payload = { id: user.id, pseudo: user.pseudo, mail: user.mail };
        const tmpSignedPayload = this.jwtService.sign(payload);
        return {
            access_token: tmpSignedPayload,
            userInfo: (0, class_transformer_1.instanceToPlain)(user),
        };
    }
    async login(loginForm) {
        const user = await this.validateLogin(loginForm.identifier, loginForm.password);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { mail: user.mail, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            userInfo: (0, class_transformer_1.instanceToPlain)(user),
        };
    }
    signup(signUpForm) {
        return this.usersService
            .create(signUpForm)
            .then((user) => {
            return this.loginUser(user);
        })
            .catch((err) => {
            this.logger.error(err);
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserService_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=AuthService.js.map