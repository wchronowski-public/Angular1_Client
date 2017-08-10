import { ITimeProvider } from '../../src/util/ITimeProvider';

export class MockTimeProvider implements ITimeProvider {
  private stubbedTimes: Date[];

  public now(): Date {
    return this.stubbedTimes.shift();
  }

  public withNowStubbedToReturn(...times: Date[]): this {
    this.stubbedTimes = times;
    return this;
  }
}
