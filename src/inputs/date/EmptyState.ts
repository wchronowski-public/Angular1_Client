import { IDateInputErrorDisplayState, ValidateCallback } from './IDateInputErrorDisplayState';
import { WorkInProgressState } from './WorkInProgressState';

export class EmptyState implements IDateInputErrorDisplayState {
  public shouldShowErrors(): boolean {
    return false;
  }

  public monthBlurred(callback: ValidateCallback): IDateInputErrorDisplayState {
    return new WorkInProgressState(true, false, false);
  }

  public dayBlurred(callback: ValidateCallback): IDateInputErrorDisplayState {
    return new WorkInProgressState(false, true, false);
  }

  public yearBlurred(callback: ValidateCallback): IDateInputErrorDisplayState {
    return new WorkInProgressState(false, false, true);
  }

}
