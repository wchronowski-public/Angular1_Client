export interface ILifecycleControllerScope {
  $on(e: string, f: () => void): void;
}

export abstract class LifecycleController {
  public constructor($scope: ILifecycleControllerScope) {
    $scope.$on('$destroy', this.teardown.bind(this));
  }

  public abstract teardown(): void;
}
