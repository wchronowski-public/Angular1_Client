import { expect } from 'chai';
import { IInputErrorDisplayFSM } from '../../../src/inputs/errors/IInputErrorDisplayFSM';
import { IInput } from '../../../src/inputs/IInput';

export class MockInputErrorDisplayFSM implements IInputErrorDisplayFSM {
  private stubbedShouldShowErrorsValue: boolean;
  private changedWasCalled: boolean;
  private changedInputArgument: IInput;
  private blurredWasCalled: boolean;
  private blurredInputArgument: IInput;

  public constructor(stubbedShouldShowErrorsValue = false,
                     changedWasCalled = false,
                     changedInputArgument: IInput = undefined,
                     blurredWasCalled = false,
                     blurredInputArgument: IInput = undefined) {
    this.stubbedShouldShowErrorsValue = stubbedShouldShowErrorsValue;
    this.changedWasCalled = changedWasCalled;
    this.changedInputArgument = changedInputArgument;
    this.blurredWasCalled = blurredWasCalled;
    this.blurredInputArgument = blurredInputArgument;
  }

  public changed(input: IInput): IInputErrorDisplayFSM {
    return new MockInputErrorDisplayFSM(
      this.stubbedShouldShowErrorsValue,
      true,
      input,
      this.blurredWasCalled,
      this.blurredInputArgument
    );
  }

  public blurred(input: IInput): IInputErrorDisplayFSM {
    return new MockInputErrorDisplayFSM(
      this.stubbedShouldShowErrorsValue,
      this.changedWasCalled,
      this.changedInputArgument,
      true,
      input
    );
  }

  public shouldShowErrors(): boolean {
    return this.stubbedShouldShowErrorsValue;
  }

  public stubbedToShowErrors(): MockInputErrorDisplayFSM {
    return new MockInputErrorDisplayFSM(
      true,
      this.changedWasCalled,
      this.changedInputArgument,
      this.blurredWasCalled,
      this.blurredInputArgument
    );
  }

  public stubbedToNotShowErrors(): MockInputErrorDisplayFSM {
    return new MockInputErrorDisplayFSM(
      false,
      this.changedWasCalled,
      this.changedInputArgument,
      this.blurredWasCalled,
      this.blurredInputArgument
    );
  }

  public verifyChangedWasCalledWith(input: IInput): void {
    expect(this.changedWasCalled).to.equal(true);
    expect(this.changedInputArgument).to.equal(input);
  }

  public verifyChangedWasNotCalled(): void {
    expect(this.changedWasCalled).to.equal(false);
  }

  public verifyBlurredWasCalledWith(input: IInput): void {
    expect(this.blurredWasCalled).to.equal(true);
    expect(this.blurredInputArgument).to.equal(input);
  }

  public verifyBlurredWasNotCalled(): void {
    expect(this.blurredWasCalled).to.equal(false);
  }
}
