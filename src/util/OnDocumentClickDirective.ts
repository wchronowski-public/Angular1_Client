import * as angular from 'angular';
import { InjectStatic } from './Inject';

export class OnDocumentClickDirective {
  public static NAME = 'onDocumentClick';

  @InjectStatic('$document')
  public static DIRECTIVE($document: angular.IDocumentService): angular.IDirective {
    return {
      restrict: 'A',
      link: ($scope: angular.IScope, element: JQuery, attributes: any): void => {
        const f = (event: JQueryEventObject) => {
          const clickedElement = event.data && event.data.clickedElement;
          if (clickedElement !== element) {
            $scope.$apply(() => {
              $scope.$eval(attributes.onDocumentClick);
            });
          }
        };

        element.on('click', (event: JQueryEventObject) => {
          event.data = event.data || {};
          event.data.clickedElement = element;
        });

        $document.on('click', f);

        $scope.$on('$destroy', () => {
          $document.off('click', f);
        });
      },
    };
  }
}
