import { expect } from 'chai';
import { ZipCodeValidator } from 'src/addresses/ZipCodeValidator';
import { ZipCode } from 'src/addresses/ZipCode';
import { ZipCodeBuilder } from 'src/addresses/ZipCodeBuilder';
import { ValidationResult } from 'src/validations/ValidationResult';

function validate(zipCode: ZipCode): ValidationResult<string[]> {
  let errors: string[] = [];
  const result = ValidationResult.success(errors);
  new ZipCodeValidator().performValidation(zipCode, result);
  return result;
}

describe('ZipCodeValidator', () => {
  it('returns no errors when valid', () => {
    const zipCode = new ZipCodeBuilder().build();
    const result = validate(zipCode);

    expect(result.errors).to.eql([]);
  });

  it('returns no errors when the base value is 5 characters long and extended value is 4 characters long', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('12345')
      .setExtendedValue('1234')
      .build();

    const result = validate(zipCode);

    expect(result.errors).to.eql([]);
  });

  it('returns no errors when null', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue(null)
      .setExtendedValue(null)
      .build();

    const result = validate(zipCode);

    expect(result.errors).to.eql([]);
  });

  it('returns no errors when undefined', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue(undefined)
      .setExtendedValue(undefined)
      .build();

    const result = validate(zipCode);

    expect(result.errors).to.eql([]);
  });

  it('returns no errors when the base value is 5 characters long and extended value is empty string', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('12345')
      .setExtendedValue('')
      .build();

    const result = validate(zipCode);

    expect(result.errors).to.eql([]);
  });

  it('returns no errors when the base value is 5 characters long and extended value is null', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('12345')
      .build();

    const result = validate(zipCode);

    expect(result.errors).to.eql([]);
  });

  it('returns an error when the base value is not 5 characters long', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('1234')
      .build();

    const result = validate(zipCode);

    expect(result.valid).to.equal(false);
    expect(result.errors).to.eql(['Standard zip code must be 5 characters']);
  });

  it('returns an error when the base value is 5 characters long and extended value is not 4 characters long ', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('12345')
      .setExtendedValue('123')
      .build();

    const result = validate(zipCode);

    expect(result.valid).to.equal(false);
    expect(result.errors).to.eql(['Zip+4 must be 4 characters']);
  });

  it('returns an error when the base value is not numeric', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('Baaad')
      .build();

    const result = validate(zipCode);

    expect(result.valid).to.equal(false);
    expect(result.errors).to.eql(['Zip code must only contain numeric characters']);
  });

  it('returns an error when the base value is 5 characters long and extended value is not numeric', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('12345')
      .setExtendedValue('Baad')
      .build();

    const result = validate(zipCode);

    expect(result.valid).to.equal(false);
    expect(result.errors).to.eql(['Zip code must only contain numeric characters']);
  });

  it('returns an error when the base value is a decimal', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('123.5')
      .build();

    const result = validate(zipCode);

    expect(result.valid).to.equal(false);
    expect(result.errors).to.eql(['Zip code must only contain numeric characters']);
  });

  it('returns an error when the base value is 5 characters long and extended value is a decimal', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('12345')
      .setExtendedValue('12.3')
      .build();

    const result = validate(zipCode);

    expect(result.valid).to.equal(false);
    expect(result.errors).to.eql(['Zip code must only contain numeric characters']);
  });
});
