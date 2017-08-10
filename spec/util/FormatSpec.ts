import { ZipCodeBuilder } from './../../src/addresses/ZipCodeBuilder';
import { expect } from 'chai';
import * as format from '../../src/util/Format';

describe('format.utcDate', () => {
  it('formats a date in UTC time', () => {
    const date = new Date(Date.UTC(2016, 9, 15, 0, 0, 0, 0));
    expect(format.utcDate(date)).to.eq('10/15/2016');
  });

  it('returns an empty string for an undefined date', () => {
    expect(format.utcDate(undefined)).to.eq('');
  });

  it('returns an empty string for a null date', () => {
    expect(format.utcDate(null)).to.eq('');
  });
});

describe('format.utcDateTime', () => {
  it('formats a date in UTC time', () => {
    const date = new Date(Date.UTC(2016, 9, 15, 0, 0, 0, 0));
    expect(format.utcDateTime(date)).to.eq('10/15/2016, 12:00 am');
  });

  it('formats a date in UTC time with pm time', () => {
    const date = new Date(Date.UTC(2016, 9, 15, 12, 1, 0, 0));
    expect(format.utcDateTime(date)).to.eq('10/15/2016, 12:01 pm');
  });

  it('returns an empty string for an undefined date', () => {
    expect(format.utcDateTime(undefined)).to.eq('');
  });

  it('returns an empty string for a null date', () => {
    expect(format.utcDateTime(null)).to.eq('');
  });
});

describe('format.localDateTime', () => {
  it('formats a date in local time', () => {
    const date = new Date(2016, 9, 15, 0, 0, 0, 0);
    expect(format.localDateTime(date)).to.eq('10/15/2016, 12:00 am');
  });

  it('formats a date in local time with pm time', () => {
    const date = new Date(2016, 9, 15, 12, 1, 0, 0);
    expect(format.localDateTime(date)).to.eq('10/15/2016, 12:01 pm');
  });

  it('returns an empty string for an undefined date', () => {
    expect(format.localDateTime(undefined)).to.eq('');
  });

  it('returns an empty string for a null date', () => {
    expect(format.localDateTime(null)).to.eq('');
  });
});

describe('format.number', () => {
  [
    { value: 0, result: '0' },
    { value: 100, result: '100' },
    { value: 1000, result: '1,000' },
    { value: 10000, result: '10,000' },
    { value: 100000, result: '100,000' },
    { value: 1000000, result: '1,000,000' },
    { value: 10000000, result: '10,000,000' },
    { value: 100000000, result: '100,000,000' },
    { value: 1000000000, result: '1,000,000,000' },
  ].forEach(({ value, result }) => {
    it(`formats ${value} as ${result}`, () => {
      expect(format.number(value)).to.equal(result);
    });
  });
});

describe('format.yesNo', () => {
  it('formats undefined to empty string', () => {
    expect(format.yesNo(undefined)).to.equal('');
  });

  it('formats null to empty string', () => {
    expect(format.yesNo(null)).to.equal('');
  });

  it('formats true to Yes', () => {
    expect(format.yesNo(true)).to.equal('Yes');
  });

  it('formats false to No', () => {
    expect(format.yesNo(false)).to.equal('No');
  });
});

describe('empty string', () => {
  it('returns value if value is present', () => {
    const fn = (val: string) => { return val; };
    const output = 'output';
    expect(format.emptyStringOrValue(output, fn)).to.be.eql(output);
  });

  it('returns blank if value is null', () => {
    const fn = (val: string) => { return val; };
    expect(format.emptyStringOrValue(null, fn)).to.be.eql('');
  });

  it('returns blank if value is undefined', () => {
    const fn = (val: string) => { return val; };
    expect(format.emptyStringOrValue(undefined, fn)).to.eql('');
  });
});

describe('zip code', () => {
  it('convert zip to string without extended value', () => {
    const zipCode = new ZipCodeBuilder().setBaseValue('12345').build();
    expect(format.zipCode(zipCode)).to.eql('12345');
  });

  it('convert zip to string with extended value', () => {
    const zipCode = new ZipCodeBuilder().setBaseValue('12345').setExtendedValue('6789').build();
    expect(format.zipCode(zipCode)).to.eql('12345-6789');
  });
});

describe('isIncluded', () => {
  it('returns included when the boolean is true', () => {
    expect(format.isIncluded(true)).to.equal('Included');
  });

  it('returns false when the boolean is not true', () => {
    expect(format.isIncluded(undefined)).to.equal('Not Included');
    expect(format.isIncluded(null)).to.equal('Not Included');
    expect(format.isIncluded(false)).to.equal('Not Included');
  });
});
