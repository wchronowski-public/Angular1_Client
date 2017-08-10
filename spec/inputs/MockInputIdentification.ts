import { expect } from 'chai';
import { IInputIdentification } from '../../src/inputs/IInputIdentification';

export class MockInputIdentification implements IInputIdentification {
  private id: string;
  private value: string;
  private toIdCalled = false;

  public toId(value: string): string {
    this.value = value;
    this.toIdCalled = true;
    return this.id;
  }

  public stubbedToIdReturns(id: string): this {
    this.id = id;
    return this;
  }

  public verifyToIdCalled(value: string): void {
   expect(this.value).to.be.eql(value);
   expect(this.toIdCalled).to.be.true;
  };
};
