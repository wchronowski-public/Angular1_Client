export class ValidationResult<TAccumulation> {
  public static success<TAccumulation>(errors: TAccumulation): ValidationResult<TAccumulation> {
    return new ValidationResult(true, errors);
  }

  public constructor(public valid: boolean, public errors: TAccumulation) {}
}
