import { IValidator } from './IValidator';
import { ValidationResult } from './ValidationResult';

export class ConditionalValidator<TValue, TAccumulation> implements IValidator<TValue, TAccumulation> {
  private predicate: Predicate<TValue>;
  private validator: IValidator<TValue, TAccumulation>;

  public constructor(predicate: Predicate<TValue>, validator: IValidator<TValue, TAccumulation>) {
    this.predicate = predicate;
    this.validator = validator;
  }

  public performValidation(value: TValue, result: ValidationResult<TAccumulation>): void {
    if(this.predicate(value)) {
      this.validator.performValidation(value, result);
    }
  }
}
