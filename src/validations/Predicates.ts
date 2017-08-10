import { DateInput } from '../inputs/date/DateInput';

export function present<T>(t: T): boolean {
  return t !== undefined && t !== null;
}

export function presentWithValue<T>(s: T): boolean {
  return present(s) && (s as any) !== '';
}

export function greaterThanOrEqualTo(min: number): Predicate<number> {
  return (n: number) => n >= min;
}

export function lessThanOrEqualTo(max: number): Predicate<number> {
  return (n: number) => n <= max;
}

export function satisfiesAll<T>(...predicates: Predicate<T>[]): Predicate<T> {
  return (t: T) => predicates.reduce((result: boolean, predicate: Predicate<T>) => result && predicate(t), true);
}

export function betweenInclusive(lo: number, hi: number): Predicate<number> {
  return satisfiesAll(greaterThanOrEqualTo(lo), lessThanOrEqualTo(hi));
}

export function stringLocationDoesNotContain(substring: string, location: number): Predicate<string> {
  return (s: string): boolean => s.length < location ? true : !s.charAt(location).match(substring);
}

export function stringDoesNotContain(substring: string): Predicate<string> {
  return (s: string): boolean => !s.match(substring);
}

export function stringLength(length: number): Predicate<string> {
  return (s: string) => s && s.length === length;
}

export function propertySatisfies<TEntity, TProperty>(f: Func<TEntity, TProperty>, p: Predicate<TProperty>): Predicate<TEntity> {
  return (e: TEntity) => p(f(e));
}

export function isValidDate(input: DateInput): boolean {
  return input.hasValue() && !!input.toDate();
}

export function isNumericOrWhitespace(input: string): boolean {
  return present(input) && isNaN(+input) === false;
}

export function isIntegerOrWhitespace(input: string): boolean {
  return isNumericOrWhitespace(input) && (+input % 1 === 0);
}
