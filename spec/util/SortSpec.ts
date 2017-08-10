import { expect } from 'chai';
import * as sort from '../../src/util/Sort';

describe('Sort', () => {
  it('sorts by ascencing property', () => {
    const items = [2, 1, 4, 3, 5].map(value => {
      return { value };
    });

    const sorted = items.sort(sort.byProperty(x => x.value));

    expect(sorted.map(s => s.value)).to.eql([1, 2, 3, 4, 5]);
  });

  it('sorts by descending property', () => {
    const items = [2, 1, 4, 3, 5].map(value => {
      return { value };
    });

    const sorted = items.sort(sort.byProperty(x => x.value, sort.Order.Desc));

    expect(sorted.map(s => s.value)).to.eql([5, 4, 3, 2, 1]);
  });

  it('sorts by ascending identity', () => {
    const items = [2, 1, 4, 3, 5];

    const sorted = items.sort(sort.ascending());

    expect(sorted).to.eql([1, 2, 3, 4, 5]);
  });

  it('sorts by descending identity', () => {
    const items = [2, 1, 4, 3, 5];

    const sorted = items.sort(sort.descending());

    expect(sorted).to.eql([5, 4, 3, 2, 1]);
  });
});
