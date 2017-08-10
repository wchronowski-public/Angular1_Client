import { expect } from 'chai';
import { IInput } from '../../src/inputs/IInput';

export class MockInput implements IInput {
  private wasValidated = false;
  private stubbedHasValue = false;
  private shouldShowErrorsValue = false;

  public blurred(): void {}
  public changed(): void {}

  public hasValue(): boolean {
    return this.stubbedHasValue;
  }

  public isValid(): boolean {
    return true;
  }

  public shouldShowErrors(): boolean {
    return this.shouldShowErrorsValue;
  }

  public validate(): void {
    this.wasValidated = true;
  }

  public verifyWasValidated(): void {
    expect(this.wasValidated).to.equal(true);
  }

  public verifyWasNotValidated(): void {
    expect(this.wasValidated).to.equal(false);
  }

  public stubbedToHaveValue(): this {
    this.stubbedHasValue = true;
    return this;
  }

  public stubbedToNotHaveValue(): this {
    this.stubbedHasValue = false;
    return this;
  }
}
