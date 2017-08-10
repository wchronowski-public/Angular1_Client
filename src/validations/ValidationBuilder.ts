import { IValidator } from './IValidator';
import { PropertyToEntityValidatorAdapter } from './PropertyToEntityValidatorAdapter';
import { ConditionalValidator } from './ConditionalValidator';
import { CompositeValidator } from './CompositeValidator';
import { SatisfiesPredicateValidator } from './SatisfiesPredicateValidator';

export class ValidationBuilder<TEntity, TProperty, TErrors> {
  private validators: IValidator<TEntity, TErrors>[] = [];

  public constructor(private valueProvider: Func<TEntity, TProperty>,
                     private errorsProvider: Func<TErrors, string[]>) {}

  public validate(predicate: Predicate<TProperty>, error: string): void {
    const validator = new SatisfiesPredicateValidator<TProperty, string, string[]>(predicate, error, (errors, error) => errors.push(error));
    this.validatePropertyUsing(validator);
  }

  public validatePropertyUsing(validator: IValidator<TProperty, string[]>): void {
    const adapter = new PropertyToEntityValidatorAdapter(this.valueProvider, this.errorsProvider, validator);
    this.validators.push(adapter);
  }

  public whenEntity(predicate: Predicate<TEntity>, setup: Func<ValidationBuilder<TEntity, TProperty, TErrors>, void>): void {
    const builder = new ValidationBuilder(this.valueProvider, this.errorsProvider);
    setup(builder);
    const validator = new ConditionalValidator(predicate, builder.build());
    this.validators.push(validator);
  }

  public whenProperty(predicate: Predicate<TProperty>, setup: Func<ValidationBuilder<TEntity, TProperty, TErrors>, void>): void {
    this.whenEntity(entity => predicate(this.valueProvider(entity)), setup);
  }

  public build(): IValidator<TEntity, TErrors> {
    return new CompositeValidator(...this.validators);
  }
}
