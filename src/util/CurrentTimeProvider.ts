import { ITimeProvider } from './ITimeProvider';

export class CurrentTimeProvider implements ITimeProvider {
  public now(): Date {
    return new Date();
  }
}
