import * as angular from 'angular';
import { InjectStatic } from '../../util/Inject';
import { IDENTIFICATION, IInputIdentification } from '../IInputIdentification';
import { ToggleInputController } from './ToggleInputController';

export class ToggleInputDirective {
  public static NAME: string = 'toggleInput';
  @InjectStatic(IDENTIFICATION)
  public static DIRECTIVE(identification: IInputIdentification): angular.IDirective {
    return {
      restrict : 'E',
      controller: ToggleInputController,
      controllerAs: 'input',
      scope: {
        context: '=',
        elementId: '@',
        errors: '=',
        isDisabled: '=',
        name: '@',
        label: '@',
        model: '=',
        onChange: '&',
        options: '=',
      },
      template: require('./ToggleInput.html'),
      link: (scope: any, element: JQuery, attributes: any): void => {
        scope.elementId = scope.elementId || identification.toId(attributes.model);
      },
    };
  };
}
