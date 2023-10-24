import { Role } from '../../auth/dtos';

export class AuthUser {
  id: string;
  mail: string;
  pseudo: string;
  role: Role[];
}
