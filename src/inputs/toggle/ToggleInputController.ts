import { Inject } from '../../util/Inject';
import { IInputScope } from '../IInputScope';
import { InputController } from '../InputController';

@Inject('$scope', '$timeout')
export class ToggleInputController<T> extends InputController<T> {
  public constructor(scope: IInputScope<T>, timeout: Timeout) {
    super(scope, timeout);
  }
}
