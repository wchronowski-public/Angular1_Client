import { expect } from 'chai';
import { MockInputContext } from '../MockInputContext';
import { DateInputController } from '../../../src/inputs/date/DateInputController';
import { IDateInputErrorDisplayFsm } from '../../../src/inputs/date/DateInputErrorDisplayFsm';
import { IInputContext } from '../../../src/inputs/IInputContext';
import { DateInput } from '../../../src/inputs/date/DateInput';
import { ValidateCallback } from '../../../src/inputs/date/IDateInputErrorDisplayState';
import { MockDateInputScope } from './MockDateInputScope';

interface IDateInputControllerOverrides {
  model?: DateInput;
  context?: IInputContext;
  forceInputContextToBeNull?: boolean;
  timeout?: (f: () => void) => void;
  fsm?: IDateInputErrorDisplayFsm;
  errors?: string[];
}

class MockDateInputErrorDisplayFsm implements IDateInputErrorDisplayFsm {
  private showErrors = false;
  private monthBlurredWasCalled = false;
  public monthBlurredCallback: ValidateCallback;
  private dayBlurredWasCalled = false;
  public dayBlurredCallback: ValidateCallback;
  private yearBlurredWasCalled = false;
  public yearBlurredCallback: ValidateCallback;

  public shouldShowErrors(): boolean {
    return this.showErrors;
  }

  public monthBlurred(callback: ValidateCallback): IDateInputErrorDisplayFsm {
    this.monthBlurredWasCalled = true;
    this.monthBlurredCallback = callback;
    return this;
  }

  public dayBlurred(callback: ValidateCallback): IDateInputErrorDisplayFsm {
    this.dayBlurredWasCalled = true;
    this.dayBlurredCallback = callback;
    return this;
  }

  public yearBlurred(callback: ValidateCallback): IDateInputErrorDisplayFsm {
    this.yearBlurredWasCalled = true;
    this.yearBlurredCallback = callback;
    return this;
  }

  public stubbedToNotShowErrors(): MockDateInputErrorDisplayFsm {
    this.showErrors = false;
    return this;
  }

  public stubbedToShowErrors(): MockDateInputErrorDisplayFsm {
    this.showErrors = true;
    return this;
  }

  public verifyMonthBlurredWasNotCalled(): void {
    expect(this.monthBlurredWasCalled).to.be.false;
  }

  public verifyMonthBlurredWasCalled(): void {
    expect(this.monthBlurredWasCalled).to.be.true;
  }

  public verifyDayBlurredWasNotCalled(): void {
    expect(this.dayBlurredWasCalled).to.be.false;
  }

  public verifyDayBlurredWasCalled(): void {
    expect(this.dayBlurredWasCalled).to.be.true;
  }

  public verifyYearBlurredWasNotCalled(): void {
    expect(this.yearBlurredWasCalled).to.be.false;
  }

  public verifyYearBlurredWasCalled(): void {
    expect(this.yearBlurredWasCalled).to.be.true;
  }
}

function buildDateInputController(overrides: IDateInputControllerOverrides = {}): DateInputController {
  const model = overrides.hasOwnProperty('model') ? overrides.model : new DateInput();
  const context = overrides.forceInputContextToBeNull ? null : overrides.context || new MockInputContext();
  const timeout = overrides.timeout || ((f: () => void) => { f(); });
  const errors = overrides.errors || undefined;
  const scope = { model, context, errors, focusDay: () => {}, focusYear: () => {} };
  const input = new DateInputController(scope, timeout);
  if(overrides.fsm) {
    input.fsm = overrides.fsm;
  }
  return input;
}

