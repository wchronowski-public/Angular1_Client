export abstract class Optional<T> {
  public static of<T>(value: T): Optional<T> {
    return value !== undefined && value !== null
      ? new Some(value)
      : None.INSTANCE;
  }

  public static none<T>(): Optional<T> {
    return None.INSTANCE;
  }

  public abstract flatMap<R>(f: (value: T) => Optional<R>): Optional<R>;
  public abstract get(): T;
  public abstract getOrElse(value: T): T;
  public abstract hasValue(): this is Some<T>;
  public abstract map<R>(f: (value: T) => R): Optional<R>;
  public abstract mapOf<R>(f: Func<T, R>): Optional<R>;
}

export class Some<T> extends Optional<T> {
  public constructor(public value: T) {
    super();
  }

  public flatMap<R>(f: (value: T) => Optional<R>): Optional<R> {
    return f(this.value);
  }

  public get(): T {
    return this.value;
  }

  public getOrElse(_: T): T {
    return this.value;
  }

  public hasValue(): this is Some<T> {
    return true;
  }

  public map<R>(f: (value: T) => R): Optional<R> {
    return new Some(f(this.value));
  }

  public mapOf<R>(f: Func<T, R>): Optional<R> {
    return Optional.of(f(this.value));
  }
}

export class None<T> extends Optional<T> {
  public static INSTANCE = new None<any>();

  public flatMap<R>(f: (value: T) => Optional<R>): Optional<R> {
    return None.INSTANCE;
  }

  public get(): T {
    throw new Error(`Can't get a value from an instance of None`);
  }

  public getOrElse(value: T): T {
    return value;
  }

  public hasValue(): this is Some<T> {
    return false;
  }

  public map<R>(f: (value: T) => R): Optional<R> {
    return None.INSTANCE;
  }

  public mapOf<R>(f: Func<T, R>): Optional<R> {
    return None.INSTANCE;
  }
}
