import { IInputErrorDisplayFSM } from './IInputErrorDisplayFSM';
import { IInputErrorDisplayState } from './IInputErrorDisplayState';
import { IInput } from '../IInput';
import { NeverHadValueState } from './NeverHadValueState';
import { HasValueShowingErrorsState } from './HasValueShowingErrorsState';

export class InputErrorDisplayFSM implements IInputErrorDisplayFSM {
  public currentState: IInputErrorDisplayState;

  public static fromInput(input: IInput): InputErrorDisplayFSM {
    const initialState = input.hasValue()
      ? new HasValueShowingErrorsState()
      : new NeverHadValueState();

    return new InputErrorDisplayFSM(initialState);
  }

  public constructor(initialState: IInputErrorDisplayState) {
    this.currentState = initialState;
  }

  public changed(input: IInput): InputErrorDisplayFSM {
    return new InputErrorDisplayFSM(this.currentState.changed(input));
  }

  public blurred(input: IInput): InputErrorDisplayFSM {
    return new InputErrorDisplayFSM(this.currentState.blurred(input));
  }

  public shouldShowErrors(): boolean {
    return this.currentState.shouldShowErrors;
  }
}
