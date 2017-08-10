type ConstructorModifier = (target: Function) => void;
type MethodModifier = (target: Function, propertyKey: string, descriptor: PropertyDescriptor) => void;

export function Inject(...dependencyNames: string[]): ConstructorModifier {
  return (target: Function) => {
    const arity = target.length;
    const numberOfInjectedDependencies = dependencyNames.length;
    if(arity !== numberOfInjectedDependencies) {
      throw new Error(`The \`${(target as any).name}\` constructor arity (${arity}) does not match the number of injected arguments (${numberOfInjectedDependencies}).`);
    }

    target.$inject = dependencyNames;
  };
}

export function InjectStatic(...dependencyNames: string[]): MethodModifier {
  return (target: Function, propertyKey: string, descriptor: PropertyDescriptor): void => {
    const arity = descriptor.value.length;
    const numberOfInjectedDependencies = dependencyNames.length;
    if(arity !== numberOfInjectedDependencies) {
      throw new Error(`The \`${(target as any).name}#${propertyKey}\` arity (${arity}) does not match the number of injected arguments (${numberOfInjectedDependencies}).`);
    }

    descriptor.value.$inject = dependencyNames;
  };
}
