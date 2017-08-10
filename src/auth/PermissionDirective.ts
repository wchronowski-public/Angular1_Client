import * as angular from 'angular';
import { IAuthService , AUTH_SERVICE } from './IAuthService';

export class PermissionDirective {
  public static NAME: string = 'permission';
  public static DIRECTIVE: any[] = [
    AUTH_SERVICE,
    (authService: IAuthService) => {
      return {
        restrict : 'A',
        scope: {
          permission: '<',
        },
        link: (scope: angular.IScope, element: JQuery): void => {
          const permission = (scope as any).permission;
          if (permission && !authService.isAuthorized(permission)) {
            element.addClass('ng-hide');
          }
        },
      };
    },
  ];
}
