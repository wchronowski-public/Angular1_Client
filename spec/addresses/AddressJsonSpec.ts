import { expect } from 'chai';
import { StateTerritory } from '../../src/addresses/StateTerritory';
import { AddressBuilder } from '../../src/addresses/AddressBuilder';
import { AddressJson } from '../../src/addresses/AddressJson';
import { mapAddressToJson, mapJsonToAddress } from '../../src/addresses/AddressJson';
import { mapJsonToZipCode } from '../../src/addresses/ZipCodeJson';

describe('address json mapping', () => {
  it('maps addresses to json', () => {
    const address = new AddressBuilder()
      .setAddress1('123 Main St.')
      .setAddress2('#1')
      .setCity('Chicago')
      .setCounty('Cook')
      .setState(StateTerritory.Illinois)
      .updateZipCode(builder => {
        builder
          .setBaseValue('60612')
          .setExtendedValue('1234');
      })
      .build();

    const json = mapAddressToJson(address);

    expect(json.address1).to.equal('123 Main St.');
    expect(json.address2).to.equal('#1');
    expect(json.city).to.equal('Chicago');
    expect(json.county).to.equal('Cook');
    expect(json.state).to.equal('IL');
    expect(json.zipCode.baseValue).to.equal('60612');
    expect(json.zipCode.extendedValue).to.equal('1234');
  });

  it('maps null address values to undefined', () => {
    const address = new AddressBuilder()
      .setAddress1(null)
      .setAddress2(null)
      .setCity(null)
      .setCounty(null)
      .setState(null)
      .setZipCode(null)
      .build();

    const json = mapAddressToJson(address);

    expect(json.address1).to.equal(undefined);
    expect(json.address2).to.equal(undefined);
    expect(json.city).to.equal(undefined);
    expect(json.county).to.equal(undefined);
    expect(json.state).to.equal(undefined);
    expect(json.zipCode).to.equal(undefined);
  });

  it('maps zip codes with undefined values to undefined', () => {
    const address = new AddressBuilder()
      .updateZipCode(builder => builder.setBaseValue(undefined).setExtendedValue(undefined))
      .build();

    const json = mapAddressToJson(address);

    expect(json.zipCode).to.equal(undefined);
  });

  it('maps json to addresses', () => {
    const json: AddressJson = {
      address1: '123 Main St.',
      address2: '#1',
      city: 'Chicago',
      county: 'Cook',
      state: 'IL',
      zipCode: {
        baseValue: '60612',
        extendedValue: '1234',
      },
    };

    const address = mapJsonToAddress(json);

    expect(address.address1).to.equal('123 Main St.');
    expect(address.address2).to.equal('#1');
    expect(address.city).to.equal('Chicago');
    expect(address.county).to.equal('Cook');
    expect(address.state).to.equal(StateTerritory.Illinois);
    expect(address.zipCode).to.eql(mapJsonToZipCode(json.zipCode));
  });

  it('maps undefined json values to null', () => {
    const json: AddressJson = {};

    const address = mapJsonToAddress(json);

    expect(address.address1).to.equal(null);
    expect(address.address2).to.equal(null);
    expect(address.city).to.equal(null);
    expect(address.county).to.equal(null);
    expect(address.state).to.equal(null);
    expect(address.zipCode).to.eql(mapJsonToZipCode({}));
  });

  it('maps state to null when not present', () => {
    const json: AddressJson = {
      address1: '123 Main St.',
      address2: '#1',
      city: 'Chicago',
      county: 'Cook',
      state: null,
      zipCode: {
        baseValue: '60612',
        extendedValue: '1234',
      },
    };

    const address = mapJsonToAddress(json);

    expect(address.state).to.equal(null);
  });
});
