import { expect } from 'chai';
import {
  StateTerritory,
  toFullName,
  toAbbreviation,
  fromAbbreviation, toJson, fromJson,
} from '../../src/addresses/StateTerritory';

function getAllStateTerritories(): StateTerritory[] {
  const values: any[] = Object.keys(StateTerritory).map((k: any) => StateTerritory[k]);
  return values.filter(s => typeof s === 'number') as StateTerritory[];
}

describe('StateTerritory', () => {

  const allStateTerritories: StateTerritory[] = getAllStateTerritories();

  allStateTerritories.forEach(stateTerritory => {
    it(`abbreviates and resolves ${StateTerritory[stateTerritory]}`, () => {
      const maybeAbbr = toAbbreviation(stateTerritory);
      expect(maybeAbbr.hasValue()).to.be.true;
      expect(maybeAbbr.get()).to.exist;

      const maybeStateTerritory = fromAbbreviation(maybeAbbr.get());
      expect(maybeStateTerritory.hasValue()).to.be.true;
      expect(maybeStateTerritory.get()).to.eql(stateTerritory);
    });

    it(`gives the full name of ${StateTerritory[stateTerritory]}`, () => {
      const maybeName = toFullName(stateTerritory);
      expect(maybeName.hasValue()).to.be.true;
      expect(maybeName.get()).to.exist;
    });

    it(`converts ${StateTerritory[stateTerritory]} to and from json`, () => {
      const json = toJson(stateTerritory);
      expect(json).to.eql(toAbbreviation(stateTerritory).get());
      expect(fromJson(json)).to.eql(stateTerritory);
    });
  });

  context('toAbbreviation', () => {
    it('returns an empty Optional when the input could not be converted', () => {
      const invalidStateTerritory: StateTerritory = <StateTerritory>-100000;
      const maybeAbbr = toAbbreviation(invalidStateTerritory);
      expect(maybeAbbr.hasValue()).to.be.false;
    });
  });

  context('fromAbbreviation', () => {
    it('returns an empty Optional when the input could not be converted', () => {
      const maybeStateTerritory = fromAbbreviation('unknownStateAbbreviation');
      expect(maybeStateTerritory.hasValue()).to.be.false;
    });
  });

  context('toJson', () => {
    it('throws an exception when the value cannot be converted', () => {
      const invalidStateTerritory: StateTerritory = <StateTerritory>-100000;
      expect(() => toJson(invalidStateTerritory)).to.throw(Error);
    });
  });

  context('fromJson', () => {
    it('throws an exception when the value cannot be converted', () => {
      expect(() => fromJson('unknown')).to.throw(Error);
    });
  });
});
