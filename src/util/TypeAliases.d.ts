declare type Timeout = (f: () => void) => void;
declare type Delay = (f: () => void, delay: number) => void;
declare type Func<T, R> = (t: T) => R;
declare type Predicate<T> = Func<T, boolean>;
declare type Action<T> = Func<T, void>;
declare type Accumulator<TAccumulation, TError> = (a: TAccumulation, e: TError) => void;
