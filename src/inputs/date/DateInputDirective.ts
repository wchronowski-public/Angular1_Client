import * as angular from 'angular';
import { InjectStatic } from '../../util/Inject';
import { DateInputController } from './DateInputController';
import { IDENTIFICATION, IInputIdentification } from '../IInputIdentification';
import { WindowHelper } from '../../util/WindowHelper';

export class DateInputDirective {
  public static NAME: string = 'dateInput';
  @InjectStatic(IDENTIFICATION)
  public static DIRECTIVE(identification: IInputIdentification): angular.IDirective {
    return {
      restrict : 'E',
      controller: DateInputController,
      controllerAs: 'input',
      scope: {
        context: '=',
        elementId: '@',
        errors: '=',
        label: '@',
        model: '=',
        onChange: '&',
      },
      template: require('./DateInput.html'),
      link: (scope: any, element: JQuery, attributes: any): void => {
        const id = scope.elementId || identification.toId(attributes.model);
        scope.groupId = id;
        scope.dayElementId = id + '-day';
        scope.monthElementId = id + '-month';
        scope.yearElementId = id + '-year';
        scope.focusDay = (): Promise<void> => {
          return WindowHelper.highlightTextInput(scope.dayElementId);
        };
        scope.focusYear = (): Promise<void> => {
          return WindowHelper.highlightTextInput(scope.yearElementId);
        };
      },
    };
  };
}
