import { expect } from 'chai';
import { StateTerritory } from  '../../src/addresses/StateTerritory';
import { ZipCode } from  '../../src/addresses/ZipCode';
import { mapDefaultsToJson, mapJsonToDefaults } from '../../src/defaults/AgentDefaultsJson';
import { AgentDefaults } from '../../src/defaults/AgentDefaults';
import { AgentDefaultsBuilder } from '../../src/defaults/AgentDefaultsBuilder';
import { ZipCodeBuilder } from '../../src/addresses/ZipCodeBuilder';
import { mapJsonToZipCode } from '../../src/addresses/ZipCodeJson';

describe('AgentDefaultsJson', () => {
  interface IAgentDefaults {
    agencyNumber?: string;
    city?: string;
    state?: StateTerritory;
    county?: string;
    zipCode?: ZipCode;
  }

  function buildDefaults(optionalValue: any, overrides: IAgentDefaults = {} ): AgentDefaults {
    const agencyNumber = overrides.agencyNumber || optionalValue;
    const city = overrides.city || optionalValue;
    const state = overrides.state || optionalValue;
    const county = overrides.county || optionalValue;
    const zipCode = overrides.zipCode || optionalValue;

    return new AgentDefaultsBuilder()
      .setAgencyNumber(agencyNumber)
      .setCity(city)
      .setState(state)
      .setCounty(county)
      .setZipCode(zipCode)
      .build();
  }

  it('maps the defaults to json', () => {
    const zipCode = new ZipCodeBuilder().setBaseValue('12345').setExtendedValue('1234').build();
    const defaults = buildDefaults(null, {
      agencyNumber: 'Agent#',
      city: 'City',
      state: StateTerritory.Alabama,
      county: 'County',
      zipCode: zipCode,
    });

    const json = mapDefaultsToJson(defaults);

    expect(json.agencyNumber).to.eql('Agent#');
    expect(json.city).to.eql('City');
    expect(json.state).to.eql('AL');
    expect(json.county).to.eql('County');
    expect(json.zipCode).to.eql(zipCode);
  });

  it('maps the undefined defaults to undefined json values', () => {
    const defaults = buildDefaults(undefined);

    const json = mapDefaultsToJson(defaults);

    expect(json.agencyNumber).to.eql(undefined);
    expect(json.city).to.eql(undefined);
    expect(json.state).to.eql(undefined);
    expect(json.county).to.eql(undefined);
    expect(json.zipCode).to.eql(undefined);
  });

  it('maps the null defaults to undefined json values', () => {
    const defaults = buildDefaults(null);

    const json = mapDefaultsToJson(defaults);

    expect(json.agencyNumber).to.eql(undefined);
    expect(json.city).to.eql(undefined);
    expect(json.state).to.eql(undefined);
    expect(json.county).to.eql(undefined);
    expect(json.zipCode).to.eql(undefined);
  });

  it('maps the json to defaults', () => {
    const zipCode = new ZipCodeBuilder().setBaseValue('12345').setExtendedValue('1234').build();
    const defaults = buildDefaults(null, {
      agencyNumber: 'Agent#',
      city: 'City',
      state: StateTerritory.Alabama,
      county: 'County',
      zipCode: zipCode,
    });
    const json = mapDefaultsToJson(defaults);

    const results = mapJsonToDefaults(json);

    expect(results.agencyNumber).to.eql('Agent#');
    expect(results.city).to.eql('City');
    expect(results.state).to.eql(StateTerritory.Alabama);
    expect(results.county).to.eql('County');
    expect(results.zipCode).to.eql(zipCode);
  });

  it('maps the undefined json to null default values', () => {
    const defaults = buildDefaults(undefined);
    const json = mapDefaultsToJson(defaults);

    const results = mapJsonToDefaults(json);

    expect(results.agencyNumber).to.eql(null);
    expect(results.city).to.eql(null);
    expect(results.state).to.eql(null);
    expect(results.county).to.eql(null);
    expect(results.zipCode).to.eql(mapJsonToZipCode({}));
  });

  it('maps the null json to null default values', () => {
    const defaults = buildDefaults(null);
    const json = mapDefaultsToJson(defaults);

    const results = mapJsonToDefaults(json);

    expect(results.agencyNumber).to.eql(null);
    expect(results.city).to.eql(null);
    expect(results.state).to.eql(null);
    expect(results.county).to.eql(null);
    expect(results.zipCode).to.eql(mapJsonToZipCode({}));
  });
});
