import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity, ChapterEntity } from '../../work/entities';
import { AuthUser } from '../dtos';
import { Role } from '../../auth/dtos';

@Injectable()
export class PermissionCardGuard implements CanActivate {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthUser;

    if (user.role && user.role.includes(Role.ADMIN)) {
      return true;
    }

    const cardId = request.params.cardId || request.params.id;
    const card = await this.cardRepository.findOne({
      where: {
        id: cardId,
      },
    });

    if (!card) {
      throw new ForbiddenException('Card not found.');
    }

    if (user.id !== card.ownerId) {
      throw new ForbiddenException(
        'You do not have permission to perform this action.',
      );
    }

    return true;
  }
}
