import { ValidateCallback } from '../../../src/inputs/date/IDateInputErrorDisplayState';

export class MockValidateCallback {
  public wasValidated = false;

  public getCallback(): () => ValidateCallback {
    return this.validate.bind(this);
  }

  public validate(): void {
    this.wasValidated = true;
  }
}
