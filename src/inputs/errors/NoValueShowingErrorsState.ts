import { IInputErrorDisplayState } from './IInputErrorDisplayState';
import { IInput } from '../IInput';
import { HasValueShowingErrorsState } from './HasValueShowingErrorsState';

export class NoValueShowingErrorsState implements IInputErrorDisplayState {
  public shouldShowErrors = true;

  public changed(input: IInput): IInputErrorDisplayState {
    if(input.hasValue()) {
      input.validate();
      return new HasValueShowingErrorsState();
    } else {
      return this;
    }
  }

  public blurred(input: IInput): IInputErrorDisplayState {
    return this;
  }
}
