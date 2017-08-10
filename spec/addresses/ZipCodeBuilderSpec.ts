import { expect } from 'chai';
import { ZipCodeBuilder } from '../../src/addresses/ZipCodeBuilder';

describe('ZipCodeBuilder', () => {
  it('builds empty zip codes', () => {
    const zipCode = new ZipCodeBuilder().build();

    expect(zipCode).to.eql({
      baseValue: null,
      extendedValue: null,
    });
  });

  it('populates data from existing zip codes', () => {
    const existingZipCode = {
      baseValue: '0',
      extendedValue: '1',
    };

    const zipCode = new ZipCodeBuilder(existingZipCode).build();

    expect(zipCode).to.eql(existingZipCode);
  });

  it('sets the base value', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('123')
      .build();

    expect(zipCode.baseValue).to.equal('123');
  });

  it('sets the extended value', () => {
    const zipCode = new ZipCodeBuilder()
      .setExtendedValue('123')
      .build();

    expect(zipCode.extendedValue).to.equal('123');
  });
});
