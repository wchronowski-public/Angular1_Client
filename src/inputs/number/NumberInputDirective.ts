import * as angular from 'angular';
import { InjectStatic } from '../../util/Inject';
import { NumberInputController } from './NumberInputController';
import { IDENTIFICATION, IInputIdentification } from '../IInputIdentification';

export class NumberInputDirective {
  public static NAME: string = 'numberInput';
  @InjectStatic(IDENTIFICATION)
  public static DIRECTIVE(identification: IInputIdentification): angular.IDirective {
    return {
      restrict : 'E',
      controller: NumberInputController,
      controllerAs: 'input',
      scope: {
        context: '=',
        elementId: '@',
        errors: '=',
        label: '@',
        model: '=',
        onChange: '&',
      },
      template: require('./NumberInput.html'),
      link: (scope: any, element: JQuery, attributes: any): void => {
        scope.elementId = scope.elementId || identification.toId(attributes.model);
      },
    };
  };
}
