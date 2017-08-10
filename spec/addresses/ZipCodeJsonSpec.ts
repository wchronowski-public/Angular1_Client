import { expect } from 'chai';
import { ZipCodeBuilder } from '../../src/addresses/ZipCodeBuilder';
import { ZipCodeJson } from '../../src/addresses/ZipCodeJson';
import { mapZipCodeToJson, mapJsonToZipCode } from '../../src/addresses/ZipCodeJson';

describe('zip code json mapping', () => {
  it('maps zip codes to json', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('12345')
      .setExtendedValue('6789')
      .build();

    const json = mapZipCodeToJson(zipCode);

    expect(json.baseValue).to.equal('12345');
    expect(json.extendedValue).to.equal('6789');
  });

  it('maps base value json to undefined when null', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue(null)
      .setExtendedValue('6789')
      .build();

    const json = mapZipCodeToJson(zipCode);

    expect(json.baseValue).to.equal(undefined);
  });

  it('maps extended value to null when undefined', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('60000')
      .setExtendedValue(null)
      .build();

    const json = mapZipCodeToJson(zipCode);

    expect(json.extendedValue).to.equal(undefined);
  });

  it('returns undefined when all values are undefined', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue(undefined)
      .setExtendedValue(undefined)
      .build();

    const json = mapZipCodeToJson(zipCode);

    expect(json).to.equal(undefined);
  });

  it('returns undefined when all values are null', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue(null)
      .setExtendedValue(null)
      .build();

    const json = mapZipCodeToJson(zipCode);

    expect(json).to.equal(undefined);
  });

  it('returns undefined when all values are null or undefined', () => {
    const zipCodeOne = new ZipCodeBuilder()
      .setBaseValue(undefined)
      .setExtendedValue(null)
      .build();
    const zipCodeTwo = new ZipCodeBuilder()
      .setBaseValue(null)
      .setExtendedValue(undefined)
      .build();

    expect(mapZipCodeToJson(zipCodeOne)).to.equal(undefined);
    expect(mapZipCodeToJson(zipCodeTwo)).to.equal(undefined);
  });

  it('maps json to zip codes', () => {
    const json: ZipCodeJson = {
      baseValue: '12345',
      extendedValue: '6789',
    };

    const zipCode = mapJsonToZipCode(json);

    expect(zipCode.baseValue).to.equal('12345');
    expect(zipCode.extendedValue).to.equal('6789');
  });

  it('maps undefined json values to null', () => {
    const json: ZipCodeJson = {};

    const zipCode = mapJsonToZipCode(json);

    expect(zipCode.baseValue).to.equal(null);
    expect(zipCode.extendedValue).to.equal(null);
  });
});
