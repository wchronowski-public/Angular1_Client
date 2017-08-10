import * as angular from 'angular';
import { InjectStatic } from '../../util/Inject';
import { ZipCodeInputController } from './ZipCodeInputController';
import { IDENTIFICATION, IInputIdentification } from '../IInputIdentification';

export class ZipCodeInputDirective {
  public static NAME: string = 'zipCodeInput';
  @InjectStatic(IDENTIFICATION)
  public static DIRECTIVE(identification: IInputIdentification): angular.IDirective {
    return {
      restrict : 'E',
      controller: ZipCodeInputController,
      controllerAs: 'input',
      scope: {
        context: '=',
        elementId: '@',
        errors: '=',
        label: '@',
        model: '=',
        onChange: '&',
      },
      template: require('./ZipCodeInput.html'),
      link: (scope: any, element: JQuery, attributes: any): void => {
        scope.elementId = scope.elementId || identification.toId(attributes.model);
      },
    };
  };
}
