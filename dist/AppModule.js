"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const AppController_1 = require("./AppController");
const AppService_1 = require("./AppService");
const typeorm_1 = require("@nestjs/typeorm");
const AuthModule_1 = require("./auth/AuthModule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'learnfastnest',
                password: 'learnfastNest',
                database: 'learnfastnest',
                synchronize: true,
            }), AuthModule_1.AuthModule],
        controllers: [AppController_1.AppController],
        providers: [AppService_1.AppService],
    })
], AppModule);
//# sourceMappingURL=AppModule.js.map