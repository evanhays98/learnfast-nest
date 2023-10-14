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
exports.WorkingCardEntity = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var BaseEntity_1 = require("../../libs/entities/BaseEntity");
var enums_1 = require("../../libs/enums");
var class_transformer_1 = require("class-transformer");
var CardEntity_1 = require("./CardEntity");
var WorkingCardEntity = /** @class */ (function (_super) {
    __extends(WorkingCardEntity, _super);
    function WorkingCardEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkingCardEntity.prototype.updateDate = function () {
        if (this.history.length === 0) {
            this.startedAt = new Date();
        }
    };
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsUUID)('4', { always: true }),
        __metadata("design:type", String)
    ], WorkingCardEntity.prototype, "ownerId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return CardEntity_1.CardEntity; }, function (card) { return card.workingCards; }),
        (0, class_transformer_1.Exclude)({ toClassOnly: true }),
        (0, typeorm_1.JoinColumn)({ name: 'cardId' }),
        __metadata("design:type", CardEntity_1.CardEntity)
    ], WorkingCardEntity.prototype, "card", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsUUID)('4', { always: true }),
        __metadata("design:type", String)
    ], WorkingCardEntity.prototype, "cardId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], WorkingCardEntity.prototype, "points", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 5 }),
        __metadata("design:type", Number)
    ], WorkingCardEntity.prototype, "maxPoints", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', default: false }),
        __metadata("design:type", Boolean)
    ], WorkingCardEntity.prototype, "isValidate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
        (0, class_validator_1.IsDate)({ always: true }),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Date)
    ], WorkingCardEntity.prototype, "startedAt", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: enums_1.WorkingCardHistoryEnums,
            nullable: false,
            array: true,
            default: [],
        }),
        (0, class_validator_1.IsEnum)(enums_1.WorkingCardHistoryEnums, { each: true, always: true }),
        __metadata("design:type", Array)
    ], WorkingCardEntity.prototype, "history", void 0);
    __decorate([
        (0, typeorm_1.BeforeUpdate)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WorkingCardEntity.prototype, "updateDate", null);
    WorkingCardEntity = __decorate([
        (0, typeorm_1.Entity)()
    ], WorkingCardEntity);
    return WorkingCardEntity;
}(BaseEntity_1.BaseEntity));
exports.WorkingCardEntity = WorkingCardEntity;
//# sourceMappingURL=WorkingCardEntity.js.map