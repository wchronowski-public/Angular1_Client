import { expect } from 'chai';
import { IInputContext } from '../../../src/inputs/IInputContext';
import { CheckboxInputController } from '../../../src/inputs/checkbox/CheckboxInputController';
import { MockInputContext } from '../MockInputContext';
import { InputErrorDisplayFSM } from '../../../src/inputs/errors/InputErrorDisplayFSM';
import { IInputErrorDisplayFSM } from '../../../src/inputs/errors/IInputErrorDisplayFSM';
import { MockInputErrorDisplayFSM } from '../errors/MockInputErrorDisplayFSM';

interface ICheckboxOverrides {
  model?: boolean;
  context?: IInputContext;
  forceInputContextToBeNull?: boolean;
  onChange?: () => void;
  timeout?: (f: () => void) => void;
  fsm?: IInputErrorDisplayFSM;
  errors?: string[];
}

function buildCheckboxInput(overrides: ICheckboxOverrides = {}): CheckboxInputController {
  const model = overrides.hasOwnProperty('model') ? overrides.model : false;
  const context = overrides.forceInputContextToBeNull ? null : overrides.context || new MockInputContext();
  const onChange = overrides.onChange || (() => {});
  const timeout = overrides.timeout || ((f: () => void) => { f(); });
  const errors = overrides.errors || undefined;
  const scope = { model, context, onChange, errors };
  const input = new CheckboxInputController(scope, timeout);
  if(overrides.fsm) {
    input.fsm = overrides.fsm;
  }
  return input;
}

describe('CheckboxInputController', () => {
  it('initializes with a default error display fsm', () => {
    const input = buildCheckboxInput();
    expect(input.fsm).to.be.an.instanceOf(InputErrorDisplayFSM);
  });

  it('does not show errors when neither the context or the fsm are showing errors', () => {
    const context = new MockInputContext().stubbedToNotShowErrors();
    const fsm = new MockInputErrorDisplayFSM().stubbedToNotShowErrors();
    const input = buildCheckboxInput({ context, fsm });

    expect(input.shouldShowErrors()).to.equal(false);
  });

  it('shows errors when the context is showing errors', () => {
    const context = new MockInputContext().stubbedToShowErrors();
    const fsm = new MockInputErrorDisplayFSM().stubbedToNotShowErrors();
    const input = buildCheckboxInput({ context, fsm });

    expect(input.shouldShowErrors()).to.equal(true);
  });

  it('shows errors when the fsm is showing errors', () => {
    const context = new MockInputContext().stubbedToNotShowErrors();
    const fsm = new MockInputErrorDisplayFSM().stubbedToShowErrors();
    const input = buildCheckboxInput({ context, fsm });

    expect(input.shouldShowErrors()).to.equal(true);
  });

  it('notifies the fsm when changed within a timeout', () => {
    let executeDelayedAction = () => {};
    const timeout = (f: () => void) => {
      executeDelayedAction = f;
    };
    const fsm = new MockInputErrorDisplayFSM();
    const input = buildCheckboxInput({ timeout, fsm });

    input.changed();

    (input.fsm as MockInputErrorDisplayFSM).verifyChangedWasNotCalled();
    executeDelayedAction();
    (input.fsm as MockInputErrorDisplayFSM).verifyChangedWasCalledWith(input);
  });

  it('executes the onChange callback when changed within a timeout', () => {
    let callbackWasExecuted = false;
    let executeDelayedAction = () => {};
    const timeout = (f: () => void) => {
      executeDelayedAction = f;
    };
    const onChange = () => {
      callbackWasExecuted = true;
    };

    const input = buildCheckboxInput({ timeout, onChange });

    input.changed();

    expect(callbackWasExecuted).to.equal(false);
    executeDelayedAction();
    expect(callbackWasExecuted).to.equal(true);
  });

  it('notifies the fsm when blurred within a timeout', () => {
    let executeDelayedAction = () => {};
    const timeout = (f: () => void) => {
      executeDelayedAction = f;
    };
    const fsm = new MockInputErrorDisplayFSM();
    const input = buildCheckboxInput({ timeout, fsm });

    input.blurred();

    (input.fsm as MockInputErrorDisplayFSM).verifyBlurredWasNotCalled();
    executeDelayedAction();
    (input.fsm as MockInputErrorDisplayFSM).verifyBlurredWasCalledWith(input);
  });

  it('always has a value', () => {
    const input = buildCheckboxInput();
    expect(input.hasValue()).to.equal(true);
  });

  it('validates its parent context', () => {
    const context = new MockInputContext();
    const input = buildCheckboxInput({ context });

    input.validate();

    context.verifyWasValidated();
  });

  it('is valid when it has undefined errors', () => {
    const errors: string[] = undefined;
    const input = buildCheckboxInput({ errors });

    expect(input.isValid()).to.be.true;
  });

  it('is valid when it has null errors', () => {
    const errors: string[] = null;
    const input = buildCheckboxInput({ errors });

    expect(input.isValid()).to.be.true;
  });

  it('is valid when it has 0 errors', () => {
    const errors: string[] = [];
    const input = buildCheckboxInput({ errors });

    expect(input.isValid()).to.be.true;
  });

  it('is invalid when it has 1 error', () => {
    const errors = ['boo!'];
    const input = buildCheckboxInput({ errors });

    expect(input.isValid()).to.be.false;
  });

  it('is invalid when it has more than one error', () => {
    const errors = ['error', 'error2'];
    const input = buildCheckboxInput({ errors });

    expect(input.isValid()).to.be.false;
  });

  it('is able to hide errors even if there is no page wide validation', () => {
    const forceInputContextToBeNull = true;
    const fsm = new MockInputErrorDisplayFSM().stubbedToNotShowErrors();
    const input = buildCheckboxInput({ forceInputContextToBeNull, fsm });

    expect(input.shouldShowErrors()).to.equal(false);
  });

  it('is able to show errors even if there is no page wide validation', () => {
    const forceInputContextToBeNull = true;
    const fsm = new MockInputErrorDisplayFSM().stubbedToShowErrors();
    const input = buildCheckboxInput({ forceInputContextToBeNull, fsm });

    expect(input.shouldShowErrors()).to.equal(true);
  });

  it('does not crash when validated without an input context', () => {
    const forceInputContextToBeNull = true;
    const input = buildCheckboxInput({ forceInputContextToBeNull });

    input.validate();
    expect(input).to.not.be.null;
  });
});
