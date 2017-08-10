import * as angular from 'angular';
import { IRouteMiddleware } from './IRouteMiddleware';
import { PERMISSIONS } from '../auth/Permissions';

export function using(...middlewareNames: string[]): any[] {
  let inject: any[] = ['$rootScope'].concat(middlewareNames);
  inject.push(handleStateChange);
  return inject;
}

function handleStateChange($rootScope: angular.IRootScopeService, ...middlewares: IRouteMiddleware[]): void {
  $rootScope.$on('$stateChangeStart', (event, next) => {
    const permission = (next && next.data && next.data.permission) || PERMISSIONS.NONE;

    middlewares.some((middleware: IRouteMiddleware): boolean => {
      let halting = true;
      let proceed = () => halting = false;

      middleware.call({ call: proceed, permission });

      if (halting) {
        event.preventDefault();
      }

      return halting;
    });
  });
}
