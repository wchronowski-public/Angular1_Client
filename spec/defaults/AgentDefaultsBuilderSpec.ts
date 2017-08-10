import {StateTerritory} from '../../src/addresses/StateTerritory';
import {ZipCodeBuilder} from '../../src/addresses/ZipCodeBuilder';
import {AgentDefaultsBuilder} from '../../src/defaults/AgentDefaultsBuilder';
import { expect } from 'chai';

describe('AgentDefaultBuilder', () => {
  it('builds empty agent defaults', () => {
    const agentDefaults = new AgentDefaultsBuilder().build();

    expect(agentDefaults).to.eql({
      agencyNumber: null,
      city: null,
      state: null,
      county: null,
      zipCode: null,
    });
  });

  it('populates its data from existing agent defaults', () => {
    const zipCode = new ZipCodeBuilder().build();

    const existing = {
      agencyNumber: 'A000123',
      city: 'city',
      state: StateTerritory.DistrictOfColumbia,
      county: 'county',
      zipCode: zipCode,
    };

    const actual = new AgentDefaultsBuilder(existing).build();

    expect(actual).to.eql(existing);
  });

  it('sets the agent number', () => {
    const defaults = new AgentDefaultsBuilder()
      .setAgencyNumber('A000321')
      .build();
    expect(defaults.agencyNumber).to.equal('A000321');
  });

  it('sets the city', () => {
    const defaults = new AgentDefaultsBuilder()
      .setCity('monroe')
      .build();
    expect(defaults.city).to.equal('monroe');
  });

  it('sets the state', () => {
    const defaults = new AgentDefaultsBuilder()
      .setState(StateTerritory.Michigan)
      .build();
    expect(defaults.state).to.equal(StateTerritory.Michigan);
  });

  it('sets the county', () => {
    const defaults = new AgentDefaultsBuilder()
      .setCounty('Waupin')
      .build();
    expect(defaults.county).to.equal('Waupin');
  });

  it('sets the zipCode', () => {
    const zipCode = new ZipCodeBuilder()
      .setBaseValue('61571')
      .build();
    const defaults = new AgentDefaultsBuilder()
      .setZipCode(zipCode)
      .build();
    expect(defaults.zipCode).to.equal(zipCode);
  });
});
