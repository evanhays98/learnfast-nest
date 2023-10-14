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
exports.FieldTranslationEntity = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("../../libs/entities/BaseEntity");
var class_validator_1 = require("class-validator");
var CardEntity_1 = require("./CardEntity");
var FieldTranslationEntity = /** @class */ (function (_super) {
    __extends(FieldTranslationEntity, _super);
    function FieldTranslationEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsUUID)('4', { always: true }),
        __metadata("design:type", String)
    ], FieldTranslationEntity.prototype, "ownerId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], FieldTranslationEntity.prototype, "sentence", void 0);
    __decorate([
        (0, typeorm_1.Column)({ array: true, type: 'text' }),
        (0, class_validator_1.IsString)({ always: true, each: true }),
        __metadata("design:type", Array)
    ], FieldTranslationEntity.prototype, "answers", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)({ always: true }),
        __metadata("design:type", String)
    ], FieldTranslationEntity.prototype, "translation", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], FieldTranslationEntity.prototype, "information", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return CardEntity_1.CardEntity; }, function (field) { return field.id; }),
        __metadata("design:type", CardEntity_1.CardEntity)
    ], FieldTranslationEntity.prototype, "card", void 0);
    FieldTranslationEntity = __decorate([
        (0, typeorm_1.Entity)()
    ], FieldTranslationEntity);
    return FieldTranslationEntity;
}(BaseEntity_1.BaseEntity));
exports.FieldTranslationEntity = FieldTranslationEntity;
//# sourceMappingURL=FieldTranslationEntity.js.map