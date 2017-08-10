import * as Immutable from 'immutable';
import { IValidator } from './IValidator';
import { ValidationBuilder } from './ValidationBuilder';
import { ValidationResult } from './ValidationResult';
import { CompositeValidator } from './CompositeValidator';
import { ConditionalContext } from './ConditionalContext';

export abstract class Validator<TEntity, TErrors> implements IValidator<TEntity, TErrors> {
  private validators: IValidator<TEntity, TErrors>[] = [];

  public constructor() {
    this.initializeRules();
  }

  protected abstract initializeRules(): void;

  protected when(predicate: Predicate<TEntity>, setup: Func<ConditionalContext<TEntity, TErrors>, void>): void {
    const context = new ConditionalContext(predicate);
    setup(context);
    this.validators.push(context.build());
  }

  protected rulesFor<TProperty>(propertyProvider: Func<TEntity, TProperty>,
                                errorsProvider: Func<TErrors, string[]>,
                                setup: Func<ValidationBuilder<TEntity, TProperty, TErrors>, void>): void {
    const builder = new ValidationBuilder(propertyProvider, errorsProvider);
    setup(builder);
    this.validators.push(builder.build());
  }

  public performValidation(entity: TEntity, result: ValidationResult<TErrors>): void {
    new CompositeValidator(...this.validators).performValidation(entity, result);
  }

  protected validateStartingWith(entity: TEntity, errors: TErrors): ValidationResult<TErrors> {
    const result = ValidationResult.success(errors);
    this.performValidation(entity, result);
    return result;
  }

  protected isResultValid(errors: Immutable.Map<string, any>): boolean {
    const init = true;
    const f = (result: boolean, value: any): boolean => {
      return Array.isArray(value)
        ? result && value.length === 0
        : result && this.isResultValid(Immutable.Map<string, any>(value));
    };
    return errors.reduce(f, init);
  }
}
