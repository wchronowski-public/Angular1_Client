import { IValidator } from './IValidator';
import { ValidationBuilder } from './ValidationBuilder';
import { ConditionalValidator } from './ConditionalValidator';
import { CompositeValidator } from './CompositeValidator';

export class ConditionalContext<TEntity, TErrors> {
  private validators: IValidator<TEntity, TErrors>[] = [];

  public constructor(private predicate: Predicate<TEntity>) {}

  public rulesFor<TProperty>(propertyProvider: Func<TEntity, TProperty>,
                             errorsProvider: Func<TErrors, string[]>,
                             setup: Func<ValidationBuilder<TEntity, TProperty, TErrors>, void>): void {
    const builder = new ValidationBuilder(propertyProvider, errorsProvider);
    setup(builder);
    this.validators.push(new ConditionalValidator(this.predicate, builder.build()));
  }

  public build(): IValidator<TEntity, TErrors> {
    return new CompositeValidator(...this.validators);
  }
}
