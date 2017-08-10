import { expect } from 'chai';
import { AddressBuilder } from '../../src/addresses/AddressBuilder';
import { ZipCodeBuilder } from '../../src/addresses/ZipCodeBuilder';
import { StateTerritory } from '../../src/addresses/StateTerritory';
import { Address } from '../../src/addresses/Address';

describe('AddressBuilder', () => {
  it('builds empty addresses', () => {
    const address = new AddressBuilder().build();

    expect(address).to.eql({
      address1: null,
      address2: null,
      city: null,
      state: null,
      zipCode: new ZipCodeBuilder().build(),
      county: null,
    });
  });

  it('populates its data from existing addresses', () => {
    const zipCode = new ZipCodeBuilder().build();

    const existingAddress = {
      address1: 'address1',
      address2: 'address2',
      city: 'city',
      state: StateTerritory.DistrictOfColumbia,
      zipCode: zipCode,
      county: 'county',
    };

    const address = new AddressBuilder(existingAddress).build();

    expect(address).to.eql(existingAddress);
  });

  it('sets the address1', () => {
    const address = new AddressBuilder()
      .setAddress1('foo')
      .build();

    expect(address.address1).to.equal('foo');
  });

  it('sets the address2', () => {
    const address = new AddressBuilder()
      .setAddress2('foo')
      .build();

    expect(address.address2).to.equal('foo');
  });

  it('sets the city', () => {
    const address = new AddressBuilder()
      .setCity('foo')
      .build();

    expect(address.city).to.equal('foo');
  });

  it('sets and removes the state', () => {
    let address: Address;

    address = new AddressBuilder()
      .setState(StateTerritory.Illinois)
      .build();

    expect(address.state).to.equal(StateTerritory.Illinois);

    address = new AddressBuilder(address)
      .removeState()
      .build();

    expect(address.state).to.equal(null);
  });

  it('sets the zip code', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('12345')
      .setExtendedValue('6789')
      .build();

    const address = new AddressBuilder()
      .setZipCode(zipCode)
      .build();

    expect(address.zipCode).to.eql(zipCode);
  });

  it('updates the zip code', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('12345')
      .build();

    const previousAddress = new AddressBuilder()
      .setZipCode(zipCode)
      .build();

    expect(previousAddress.zipCode.extendedValue).to.not.exist;

    const address = new AddressBuilder(previousAddress)
      .updateZipCode(builder => builder.setExtendedValue('6789'))
      .build();

    expect(address.zipCode.extendedValue).to.equal('6789');
  });

  it('sets the county', () => {
    const address = new AddressBuilder()
      .setCounty('foo')
      .build();

    expect(address.county).to.equal('foo');
  });
});
