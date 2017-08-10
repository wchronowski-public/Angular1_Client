import * as angular from 'angular';
import { DatepickerController } from './DatepickerController';

export class DatepickerDirective {
  public static NAME = 'datepicker';
  public static DIRECTIVE(): angular.IDirective {
    return {
      restrict : 'E',
      controller: DatepickerController,
      controllerAs: 'controller',
      replace: true,
      scope: {
        model: '=',
        onSelection: '&',
      },
      template: require('./Datepicker.html'),
    };
  };
}
