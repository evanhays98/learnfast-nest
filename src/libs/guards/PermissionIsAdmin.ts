import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthUser } from '../dtos';
import { Role } from '../../auth/dtos';

@Injectable()
export class PermissionIsAdmin implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthUser;

    return user.role && user.role.includes(Role.ADMIN);
  }
}
