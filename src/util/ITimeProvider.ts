export const TIME_PROVIDER = 'timeProvider';

export interface ITimeProvider {
  now(): Date;
}
