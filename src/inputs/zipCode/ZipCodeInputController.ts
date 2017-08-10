import { Inject } from '../../util/Inject';
import { IInputScope } from '../IInputScope';
import { InputController } from '../InputController';
import { ZipCode } from '../../addresses/ZipCode';

@Inject('$scope', '$timeout')
export class ZipCodeInputController extends InputController<ZipCode> {
  public constructor(scope: IInputScope<ZipCode>, timeout: Timeout) {
    super(scope, timeout);
  }

  public hasValue(): boolean {
    if(this.scope.model) {
      return !!this.scope.model.baseValue
          || !!this.scope.model.extendedValue;
    } else {
      return false;
    }
  }
}
