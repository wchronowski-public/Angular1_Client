import { Inject } from '../../util/Inject';
import { IInputScope } from '../IInputScope';
import { InputController } from '../InputController';

@Inject('$scope', '$timeout')
export class NumberInputController extends InputController<number> {
  public constructor(scope: IInputScope<number>, timeout: Timeout) {
    super(scope, timeout);
  }
}
