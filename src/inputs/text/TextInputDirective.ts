import * as angular from 'angular';
import { InjectStatic } from '../../util/Inject';
import { TextInputController } from './TextInputController';
import { IDENTIFICATION, IInputIdentification } from '../IInputIdentification';

export class TextInputDirective {
  public static NAME: string = 'textInput';
  @InjectStatic(IDENTIFICATION)
  public static DIRECTIVE(identification: IInputIdentification): angular.IDirective {
    return {
      restrict : 'E',
      controller: TextInputController,
      controllerAs: 'input',
      scope: {
        context: '=',
        elementId: '@',
        inputClass: '@',
        errors: '=',
        label: '@',
        model: '=',
        onChange: '&',
      },
      template: require('./TextInput.html'),
      link: (scope: any, element: JQuery, attributes: any): void => {
        scope.elementId = scope.elementId || identification.toId(attributes.model);
        scope.inputClass = scope.inputClass;
        scope.placeholder = attributes.placeholder;
        scope.maxlength = attributes.maxlength;
      },
    };
  };
}
