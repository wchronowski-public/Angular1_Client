import { IInputErrorDisplayState } from './IInputErrorDisplayState';
import { IInput } from '../IInput';
import { HasValueShowingErrorsState } from './HasValueShowingErrorsState';
import { NoValueShowingErrorsState } from './NoValueShowingErrorsState';

export class NeverHadValueState implements IInputErrorDisplayState {
  public shouldShowErrors = false;

  public changed(input: IInput): IInputErrorDisplayState {
    if(input.hasValue()) {
      input.validate();
      return new HasValueShowingErrorsState();
    } else {
      return this;
    }
  }

  public blurred(input: IInput): IInputErrorDisplayState {
    input.validate();
    return new NoValueShowingErrorsState();
  }
}
