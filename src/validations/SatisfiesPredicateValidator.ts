import { IValidator } from './IValidator';
import { ValidationResult } from './ValidationResult';

export class SatisfiesPredicateValidator<TValue, TError, TAccumulation> implements IValidator<TValue, TAccumulation> {
  private error: TError;
  private predicate: Predicate<TValue>;
  private accumulator: Accumulator<TAccumulation, TError>;

  public constructor(predicate: Predicate<TValue>, error: TError, accumulator: Accumulator<TAccumulation, TError>) {
    this.predicate = predicate;
    this.error = error;
    this.accumulator = accumulator;
  }

  public performValidation(value: TValue, result: ValidationResult<TAccumulation>): void {
    if(!this.predicate(value)) {
      result.valid = false;
      this.accumulator(result.errors, this.error);
    }
  }
}
