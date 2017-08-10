import * as angular from 'angular';
import { NotificationsController } from './NotificationsController';

export class NotificationsDirective {
  public static NAME: string = 'notifications';
  public static DIRECTIVE(): angular.IDirective {
    return {
      restrict: 'E',
      template: require('./Notifications.html'),
      controller: NotificationsController,
      controllerAs: 'controller',
      scope: {
      },
    };
  };
}
