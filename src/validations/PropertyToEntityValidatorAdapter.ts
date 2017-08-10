import { IValidator } from './IValidator';
import { ValidationResult } from './ValidationResult';

export class PropertyToEntityValidatorAdapter<TEntity, TProperty, TErrors> implements IValidator<TEntity, TErrors> {
  public constructor(private valueProvider: Func<TEntity, TProperty>,
                     private errorsProvider: Func<TErrors, string[]>,
                     private validator: IValidator<TProperty, string[]>) {}

  public performValidation(entity: TEntity, result: ValidationResult<TErrors>): void {
    const propertyResult = new ValidationResult(result.valid, this.errorsProvider(result.errors));
    this.validator.performValidation(this.valueProvider(entity), propertyResult);
    result.valid = propertyResult.valid;
  }
}
