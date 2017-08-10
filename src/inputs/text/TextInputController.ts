import { Inject } from '../../util/Inject';
import { IInputScope } from '../IInputScope';
import { InputController } from '../InputController';

@Inject('$scope', '$timeout')
export class TextInputController extends InputController<string> {
  public constructor(scope: IInputScope<string>, timeout: Timeout) {
    super(scope, timeout);
  }
}
