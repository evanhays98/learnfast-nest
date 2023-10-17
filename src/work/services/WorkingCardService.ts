import {Injectable, Logger} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {WorkingCardEntity} from '../entities';
import {WorkingCardHistoryEnums} from '../../libs/enums';
import {answerFieldTranslationWorkingCard, CreateWorkingCardService,} from '../../libs/dtos';
import {CardService} from './CardService';
import {distinct} from "rxjs";

@Injectable()
export class WorkingCardService {
    private readonly logger = new Logger(WorkingCardService.name);

    constructor(
        @InjectRepository(WorkingCardEntity)
        private readonly repo: Repository<WorkingCardEntity>,
        private readonly cardService: CardService,
    ) {
    }

    async create(workingCard: CreateWorkingCardService) {
        const cardExist = await this.repo.findOne({
            where: {
                ownerId: workingCard.ownerId,
                cardId: workingCard.cardId,
            },
        });
        if (cardExist) {
            return cardExist;
        }
        return this.repo.save(workingCard);
    }

    async addPoint(id: string) {
        const card = await this.repo.findOne({
            where: {
                id,
            },
        });
        card.points += 1;
        if (card.points === card.maxPoints || card.points === 1) {
            card.points = card.maxPoints;
            card.isValidate = true;
            card.history.push(WorkingCardHistoryEnums.FINISH_CARD);
        } else {
            card.history.push(WorkingCardHistoryEnums.ADD_ONE_POINT);
        }
        return this.repo.save(card);
    }

    async validate(id: string) {
        const card = await this.repo.findOne({
            where: {
                id,
            },
        });
        card.isValidate = true;
        card.points = card.maxPoints;
        card.history.push(WorkingCardHistoryEnums.MARK_AS_KNOWN);
        return this.repo.save(card);
    }

    async miss(id: string) {
        const card = await this.repo.findOne({
            where: {
                id,
            },
        });
        if (card.points === 0) {
            card.points += 1;
        }
        card.history.push(WorkingCardHistoryEnums.MISS_ANSWER);
        return this.repo.save(card);
    }

    async reset(id: string) {
        const card = await this.repo.findOne({
            where: {
                id,
            },
        });
        if (!card.isValidate) {
            throw new Error('You cant reset a card that is not validate');
        }
        card.isValidate = false;
        card.history.push(WorkingCardHistoryEnums.RESET_CARD);
        card.points = 0;
        return this.repo.save(card);
    }

    async answerFieldTranslation(answer: answerFieldTranslationWorkingCard) {
        const workingCard = await this.repo.findOne({
            where: {
                id: answer.workingCardId,
            },
            relations: {
                card: {
                    fieldTranslation: true,
                },
            },
        });

        if (
            answer.answer.trim().toLowerCase() ===
            workingCard.card.fieldTranslation.answers[0].trim().toLowerCase()
        ) {
            return this.addPoint(answer.workingCardId);
        }
        return this.miss(answer.workingCardId);
    }

    async getWorkingCard(chapterId: string, meId: string) {
        const cardsToLearn = await this.cardService.getCardsToWork(meId, chapterId);
        if (!cardsToLearn.length) {
            return [];
        }
        const cardIds = cardsToLearn.map((card) => card.id);
        for (const card of cardsToLearn) {
            await this.create({
                ownerId: meId,
                cardId: card.id,
                chapterId,
            });
        }
        return this.repo
            .createQueryBuilder('workingCard')
            .leftJoinAndSelect('workingCard.card', 'card')
            .leftJoinAndSelect('card.fieldTranslation', 'fieldTs')
            .where('workingCard.cardId IN (:...cardIds)', {cardIds})
            .andWhere('workingCard.ownerId = :meId', {meId})
            .orderBy('RANDOM()')
            .getMany();
    }

    async findOne(id: string) {
        return this.repo.findOne({
            where: {
                id,
            },
            relations: {
                card: {
                    fieldTranslation: true,
                },
            },
        });
    }
}
