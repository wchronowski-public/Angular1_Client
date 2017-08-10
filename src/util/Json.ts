interface IJsonArray extends Array<JsonValue> {}

type JsonValue = string
               | number
               | boolean
               | JsonObject
               | IJsonArray;

export type JsonObject = { [key: string]: JsonValue };

function values(o: { [key: string]: any }): any[] {
  return Object.keys(o).map(key => o[key]);
}

export function present<T>(t: T | null | undefined): t is T {
  return t !== undefined
      && t !== null;
}

export function applyOrNull<T, R>(t: T, f: Func<T, R>): R {
  return present(t) ? f(t) : null;
}

export function applyOrUndefined<T, R>(t: T, f: Func<T, R>): R {
  return present(t) ? f(t) : undefined;
}

export function valueOrNull<T>(t: T): T {
  return present(t) ? t : null;
}

export function valueOrUndefined<T>(t: T): T {
  return present(t) ? t : undefined;
}

export function nonePresent<T>(...ts: T[]): boolean {
  return ts.every(t => !present(t));
}

export function somePresent<T>(...ts: T[]): boolean {
  return ts.some(t => present(t));
}

export function noPropertiesHaveValue(o: { [key: string]: any }): boolean {
  return nonePresent(...values(o));
}

export function anyPropertyHasValue(o: { [key: string]: any }): boolean {
  return somePresent(...values(o));
}

export function presentAndAnyPropertyHasValue(o: { [key: string]: any }): boolean {
  return present(o) && anyPropertyHasValue(o);
}

export function iso8601Date(date: Date): string {
  return date.toISOString().split('T')[0];
}
