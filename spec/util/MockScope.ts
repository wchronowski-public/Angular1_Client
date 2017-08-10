import { expect } from 'chai';

export class MockScope {
  public wasDigested = false;

  public $digest(): void {
    this.wasDigested = true;
  }

  public verifyWasDigested(): void {
    expect(this.wasDigested).to.equal(true);
  }
}
