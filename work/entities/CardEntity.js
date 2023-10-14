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
exports.CardEntity = void 0;
var typeorm_1 = require("typeorm");
var enums_1 = require("../../libs/enums");
var class_validator_1 = require("class-validator");
var BaseEntity_1 = require("../../libs/entities/BaseEntity");
var ChapterEntity_1 = require("./ChapterEntity");
var class_transformer_1 = require("class-transformer");
var FieldTranslationEntity_1 = require("./FieldTranslationEntity");
var WorkingCardEntity_1 = require("./WorkingCardEntity");
var CardEntity = /** @class */ (function (_super) {
    __extends(CardEntity, _super);
    function CardEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsUUID)('4', { always: true }),
        __metadata("design:type", String)
    ], CardEntity.prototype, "ownerId", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: enums_1.CardType,
        }),
        (0, class_validator_1.IsEnum)(enums_1.CardType, { always: true }),
        __metadata("design:type", String)
    ], CardEntity.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return ChapterEntity_1.ChapterEntity; }, function (chapter) { return chapter.cards; }),
        (0, class_transformer_1.Exclude)({ toClassOnly: true }),
        (0, typeorm_1.JoinColumn)({ name: 'chapterId' }),
        __metadata("design:type", ChapterEntity_1.ChapterEntity)
    ], CardEntity.prototype, "chapter", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsUUID)('4', { always: true }),
        __metadata("design:type", String)
    ], CardEntity.prototype, "chapterId", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return FieldTranslationEntity_1.FieldTranslationEntity; }, function (field) { return field.card; }),
        (0, class_validator_1.IsOptional)(),
        (0, typeorm_1.JoinColumn)({ name: 'fieldId' }),
        __metadata("design:type", FieldTranslationEntity_1.FieldTranslationEntity)
    ], CardEntity.prototype, "fieldTranslation", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsUUID)('4', { always: true }),
        __metadata("design:type", String)
    ], CardEntity.prototype, "fieldId", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return WorkingCardEntity_1.WorkingCardEntity; }, function (field) { return field.card; }),
        (0, class_transformer_1.Exclude)({ toClassOnly: true }),
        __metadata("design:type", Array)
    ], CardEntity.prototype, "workingCards", void 0);
    CardEntity = __decorate([
        (0, typeorm_1.Entity)()
    ], CardEntity);
    return CardEntity;
}(BaseEntity_1.BaseEntity));
exports.CardEntity = CardEntity;
//# sourceMappingURL=CardEntity.js.map