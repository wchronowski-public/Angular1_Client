import { expect } from 'chai';
import { Optional, Some, None } from '../../src/util/Optional';

function maybeToString(n: number): Optional<string> {
  return Optional.of(n.toString());
}

describe('Optional', () => {
  it('returns some value when present', () => {
    const result = Optional.of(42);
    expect(result).to.be.an.instanceOf(Some);
    expect(result.getOrElse(0)).to.equal(42);
  });

  it('returns none when the value is null', () => {
    const result = Optional.of(null);
    expect(result).to.be.an.instanceOf(None);
  });

  it('returns none when the value is undefined', () => {
    const result = Optional.of(undefined);
    expect(result).to.be.an.instanceOf(None);
  });
});

describe('Some', () => {
  it('returns the result of applying an optional-producing function with its value', () => {
    const result = Optional.of(42).flatMap(maybeToString);
    expect(result.get()).to.equal('42');
  });

  it('returns a new optional with a value-producing function applied to the value', () => {
    const result = Optional.of(42).map(n => n.toString());
    expect(result.get()).to.equal('42');
  });

  it('returns null wrapped in an instance of some when the value-producing function returns null', () => {
    const result = Optional.of(42).map(_ => null);
    expect(result.get()).to.equal(null);
  });

  it('returns the value when no default is provided', () => {
    const result = Optional.of(42).flatMap(maybeToString);
    expect(result.get()).to.equal('42');
  });

  it('has a value', () => {
    expect(Optional.of(42).hasValue()).to.equal(true);
  });
});

describe('None', () => {
  it('returns none when applying an optional-producing function', () => {
    const result = Optional.none<number>().flatMap(maybeToString);
    expect(result.getOrElse('nothing')).to.equal('nothing');
  });

  it('returns none when applying a value-production function', () => {
    const result = Optional.none<string>().map(n => n.toString());
    expect(result.getOrElse('nothing')).to.equal('nothing');
  });

  it('throws an exception when getting the value with no default', () => {
    const result = Optional.none<number>().flatMap(maybeToString);
    expect(() => result.get()).to.throw(Error);
  });

  it('does not have a value', () => {
    expect(Optional.none().hasValue()).to.equal(false);
  });
});
