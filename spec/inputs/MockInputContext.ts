import { expect } from 'chai';
import { IInputContext } from '../../src/inputs/IInputContext';

export class MockInputContext implements IInputContext {
  private stubbedShouldShowErrors: boolean;
  private wasValidated = false;

  public shouldShowErrors(): boolean {
    return this.stubbedShouldShowErrors;
  }

  public stubbedToShowErrors(): this {
    this.stubbedShouldShowErrors = true;
    return this;
  }

  public stubbedToNotShowErrors(): this {
    this.stubbedShouldShowErrors = false;
    return this;
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
}
