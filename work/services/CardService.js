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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var typeorm_2 = require("@nestjs/typeorm");
var entities_1 = require("../entities");
var CardService = /** @class */ (function () {
    function CardService(repo) {
        this.repo = repo;
        this.logger = new common_1.Logger(CardService_1.name);
    }
    CardService_1 = CardService;
    CardService.prototype.create = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repo.save(card)];
            });
        });
    };
    CardService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repo.findOne({
                        where: {
                            id: id,
                        },
                        relations: {
                            fieldTranslation: true,
                        },
                    })];
            });
        });
    };
    CardService.prototype.findByFieldId = function (fieldId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repo.findOne({
                        where: {
                            fieldId: fieldId,
                        },
                        relations: {
                            fieldTranslation: true,
                        },
                    })];
            });
        });
    };
    CardService.prototype.findByChapterId = function (chapterId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repo.find({
                        where: {
                            chapterId: chapterId,
                        },
                        relations: {
                            fieldTranslation: true,
                        },
                    })];
            });
        });
    };
    CardService.prototype.getCardsToWork = function (meId, chapterId) {
        return __awaiter(this, void 0, void 0, function () {
            var date, cardsToRetry, cardsToLearn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        date.setMinutes(date.getMinutes() - 10);
                        return [4 /*yield*/, this.repo
                                .createQueryBuilder('card')
                                .addSelect('RANDOM()', 'seeded_random')
                                .innerJoin('card.workingCards', 'workingCard', 'workingCard.ownerId = :meId ' +
                                'AND ARRAY_LENGTH(workingCard.history, 1) IS NOT NULL ' +
                                'AND workingCard.updatedAt < :date ' +
                                'AND workingCard.isValidate = false', { meId: meId, date: date })
                                .where('card.chapterId = :chapterId', { chapterId: chapterId })
                                .orderBy('seeded_random', 'DESC')
                                .take(7)
                                .getMany()];
                    case 1:
                        cardsToRetry = _a.sent();
                        return [4 /*yield*/, this.repo
                                .createQueryBuilder('card')
                                .addSelect('RANDOM()', 'seeded_random')
                                .leftJoin('card.workingCards', 'workingCard', 'workingCard.ownerId = :meId AND workingCard.isValidate = false AND ARRAY_LENGTH(workingCard.history, 1) IS NULL', { meId: meId })
                                .where('card.chapterId = :chapterId', { chapterId: chapterId })
                                .orderBy('seeded_random', 'DESC')
                                .distinct(true)
                                .take(20)
                                .getMany()];
                    case 2:
                        cardsToLearn = _a.sent();
                        return [2 /*return*/, __spreadArray(__spreadArray([], cardsToRetry, true), cardsToLearn, true).slice(0, 20)];
                }
            });
        });
    };
    var CardService_1;
    CardService = CardService_1 = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_2.InjectRepository)(entities_1.CardEntity)),
        __metadata("design:paramtypes", [typeorm_1.Repository])
    ], CardService);
    return CardService;
}());
exports.CardService = CardService;
//# sourceMappingURL=CardService.js.map