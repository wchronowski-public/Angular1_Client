import * as angular from 'angular';
import { InjectStatic } from '../../util/Inject';
import { CheckboxInputController } from './CheckboxInputController';
import { IDENTIFICATION, IInputIdentification } from '../IInputIdentification';

export class CheckboxInputDirective {
  public static NAME: string = 'checkboxInput';
  @InjectStatic(IDENTIFICATION)
  public static DIRECTIVE(identification: IInputIdentification): angular.IDirective {
    return {
      restrict : 'E',
      controller: CheckboxInputController,
      controllerAs: 'input',
      scope: {
        context: '=',
        isDisabled: '=',
        elementId: '@',
        errors: '=',
        label: '@',
        model: '=',
        onChange: '&',
      },
      template: require('./CheckboxInput.html'),
      link: (scope: any, element: JQuery, attributes: any): void => {
        scope.elementId = scope.elementId || identification.toId(attributes.model);
      },
    };
  };
}
