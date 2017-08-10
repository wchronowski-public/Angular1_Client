import { IDateInputErrorDisplayState, ValidateCallback } from './IDateInputErrorDisplayState';
import { EmptyState } from './EmptyState';
import { WorkInProgressState } from './WorkInProgressState';
import { ShowingErrorsState } from './ShowingErrorsState';
import { IDateInputState } from './IDateInputState';

export interface IDateInputErrorDisplayFsm {
  shouldShowErrors(): boolean;
  monthBlurred(callback: ValidateCallback): IDateInputErrorDisplayFsm;
  dayBlurred(callback: ValidateCallback): IDateInputErrorDisplayFsm;
  yearBlurred(callback: ValidateCallback): IDateInputErrorDisplayFsm;
}

export class DateInputErrorDisplayFsm implements IDateInputErrorDisplayFsm {
  public static build(initialState: IDateInputState): DateInputErrorDisplayFsm {
    let state: IDateInputErrorDisplayState = null;

    if (initialState.monthHasValue() && initialState.dayHasValue() && initialState.yearHasValue()) {
      state = new ShowingErrorsState();
    } else if (initialState.monthHasValue() || initialState.dayHasValue() || initialState.yearHasValue()) {
      state = new WorkInProgressState(initialState.monthHasValue(), initialState.dayHasValue(), initialState.yearHasValue());
    } else {
      state = new EmptyState();
    }

    return new DateInputErrorDisplayFsm(state);
  }

  public constructor(private state: IDateInputErrorDisplayState) {}

  public shouldShowErrors(): boolean {
    return this.state.shouldShowErrors();
  }

  public monthBlurred(callback: ValidateCallback): DateInputErrorDisplayFsm {
    return new DateInputErrorDisplayFsm(this.state.monthBlurred(callback));
  }

  public dayBlurred(callback: ValidateCallback): DateInputErrorDisplayFsm {
    return new DateInputErrorDisplayFsm(this.state.dayBlurred(callback));
  }

  public yearBlurred(callback: ValidateCallback): DateInputErrorDisplayFsm {
    return new DateInputErrorDisplayFsm(this.state.yearBlurred(callback));
  }

}
