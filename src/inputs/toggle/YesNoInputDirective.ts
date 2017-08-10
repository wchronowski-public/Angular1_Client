import * as angular from 'angular';
import { InjectStatic } from '../../util/Inject';
import { ToggleInputController } from './ToggleInputController';
import { IDENTIFICATION, IInputIdentification } from '../IInputIdentification';
import { SelectListItem } from '../../util/SelectListItem';

export class YesNoInputDirective {
  private static options: SelectListItem<boolean>[] = [
      new SelectListItem(true, 'Yes'),
      new SelectListItem(false, 'No'),
    ];
  public static NAME: string = 'yesNoInput';
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
      },
      template: require('./ToggleInput.html'),
      link: (scope: any, element: JQuery, attributes: any): void => {
        scope.elementId = scope.elementId || identification.toId(attributes.model);
        scope.options = YesNoInputDirective.options;
      },
    };
  };
}
