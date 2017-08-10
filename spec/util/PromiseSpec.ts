import { expect } from 'chai';
import { setImmediateAsync } from '../../src/util/Promise';

describe('promise utils', () => {
  context('setImmediateAsync', () => {
    it('executes the callback later', () => {
      let value = 1;
      const promise = setImmediateAsync(() => {
        value = 2;
      });

      expect(value).to.eql(1);

      return promise.then(() => {
        expect(value).to.eql(2);
      });
    });

    it('resolves the promise using the value returned by the function', () => {
      return setImmediateAsync(() => 'value').then((value) => {
        expect(value).to.eql('value');
      });
    });

    it('rejects the promise if the function throws an exception', () => {
      const error = new Error('error');
      return setImmediateAsync(() => {
        throw error;
      }).catch((e) => {
        expect(e).to.eql(error);
      });
    });
  });
});
