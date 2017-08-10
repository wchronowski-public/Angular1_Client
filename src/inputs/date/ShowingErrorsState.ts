import { IDateInputErrorDisplayState, ValidateCallback } from './IDateInputErrorDisplayState';

export class ShowingErrorsState implements IDateInputErrorDisplayState {
  public shouldShowErrors(): boolean {
    return true;
  }

  public monthBlurred(callback: ValidateCallback): IDateInputErrorDisplayState {
    callback();
    return this;
  }

  public dayBlurred(callback: ValidateCallback): IDateInputErrorDisplayState {
    callback();
    return this;
  }

  public yearBlurred(callback: ValidateCallback): IDateInputErrorDisplayState {
    callback();
    return this;
  }

}
