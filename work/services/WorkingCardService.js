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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingCardService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var typeorm_2 = require("@nestjs/typeorm");
var entities_1 = require("../entities");
var enums_1 = require("../../libs/enums");
var CardService_1 = require("./CardService");
var WorkingCardService = /** @class */ (function () {
    function WorkingCardService(repo, cardService) {
        this.repo = repo;
        this.cardService = cardService;
        this.logger = new common_1.Logger(WorkingCardService_1.name);
    }
    WorkingCardService_1 = WorkingCardService;
    WorkingCardService.prototype.create = function (workingCard) {
        return __awaiter(this, void 0, void 0, function () {
            var cardExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.findOne({
                            where: {
                                ownerId: workingCard.ownerId,
                                cardId: workingCard.cardId,
                            },
                        })];
                    case 1:
                        cardExist = _a.sent();
                        if (cardExist) {
                            return [2 /*return*/, cardExist];
                        }
                        return [2 /*return*/, this.repo.save(workingCard)];
                }
            });
        });
    };
    WorkingCardService.prototype.addPoint = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var card;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.findOne({
                            where: {
                                id: id,
                            },
                        })];
                    case 1:
                        card = _a.sent();
                        card.points += 1;
                        if (card.points === card.maxPoints || card.points === 1) {
                            card.points = card.maxPoints;
                            card.isValidate = true;
                            card.history.push(enums_1.WorkingCardHistoryEnums.FINISH_CARD);
                        }
                        else {
                            card.history.push(enums_1.WorkingCardHistoryEnums.ADD_ONE_POINT);
                        }
                        return [2 /*return*/, this.repo.save(card)];
                }
            });
        });
    };
    WorkingCardService.prototype.validate = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var card;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.findOne({
                            where: {
                                id: id,
                            },
                        })];
                    case 1:
                        card = _a.sent();
                        card.isValidate = true;
                        card.points = card.maxPoints;
                        card.history.push(enums_1.WorkingCardHistoryEnums.MARK_AS_KNOWN);
                        return [2 /*return*/, this.repo.save(card)];
                }
            });
        });
    };
    WorkingCardService.prototype.miss = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var card;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.findOne({
                            where: {
                                id: id,
                            },
                        })];
                    case 1:
                        card = _a.sent();
                        if (card.points === 0) {
                            card.points += 1;
                        }
                        card.history.push(enums_1.WorkingCardHistoryEnums.MISS_ANSWER);
                        return [2 /*return*/, this.repo.save(card)];
                }
            });
        });
    };
    WorkingCardService.prototype.reset = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var card;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.findOne({
                            where: {
                                id: id,
                            },
                        })];
                    case 1:
                        card = _a.sent();
                        if (!card.isValidate) {
                            throw new Error('You cant reset a card that is not validate');
                        }
                        card.isValidate = false;
                        card.history.push(enums_1.WorkingCardHistoryEnums.RESET_CARD);
                        card.points = 0;
                        return [2 /*return*/, this.repo.save(card)];
                }
            });
        });
    };
    WorkingCardService.prototype.answerFieldTranslation = function (answer) {
        return __awaiter(this, void 0, void 0, function () {
            var workingCard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo.findOne({
                            where: {
                                id: answer.workingCardId,
                            },
                            relations: {
                                card: {
                                    fieldTranslation: true,
                                },
                            },
                        })];
                    case 1:
                        workingCard = _a.sent();
                        if (answer.answer === workingCard.card.fieldTranslation.answers[0]) {
                            return [2 /*return*/, this.addPoint(answer.workingCardId)];
                        }
                        return [2 /*return*/, this.miss(answer.workingCardId)];
                }
            });
        });
    };
    WorkingCardService.prototype.getWorkingCard = function (chapterId, meId) {
        return __awaiter(this, void 0, void 0, function () {
            var cardsToLearn, cardIds, _i, cardsToLearn_1, card;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cardService.getCardsToWork(meId, chapterId)];
                    case 1:
                        cardsToLearn = _a.sent();
                        if (!cardsToLearn.length) {
                            return [2 /*return*/, []];
                        }
                        cardIds = cardsToLearn.map(function (card) { return card.id; });
                        _i = 0, cardsToLearn_1 = cardsToLearn;
                        _a.label = 2;
                    case 2:
                        if (!(_i < cardsToLearn_1.length)) return [3 /*break*/, 5];
                        card = cardsToLearn_1[_i];
                        return [4 /*yield*/, this.create({
                                ownerId: meId,
                                cardId: card.id,
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.logger.error(cardIds.length);
                        return [2 /*return*/, this.repo
                                .createQueryBuilder('workingCard')
                                .leftJoinAndSelect('workingCard.card', 'card')
                                .leftJoinAndSelect('card.fieldTranslation', 'fieldTs')
                                .where('workingCard.cardId IN (:...cardIds)', { cardIds: cardIds })
                                .andWhere('workingCard.ownerId = :meId', { meId: meId })
                                .orderBy('RANDOM()')
                                .getMany()];
                }
            });
        });
    };
    WorkingCardService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repo.findOne({
                        where: {
                            id: id,
                        },
                        relations: {
                            card: {
                                fieldTranslation: true,
                            },
                        },
                    })];
            });
        });
    };
    var WorkingCardService_1;
    WorkingCardService = WorkingCardService_1 = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_2.InjectRepository)(entities_1.WorkingCardEntity)),
        __metadata("design:paramtypes", [typeorm_1.Repository,
            CardService_1.CardService])
    ], WorkingCardService);
    return WorkingCardService;
}());
exports.WorkingCardService = WorkingCardService;
//# sourceMappingURL=WorkingCardService.js.map