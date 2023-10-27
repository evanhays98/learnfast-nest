import { UseGuards } from '@nestjs/common';
import { PermissionCardGuard, PermissionGuardChapter } from '../guards';
import { JwtAuthGuard } from '../../auth/guards/jwtAuthGuard';

export const enum Permissions {
  CHAPTER_OWNER = 'ChapterOwner',
  CARD_OWNER = 'CardOwner',
}

export const HasPermission = (permission: Permissions) => {
  switch (permission) {
    case Permissions.CHAPTER_OWNER:
      return UseGuards(JwtAuthGuard, PermissionGuardChapter);
    case Permissions.CARD_OWNER:
      return UseGuards(JwtAuthGuard, PermissionCardGuard);
    default:
      throw new Error(`Permission ${permission} not implemented`);
  }
};
