import { IValidator } from './IValidator';
import { ValidationResult } from './ValidationResult';

export class CompositeValidator<TValue, TAccumulation> implements IValidator<TValue, TAccumulation> {
  private validators: IValidator<TValue, TAccumulation>[];

  public constructor(...validators: IValidator<TValue, TAccumulation>[]) {
    this.validators = validators;
  }

  public performValidation(value: TValue, result: ValidationResult<TAccumulation>): void {
    this.validators.forEach(validator => validator.performValidation(value, result));
  }
}
