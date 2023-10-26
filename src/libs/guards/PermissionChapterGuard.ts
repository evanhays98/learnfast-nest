import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChapterEntity } from '../../work/entities';
import { AuthUser } from '../dtos';
import { Role } from '../../auth/dtos';

@Injectable()
export class PermissionGuardChapter implements CanActivate {
  private readonly logger = new Logger(PermissionGuardChapter.name);

  constructor(
    @InjectRepository(ChapterEntity)
    private chapterRepository: Repository<ChapterEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthUser;

    if (user.role && user.role.includes(Role.ADMIN)) {
      return true;
    }

    const chapterId = request.params.chapterId || request.params.id;
    const chapter = await this.chapterRepository.findOne({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      throw new ForbiddenException('Chapter not found.');
    }

    if (user.id !== chapter.ownerId) {
      throw new ForbiddenException(
        'You do not have permission to perform this action.',
      );
    }

    return true;
  }
}
