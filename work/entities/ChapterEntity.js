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
exports.ChapterEntity = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("../../libs/entities/BaseEntity");
var CardEntity_1 = require("./CardEntity");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var ChapterEntity = /** @class */ (function (_super) {
    __extends(ChapterEntity, _super);
    function ChapterEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsUUID)('4', { always: true }),
        __metadata("design:type", String)
    ], ChapterEntity.prototype, "ownerId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ChapterEntity.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ChapterEntity.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return CardEntity_1.CardEntity; }, function (card) { return card.chapterId; }),
        (0, class_transformer_1.Exclude)({ toClassOnly: true }),
        (0, class_transformer_1.Type)(function () { return CardEntity_1.CardEntity; }),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Array)
    ], ChapterEntity.prototype, "cards", void 0);
    ChapterEntity = __decorate([
        (0, typeorm_1.Entity)()
    ], ChapterEntity);
    return ChapterEntity;
}(BaseEntity_1.BaseEntity));
exports.ChapterEntity = ChapterEntity;
//# sourceMappingURL=ChapterEntity.js.map