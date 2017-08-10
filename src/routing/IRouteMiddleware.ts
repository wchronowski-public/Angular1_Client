import { Permission } from '../auth/Permissions';

export interface INext {
  permission: Permission;
  call(): void;
}

export interface IRouteMiddleware {
  call(next: INext): void;
}
