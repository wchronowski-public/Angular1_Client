import { Permission } from './Permissions';

export const AUTH_SERVICE = 'authService';

export interface IAuthService {
  isAuthenticated(): boolean;
  isAuthorized(permission: Permission): boolean;
  getAgencyNumber(): string;
}
