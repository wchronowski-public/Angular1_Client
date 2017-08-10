import * as angular from 'angular';
import { NotificationController } from './NotificationController';

export class NotificationDirective {
  public static NAME: string = 'notification';
  public static DIRECTIVE(): angular.IDirective {
    return {
      restrict: 'E',
      template: require('./Notification.html'),
      controller: NotificationController,
      controllerAs: 'controller',
      scope: {
        notification: '<',
      },
      link: (scope: angular.IScope, element: JQuery, attributes: any): void => {
        (scope as any).onDismissed = (f: () => void) => {
          element.on('webkitAnimationEnd oanimationend msAnimationEnd animationEnd', f);
        };
      },
    };
  };
}
