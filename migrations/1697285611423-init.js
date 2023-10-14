"use strict";
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
exports.Init1697285611423 = void 0;
var Init1697285611423 = /** @class */ (function () {
    function Init1697285611423() {
        this.name = 'Init1697285611423';
    }
    Init1697285611423.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"base_entity\" (\n                \"id\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"active\" boolean NOT NULL DEFAULT true,\n                \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                CONSTRAINT \"PK_03e6c58047b7a4b3f6de0bfa8d7\" PRIMARY KEY (\"id\")\n            )\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"user_entity\" (\n                \"id\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"active\" boolean NOT NULL DEFAULT true,\n                \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"pseudo\" character varying NOT NULL,\n                \"salt\" character varying NOT NULL,\n                \"mail\" character varying NOT NULL,\n                \"password\" character varying NOT NULL,\n                CONSTRAINT \"UQ_99d92115c40f0ae23a66819dc2e\" UNIQUE (\"pseudo\"),\n                CONSTRAINT \"UQ_f512b758ebe5088b7fc0bd57200\" UNIQUE (\"mail\"),\n                CONSTRAINT \"PK_b54f8ea623b17094db7667d8206\" PRIMARY KEY (\"id\")\n            )\n        ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"chapter_entity\" (\n                \"id\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"active\" boolean NOT NULL DEFAULT true,\n                \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"ownerId\" character varying NOT NULL,\n                \"title\" character varying NOT NULL,\n                \"description\" character varying NOT NULL,\n                CONSTRAINT \"PK_d683a27f4e8b70f23633cf5fc03\" PRIMARY KEY (\"id\")\n            )\n        ")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"field_translation_entity\" (\n                \"id\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"active\" boolean NOT NULL DEFAULT true,\n                \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"ownerId\" character varying NOT NULL,\n                \"sentence\" character varying NOT NULL,\n                \"answers\" text array NOT NULL,\n                \"translation\" character varying NOT NULL,\n                \"information\" character varying,\n                CONSTRAINT \"PK_d9281c6c3385220f265099b66cd\" PRIMARY KEY (\"id\")\n            )\n        ")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TYPE \"public\".\"working_card_entity_history_enum\" AS ENUM(\n                'ADD_ONE_POINT',\n                'MARK_AS_KNOWN',\n                'MISS_ANSWER',\n                'RESET_CARD',\n                'FINISH_CARD'\n            )\n        ")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"working_card_entity\" (\n                \"id\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"active\" boolean NOT NULL DEFAULT true,\n                \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"ownerId\" character varying NOT NULL,\n                \"cardId\" uuid NOT NULL,\n                \"points\" integer NOT NULL DEFAULT '0',\n                \"maxPoints\" integer NOT NULL DEFAULT '5',\n                \"isValidate\" boolean NOT NULL DEFAULT false,\n                \"startedAt\" TIMESTAMP,\n                \"history\" \"public\".\"working_card_entity_history_enum\" array NOT NULL DEFAULT '{}',\n                CONSTRAINT \"PK_66cdb584b012f5a493de76f37aa\" PRIMARY KEY (\"id\")\n            )\n        ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TYPE \"public\".\"card_entity_type_enum\" AS ENUM('TRANSLATION')\n        ")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE \"card_entity\" (\n                \"id\" uuid NOT NULL DEFAULT uuid_generate_v4(),\n                \"active\" boolean NOT NULL DEFAULT true,\n                \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(),\n                \"ownerId\" character varying NOT NULL,\n                \"type\" \"public\".\"card_entity_type_enum\" NOT NULL,\n                \"chapterId\" uuid NOT NULL,\n                \"fieldId\" uuid NOT NULL,\n                CONSTRAINT \"REL_21a36568f9846d1bb99ba0bb8a\" UNIQUE (\"fieldId\"),\n                CONSTRAINT \"PK_b9a88963999378ac2b88052a3ce\" PRIMARY KEY (\"id\")\n            )\n        ")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"working_card_entity\"\n            ADD CONSTRAINT \"FK_47c3afa41063c76151fdc11e15c\" FOREIGN KEY (\"cardId\") REFERENCES \"card_entity\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION\n        ")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"card_entity\"\n            ADD CONSTRAINT \"FK_d8a2d9edaaede94d38ea08e9b7d\" FOREIGN KEY (\"chapterId\") REFERENCES \"chapter_entity\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION\n        ")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"card_entity\"\n            ADD CONSTRAINT \"FK_21a36568f9846d1bb99ba0bb8a9\" FOREIGN KEY (\"fieldId\") REFERENCES \"field_translation_entity\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION\n        ")];
                    case 11:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Init1697285611423.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"card_entity\" DROP CONSTRAINT \"FK_21a36568f9846d1bb99ba0bb8a9\"\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"card_entity\" DROP CONSTRAINT \"FK_d8a2d9edaaede94d38ea08e9b7d\"\n        ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE \"working_card_entity\" DROP CONSTRAINT \"FK_47c3afa41063c76151fdc11e15c\"\n        ")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"card_entity\"\n        ")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TYPE \"public\".\"card_entity_type_enum\"\n        ")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"working_card_entity\"\n        ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TYPE \"public\".\"working_card_entity_history_enum\"\n        ")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"field_translation_entity\"\n        ")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"chapter_entity\"\n        ")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"user_entity\"\n        ")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE \"base_entity\"\n        ")];
                    case 11:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Init1697285611423;
}());
exports.Init1697285611423 = Init1697285611423;
//# sourceMappingURL=1697285611423-init.js.map