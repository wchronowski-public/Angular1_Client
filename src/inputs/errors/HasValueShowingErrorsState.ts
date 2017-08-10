import { IInputErrorDisplayState } from './IInputErrorDisplayState';
import { IInput } from '../IInput';
import { NoValueShowingErrorsState } from './NoValueShowingErrorsState';

export class HasValueShowingErrorsState implements IInputErrorDisplayState {
  public shouldShowErrors = true;

  public changed(input: IInput): IInputErrorDisplayState {
    input.validate();

    return input.hasValue()
      ? this
      : new NoValueShowingErrorsState();
  }

  public blurred(input: IInput): IInputErrorDisplayState {
    return this;
  }
}
