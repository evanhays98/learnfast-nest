"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var AppController_1 = require("./AppController");
var AppService_1 = require("./AppService");
var typeorm_1 = require("@nestjs/typeorm");
var AuthModule_1 = require("./auth/AuthModule");
var WorkModule_1 = require("./work/WorkModule");
var config_1 = require("@nestjs/config");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot(),
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT, 10) || 5432,
                    username: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    entities: ['../src/**/*Entity.ts'],
                    synchronize: false,
                    autoLoadEntities: true,
                    ssl: true,
                    extra: {
                        ssl: {
                            rejectUnauthorized: false,
                            sslmode: 'require',
                        },
                    },
                }),
                AuthModule_1.AuthModule,
                WorkModule_1.WorkModule,
            ],
            controllers: [AppController_1.AppController],
            providers: [AppService_1.AppService],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=AppModule.js.map