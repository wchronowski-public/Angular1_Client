import * as angular from 'angular';
import { InjectStatic } from '../../util/Inject';
import { SelectInputController } from './SelectInputController';
import { IDENTIFICATION, IInputIdentification } from '../IInputIdentification';
import * as _ from 'lodash';
import { SelectListItem } from '../../util/SelectListItem';

export interface ISelectInputDirectiveScope {
  elementId: string;
  options: SelectListItem<any>[];
  model: any;
}

export class SelectInputDirective {
  public static NAME: string = 'selectInput';
  @InjectStatic(IDENTIFICATION)
  public static DIRECTIVE(identification: IInputIdentification): angular.IDirective {
    return {
      restrict : 'E',
      controller: SelectInputController,
      controllerAs: 'input',
      scope: {
        context: '=',
        elementId: '@',
        errors: '=',
        label: '@',
        model: '=',
        onChange: '&',
        options: '=',
      },
      template: require('./SelectInput.html'),
      link: (scope: ISelectInputDirectiveScope, element: JQuery, attributes: any): void => {
        if(_.isObject(scope.model)) {
          const matchingModel = _.find(scope.options.map(option => option.key), _.matches(scope.model));
          if(matchingModel) {
            scope.model = matchingModel;
          }
        }
        scope.elementId = scope.elementId || identification.toId(attributes.model);
      },
    };
  };
}