describe('DateInputController', () => {
  it('does not show errors when neither the context or the fsm are showing errors', () => {
    const context = new MockInputContext().stubbedToNotShowErrors();
    const fsm = new MockDateInputErrorDisplayFsm().stubbedToNotShowErrors();
    const input = buildDateInputController({ context, fsm });

    expect(input.shouldShowErrors()).to.equal(false);
  });

  it('shows errors when the context is showing errors', () => {
    const context = new MockInputContext().stubbedToShowErrors();
    const fsm = new MockDateInputErrorDisplayFsm().stubbedToNotShowErrors();
    const input = buildDateInputController({ context, fsm });

    expect(input.shouldShowErrors()).to.equal(true);
  });

  it('shows errors when the fsm is showing errors', () => {
    const context = new MockInputContext().stubbedToNotShowErrors();
    const fsm = new MockDateInputErrorDisplayFsm().stubbedToShowErrors();
    const input = buildDateInputController({ context, fsm });

    expect(input.shouldShowErrors()).to.equal(true);
  });

  it('notifies the fsm when month blurred within a timeout', () => {
    let executeDelayedAction = () => {};
    const timeout = (f: () => void) => {
      executeDelayedAction = f;
    };
    const context = new MockInputContext();
    const fsm = new MockDateInputErrorDisplayFsm();
    const input = buildDateInputController({ timeout, fsm, context });

    input.monthBlurred();

    fsm.verifyMonthBlurredWasNotCalled();
    executeDelayedAction();
    fsm.verifyMonthBlurredWasCalled();
    fsm.monthBlurredCallback();
    context.verifyWasValidated();
  });

  it('notifies the fsm when day blurred within a timeout', () => {
    let executeDelayedAction = () => {};
    const timeout = (f: () => void) => {
      executeDelayedAction = f;
    };
    const context = new MockInputContext();
    const fsm = new MockDateInputErrorDisplayFsm();
    const input = buildDateInputController({ timeout, fsm, context });

    input.dayBlurred();

    fsm.verifyDayBlurredWasNotCalled();
    executeDelayedAction();
    fsm.verifyDayBlurredWasCalled();
    fsm.dayBlurredCallback();
    context.verifyWasValidated();
  });

  it('notifies the fsm when year blurred within a timeout', () => {
    let executeDelayedAction = () => {};
    const timeout = (f: () => void) => {
      executeDelayedAction = f;
    };
    const context = new MockInputContext();
    const fsm = new MockDateInputErrorDisplayFsm();
    const input = buildDateInputController({ timeout, fsm, context });

    input.yearBlurred();

    fsm.verifyYearBlurredWasNotCalled();
    executeDelayedAction();
    fsm.verifyYearBlurredWasCalled();
    fsm.yearBlurredCallback();
    context.verifyWasValidated();
  });

  it('is valid when it has undefined errors', () => {
    const errors: string[] = undefined;
    const input = buildDateInputController({ errors });

    expect(input.isValid()).to.be.true;
  });

  it('is valid when it has null errors', () => {
    const errors: string[] = null;
    const input = buildDateInputController({ errors });

    expect(input.isValid()).to.be.true;
  });

  it('is valid when it has 0 errors', () => {
    const errors: string[] = [];
    const input = buildDateInputController({ errors });

    expect(input.isValid()).to.be.true;
  });

  it('is invalid when it has 1 error', () => {
    const errors = ['boo!'];
    const input = buildDateInputController({ errors });

    expect(input.isValid()).to.be.false;
  });

  it('is invalid when it has more than one error', () => {
    const errors = ['error', 'error2'];
    const input = buildDateInputController({ errors });

    expect(input.isValid()).to.be.false;
  });

  it('is able to hide errors even if there is no page wide validation', () => {
    const forceInputContextToBeNull = true;
    const fsm = new MockDateInputErrorDisplayFsm().stubbedToNotShowErrors();
    const input = buildDateInputController({ forceInputContextToBeNull, fsm });

    expect(input.shouldShowErrors()).to.equal(false);
  });

  it('is able to show errors even if there is no page wide validation', () => {
    const forceInputContextToBeNull = true;
    const fsm = new MockDateInputErrorDisplayFsm().stubbedToShowErrors();
    const input = buildDateInputController({ forceInputContextToBeNull, fsm });

    expect(input.shouldShowErrors()).to.equal(true);
  });

  it('does not crash when validated without an input context', () => {
    const forceInputContextToBeNull = true;
    const input = buildDateInputController({ forceInputContextToBeNull });

    input.monthBlurred();
    expect(input).to.not.be.null;
  });

  it('focuses the day input when the month is changed to a two-digit value', () => {
    const model = DateInput.fromStrings('2000', '01', '01');
    const scope = new MockDateInputScope().withModel(model);
    const controller = new DateInputController(scope, f => f());

    controller.monthChanged();

    scope.verifyDayWasFocused();
  });

  it('focuses the year input when the day is changed to a two-digit value', () => {
    const model = DateInput.fromStrings('2000', '01', '01');
    const scope = new MockDateInputScope().withModel(model);
    const controller = new DateInputController(scope, f => f());

    controller.dayChanged();

    scope.verifyYearWasFocused();
  });

  it('does not focus the day input when the model\'s month value does not exist', () => {
    const model = DateInput.fromStrings('2000', '01', '01');
    const scope = new MockDateInputScope().withModel(model);
    const controller = new DateInputController(scope, f => f());

    model.month = undefined;
    controller.monthChanged();

    scope.verifyDayWasNotFocused();
  });

  it('does not focus the year input when the model\'s day value does not exist', () => {
    const model = DateInput.fromStrings('2000', '01', '01');
    const scope = new MockDateInputScope().withModel(model);
    const controller = new DateInputController(scope, f => f());

    model.day = undefined;
    controller.dayChanged();

    scope.verifyYearWasNotFocused();
  });

  ['', '0'].forEach(value => {
    it(`does not focus the day input when the month is changed to ${value.length} digits`, () => {
      const model = DateInput.fromStrings('2000', '01', '01');
      const scope = new MockDateInputScope().withModel(model);
      const controller = new DateInputController(scope, f => f());

      model.month = value;
      controller.monthChanged();

      scope.verifyDayWasNotFocused();
    });

    it(`does not focus the year input when the day is changed to ${value.length} digits`, () => {
      const model = DateInput.fromStrings('2000', '01', '01');
      const scope = new MockDateInputScope().withModel(model);
      const controller = new DateInputController(scope, f => f());

      model.day = value;
      controller.dayChanged();

      scope.verifyYearWasNotFocused();
    });
  });

  it('is not showing the datepicker by default', () => {
    const model = DateInput.fromStrings('2000', '01', '01');
    const scope = new MockDateInputScope().withModel(model);
    const controller = new DateInputController(scope, f => f());

    expect(controller.shouldShowDatepicker()).to.equal(false);
  });

  it('shows toggles the datepicker when the calendar icon is clicked', () => {
    const model = DateInput.fromStrings('2000', '01', '01');
    const scope = new MockDateInputScope().withModel(model);
    const controller = new DateInputController(scope, f => f());

    expect(controller.shouldShowDatepicker()).to.equal(false);
    controller.calendarIconClicked();
    expect(controller.shouldShowDatepicker()).to.equal(true);
    controller.calendarIconClicked();
    expect(controller.shouldShowDatepicker()).to.equal(false);
  });

  it('is not showing the datepicker by default', () => {
    const model = DateInput.fromStrings('2000', '01', '01');
    const scope = new MockDateInputScope().withModel(model);
    const controller = new DateInputController(scope, f => f());

    expect(controller.shouldShowDatepicker()).to.equal(false);
  });

  it('toggles the datepicker when the calendar icon is clicked', () => {
    const model = DateInput.fromStrings('2000', '01', '01');
    const scope = new MockDateInputScope().withModel(model);
    const controller = new DateInputController(scope, f => f());

    expect(controller.shouldShowDatepicker()).to.equal(false);

    controller.calendarIconClicked();
    expect(controller.shouldShowDatepicker()).to.equal(true);

    controller.calendarIconClicked();
    expect(controller.shouldShowDatepicker()).to.equal(false);
  });

  it('closes the datepicker when a date is chosen', () => {
    const model = DateInput.fromStrings('2000', '01', '01');
    const scope = new MockDateInputScope().withModel(model);
    const controller = new DateInputController(scope, f => f());

    expect(controller.shouldShowDatepicker()).to.equal(false);

    controller.calendarIconClicked();
    expect(controller.shouldShowDatepicker()).to.equal(true);

    controller.dateChosenWithDatepicker();
    expect(controller.shouldShowDatepicker()).to.equal(false);
  });

  it('closes the datepicker when the document is clicked', () => {
    const model = DateInput.fromStrings('2000', '01', '01');
    const scope = new MockDateInputScope().withModel(model);
    const controller = new DateInputController(scope, f => f());

    expect(controller.shouldShowDatepicker()).to.equal(false);

    controller.calendarIconClicked();
    expect(controller.shouldShowDatepicker()).to.equal(true);

    controller.documentClicked();
    expect(controller.shouldShowDatepicker()).to.equal(false);
  });
});
