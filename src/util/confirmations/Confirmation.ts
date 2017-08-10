import { Inject } from '../Inject';

interface IConfirmationScope {
  message: string;
  action: () => void;
}

@Inject('$scope')
export class Confirmation {
  public message: string;
  public action: () => void;
  private active: boolean = false;

  public constructor(scope: IConfirmationScope) {
    this.message = this.message || scope.message;
    this.action = this.action || scope.action;
  }

  public isActive(): boolean {
    return this.active;
  }

  public confirm(): void {
    this.action();
    this.deactivate();
  }

  public cancel(): void {
    this.deactivate();
  }

  public activate(): void {
    this.active = true;
  }

  public deactivate(): void {
    this.active = false;
  }
}
