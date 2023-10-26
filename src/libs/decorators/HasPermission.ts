import { UseGuards } from '@nestjs/common';
import { PermissionGuardChapter } from '../guards';
import { JwtAuthGuard } from '../../auth/guards/jwtAuthGuard';

export const enum Permissions {
  CHAPTER_OWNER = 'ChapterOwner',
}

export const HasPermission = (permission: Permissions) => {
  switch (permission) {
    case Permissions.CHAPTER_OWNER:
      return UseGuards(JwtAuthGuard, PermissionGuardChapter);
    default:
      throw new Error(`Permission ${permission} not implemented`);
  }
};
