import { DateInput } from './DateInput';
import { Inject } from '../../util/Inject';
import { IInputScope } from '../IInputScope';
import { IDateInputErrorDisplayFsm, DateInputErrorDisplayFsm } from './DateInputErrorDisplayFsm';

export interface IDateInputScope extends IInputScope<DateInput> {
  focusDay: () => void;
  focusYear: () => void;
}

@Inject('$scope', '$timeout')
export class DateInputController {
  public fsm: IDateInputErrorDisplayFsm;
  private scope: IDateInputScope;
  private timeout: Timeout;
  private isShowingDatepicker = false;

  public constructor(scope: IDateInputScope, timeout: Timeout) {
    this.scope = scope;
    this.timeout = timeout;
    this.fsm = DateInputErrorDisplayFsm.build(scope.model);
  }

  public calendarIconClicked(): void {
    this.isShowingDatepicker = !this.isShowingDatepicker;
  }

  public shouldShowDatepicker(): boolean {
    return this.isShowingDatepicker;
  }

  public dateChosenWithDatepicker(): void {
    this.isShowingDatepicker = false;
  }

  public documentClicked(): void {
    this.isShowingDatepicker = false;
  }

  public monthBlurred(): void {
    this.timeout(() => {
      this.fsm = this.fsm.monthBlurred(this.validate.bind(this));
    });
  }

  public monthChanged(): void {
    const value = this.scope.model.month;

    if(value && value.length === 2) {
      this.scope.focusDay();
    }
  }

  public dayBlurred(): void {
    this.timeout(() => {
      this.fsm = this.fsm.dayBlurred(this.validate.bind(this));
    });
  }

  public dayChanged(): void {
    const value = this.scope.model.day;

    if(value && value.length === 2) {
      this.scope.focusYear();
    }
  }

  public yearBlurred(): void {
    this.timeout(() => {
      this.fsm = this.fsm.yearBlurred(this.validate.bind(this));
    });
  }

  public shouldShowErrors(): boolean {
    return (this.scope.context && this.scope.context.shouldShowErrors()) || this.fsm.shouldShowErrors();
  }

  private validate(): void {
    this.scope.context.validate();
  }

  public isValid(): boolean {
    return this.scope.errors ? ( this.scope.errors.length === 0 ) : true;
  }
}
