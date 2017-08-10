import { Inject } from '../../util/Inject';
import { IInputScope } from '../IInputScope';
import { InputController } from '../InputController';

@Inject('$scope', '$timeout')
export class CheckboxInputController extends InputController<boolean> {
  public constructor(scope: IInputScope<boolean>, timeout: Timeout) {
    super(scope, timeout);
  }

  public hasValue(): boolean {
    return true;
  }
}
