"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var BaseEntity_1 = require("../../libs/entities/BaseEntity");
var crypto = require("crypto");
var UserEntity = /** @class */ (function (_super) {
    __extends(UserEntity, _super);
    function UserEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserEntity.prototype.hashPassword = function () {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = crypto
            .createHmac('sha256', this.salt + this.password)
            .digest('hex');
    };
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], UserEntity.prototype, "pseudo", void 0);
    __decorate([
        (0, class_transformer_1.Exclude)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], UserEntity.prototype, "salt", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], UserEntity.prototype, "mail", void 0);
    __decorate([
        (0, class_transformer_1.Exclude)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], UserEntity.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserEntity.prototype, "hashPassword", null);
    UserEntity = __decorate([
        (0, typeorm_1.Entity)()
    ], UserEntity);
    return UserEntity;
}(BaseEntity_1.BaseEntity));
exports.UserEntity = UserEntity;
//# sourceMappingURL=UserEntity.js.map