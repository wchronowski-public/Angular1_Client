import { expect } from 'chai';
import { IInputContext } from '../../../src/inputs/IInputContext';
import { ToggleInputController } from '../../../src/inputs/toggle/ToggleInputController';
import { MockInputContext } from '../MockInputContext';
import { InputErrorDisplayFSM } from '../../../src/inputs/errors/InputErrorDisplayFSM';
import { IInputErrorDisplayFSM } from '../../../src/inputs/errors/IInputErrorDisplayFSM';
import { MockInputErrorDisplayFSM } from '../errors/MockInputErrorDisplayFSM';

interface IToggleOverrides<T> {
  model?: T;
  context?: IInputContext;
  forceInputContextToBeNull?: boolean;
  onChange?: () => void;
  timeout?: (f: () => void) => void;
  fsm?: IInputErrorDisplayFSM;
  errors?: string[];
}

function buildToggleInput<T>(overrides: IToggleOverrides<T> = {}): ToggleInputController<T> {
  const model = overrides.hasOwnProperty('model') ? overrides.model : undefined;
  const context = overrides.forceInputContextToBeNull ? null : overrides.context || new MockInputContext();
  const onChange = overrides.onChange || (() => {});
  const timeout = overrides.timeout || ((f: () => void) => { f(); });
  const errors = overrides.errors || undefined;
  const scope = { model, context, onChange, errors };
  const input = new ToggleInputController<T>(scope, timeout);

  if(overrides.fsm) {
    input.fsm = overrides.fsm;
  }
  return input;
}

describe('ToggleInputController', () => {
  it('initializes with a default error display fsm', () => {
    const input = buildToggleInput();
    expect(input.fsm).to.be.an.instanceOf(InputErrorDisplayFSM);
  });

  it('does not show errors when neither the context or the fsm are showing errors', () => {
    const context = new MockInputContext().stubbedToNotShowErrors();
    const fsm = new MockInputErrorDisplayFSM().stubbedToNotShowErrors();
    const input = buildToggleInput({ context, fsm });

    expect(input.shouldShowErrors()).to.equal(false);
  });

  it('shows errors when the context is showing errors', () => {
    const context = new MockInputContext().stubbedToShowErrors();
    const fsm = new MockInputErrorDisplayFSM().stubbedToNotShowErrors();
    const input = buildToggleInput({ context, fsm });

    expect(input.shouldShowErrors()).to.equal(true);
  });

  it('shows errors when the fsm is showing errors', () => {
    const context = new MockInputContext().stubbedToNotShowErrors();
    const fsm = new MockInputErrorDisplayFSM().stubbedToShowErrors();
    const input = buildToggleInput({ context, fsm });

    expect(input.shouldShowErrors()).to.equal(true);
  });

  it('notifies the fsm when changed within a timeout', () => {
    let executeDelayedAction = () => {};
    const timeout = (f: () => void) => {
      executeDelayedAction = f;
    };
    const fsm = new MockInputErrorDisplayFSM();
    const input = buildToggleInput({ timeout, fsm });

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

    const input = buildToggleInput({ timeout, onChange });

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
    const input = buildToggleInput({ timeout, fsm });

    input.blurred();

    (input.fsm as MockInputErrorDisplayFSM).verifyBlurredWasNotCalled();
    executeDelayedAction();
    (input.fsm as MockInputErrorDisplayFSM).verifyBlurredWasCalledWith(input);
  });

  it('does not have a value when the model is undefined', () => {
    const model: string = undefined;
    const input = buildToggleInput({ model });

    expect(input.hasValue()).to.equal(false);
  });

  it('does not have a value when the model is null', () => {
    const model: string = null;
    const input = buildToggleInput({ model });

    expect(input.hasValue()).to.equal(false);
  });

  it('does not have a value when the model is empty string', () => {
    const model = '';
    const input = buildToggleInput({ model });

    expect(input.hasValue()).to.equal(false);
  });

  it('has a value when the model is 0', () => {
    const model = 0;
    const input = buildToggleInput({ model });

    expect(input.hasValue()).to.equal(true);
  });

  it('has a value when the model is some object', () => {
    const model = {};
    const input = buildToggleInput({ model });

    expect(input.hasValue()).to.equal(true);
  });

  it('has a value when the model is a non-empty string', () => {
    const model = 'foo';
    const input = buildToggleInput({ model });

    expect(input.hasValue()).to.equal(true);
  });

  it('validates its parent context', () => {
    const context = new MockInputContext();
    const input = buildToggleInput({ context });

    input.validate();

    context.verifyWasValidated();
  });

  it('is valid when it has null errors', () => {
    const errors: string[] = null;
    const input = buildToggleInput({ errors });

    expect(input.isValid()).to.be.true;
  });

  it('is valid when it has 0 errors', () => {
    const errors: string[] = [];
    const input = buildToggleInput({ errors });

    expect(input.isValid()).to.be.true;
  });

  it('is invalid when it has 1 error', () => {
    const errors = ['boo!'];
    const input = buildToggleInput({ errors });

    expect(input.isValid()).to.be.false;
  });

  it('is invalid when it has more than one error', () => {
    const errors = ['error', 'error2'];
    const input = buildToggleInput({ errors });

    expect(input.isValid()).to.be.false;
  });

  it('is able to hide errors even if there is no page wide validation', () => {
    const forceInputContextToBeNull = true;
    const fsm = new MockInputErrorDisplayFSM().stubbedToNotShowErrors();
    const input = buildToggleInput({ forceInputContextToBeNull, fsm });

    expect(input.shouldShowErrors()).to.equal(false);
  });

  it('is able to show errors even if there is no page wide validation', () => {
    const forceInputContextToBeNull = true;
    const fsm = new MockInputErrorDisplayFSM().stubbedToShowErrors();
    const input = buildToggleInput({ forceInputContextToBeNull, fsm });

    expect(input.shouldShowErrors()).to.equal(true);
  });

  it('does not crash when validated without an input context', () => {
    const forceInputContextToBeNull = true;
    const input = buildToggleInput({ forceInputContextToBeNull });

    input.validate();
    expect(input).to.not.be.null;
  });
});
