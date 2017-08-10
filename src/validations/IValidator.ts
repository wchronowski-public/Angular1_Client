import { ValidationResult } from './ValidationResult';

export interface IValidator<TValue, TAccumulation> {
  performValidation(value: TValue, result: ValidationResult<TAccumulation>): void;
}
