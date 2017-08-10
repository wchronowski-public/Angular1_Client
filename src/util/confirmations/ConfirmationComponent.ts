import * as angular from 'angular';
import { Confirmation } from './Confirmation';

export class ConfirmationComponent {
  public static NAME: string = 'buttonConfirmed';
  public static COMPONENT: angular.IComponentOptions = {
    template: require('./Confirmation.html'),
    controller: Confirmation,
    controllerAs: 'confirmation',
    transclude: true,
    bindings: {
      action: '&onConfirm',
      message: '@confirm',
      buttonClass: '@buttonClass',
    },
  };
};
