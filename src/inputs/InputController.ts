import { IInputScope } from './IInputScope';
import { IInputErrorDisplayFSM } from './errors/IInputErrorDisplayFSM';
import { InputErrorDisplayFSM } from './errors/InputErrorDisplayFSM';
import { IInput } from './IInput';

export abstract class InputController<T> implements IInput {
  public fsm: IInputErrorDisplayFSM;
  protected scope: IInputScope<T>;
  protected timeout: Timeout;

  public constructor(scope: IInputScope<T>, timeout: Timeout) {
    this.scope = scope;
    this.timeout = timeout;
    this.fsm = InputErrorDisplayFSM.fromInput(this);
  }

  public blurred(): void {
    this.timeout(() => {
      this.fsm = this.fsm.blurred(this);
    });
  }

  public changed(): void {
    this.timeout(() => {
      this.scope.onChange();
      this.fsm = this.fsm.changed(this);
    });
  }

  public isValid(): boolean {
    return this.scope.errors ? ( this.scope.errors.length === 0 ) : true;
  }

  public hasValue(): boolean {
    return !!this.scope.model || (this.scope.model as any) === 0;
  }

  public shouldShowErrors(): boolean {
    return (this.scope.context && this.scope.context.shouldShowErrors()) || this.fsm.shouldShowErrors();
  }

  public validate(): void {
    if(!this.scope.context) {
      return;
    }
    this.scope.context.validate();
  }
}
