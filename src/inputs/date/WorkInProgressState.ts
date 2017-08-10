import { IDateInputErrorDisplayState, ValidateCallback } from './IDateInputErrorDisplayState';
import { ShowingErrorsState } from './ShowingErrorsState';

export class WorkInProgressState implements IDateInputErrorDisplayState {
  public constructor(private monthTouched: boolean,
                     private dayTouched: boolean,
                     private yearTouched: boolean) {}

  public shouldShowErrors(): boolean {
    return false;
  }

  public monthBlurred(callback: ValidateCallback): IDateInputErrorDisplayState {
    return this.transition(callback, true, this.dayTouched, this.yearTouched);
  }

  public dayBlurred(callback: ValidateCallback): IDateInputErrorDisplayState {
    return this.transition(callback, this.monthTouched, true, this.yearTouched);
  }

  public yearBlurred(callback: ValidateCallback): IDateInputErrorDisplayState {
    return this.transition(callback, this.monthTouched, this.dayTouched, true);
  }

  private transition(callback: ValidateCallback, m: boolean, d: boolean, y: boolean): IDateInputErrorDisplayState {
    if(m && d && y) {
      callback();
      return new ShowingErrorsState();
    } else {
      return new WorkInProgressState(m, d, y);
    }
  }
}
