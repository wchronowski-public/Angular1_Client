import { ZipCodeBuilder } from './../../src/addresses/ZipCodeBuilder';
import { expect } from 'chai';
import { AgentDefaultsErrors } from './../../src/defaults/AgentDefaultsErrors';
import { AgentDefaultsValidator } from './../../src/defaults/AgentDefaultsValidator';
import { ValidationResult } from './../../src/validations/ValidationResult';
import { AgentDefaults } from './../../src/defaults/AgentDefaults';
import { AgentDefaultsBuilder } from './../../src/defaults/AgentDefaultsBuilder';
import { StateTerritory } from './../../src/addresses/StateTerritory';

function buildValidAgentDefaults(): AgentDefaults {
  return new AgentDefaultsBuilder()
    .setAgencyNumber('A000123')
    .setState(StateTerritory.DistrictOfColumbia)
    .build();
}

function validate(agentDefaults: AgentDefaults): ValidationResult<AgentDefaultsErrors> {
  return new AgentDefaultsValidator().validate(agentDefaults);
}

describe('AgentDefaultsValidator', () => {
  it('returns a valid result when valid', () => {
    const result = validate(buildValidAgentDefaults());

    expect(result.valid).to.equal(true);
  });

  context('agent number', () => {
    it('returns no errors when valid', () => {
      const result = validate(buildValidAgentDefaults());

      expect(result.errors.agencyNumber).to.eql([]);
    });

    it('returns an error when undefined', () => {
      const agentDefaults = buildValidAgentDefaults();
      agentDefaults.agencyNumber = undefined;

      const result = validate(agentDefaults);

      expect(result.valid).to.equal(false);
      expect(result.errors.agencyNumber).to.eql(['Required']);
    });

    it('returns an error when null', () => {
      const agentDefaults = buildValidAgentDefaults();
      agentDefaults.agencyNumber = null;

      const result = validate(agentDefaults);

      expect(result.valid).to.equal(false);
      expect(result.errors.agencyNumber).to.eql(['Required']);
    });

    it('returns an error when empty string', () => {
      const agentDefaults = buildValidAgentDefaults();
      agentDefaults.agencyNumber = '';

      const result = validate(agentDefaults);

      expect(result.valid).to.equal(false);
      expect(result.errors.agencyNumber).to.eql(['Required']);
    });
  });

  context('rated state', () => {
    it('returns no errors when valid', () => {
      const result = validate(buildValidAgentDefaults());

      expect(result.errors.state).to.eql([]);
    });

    it('returns an error when undefined', () => {
      const agentDefaults = buildValidAgentDefaults();
      agentDefaults.state = undefined;

      const result = validate(agentDefaults);

      expect(result.valid).to.equal(false);
      expect(result.errors.state).to.eql(['Required']);
    });

    it('returns an error when null', () => {
      const agentDefaults = buildValidAgentDefaults();
      agentDefaults.state = null;

      const result = validate(agentDefaults);

      expect(result.valid).to.equal(false);
      expect(result.errors.state).to.eql(['Required']);
    });

    it('returns an error when empty string', () => {
      const agentDefaults = buildValidAgentDefaults();
      (agentDefaults as any).state = '';

      const result = validate(agentDefaults);

      expect(result.valid).to.equal(false);
      expect(result.errors.state).to.eql(['Required']);
    });
  });

  context('zip code base value', () => {
    it('returns no errors when valid', () => {
      const result = validate(buildValidAgentDefaults());

      expect(result.errors.zipCode).to.eql([]);
    });

    it('returns no errors when the base value is 5 characters long and extended value is 4 characters long', () => {
      const agentDefaults = buildValidAgentDefaults();
      agentDefaults.zipCode = new ZipCodeBuilder()
        .setBaseValue('12345')
        .setExtendedValue('1234')
        .build();

      const result = validate(agentDefaults);

      expect(result.errors.zipCode).to.eql([]);
    });

    it('returns no errors when the base value is 5 characters long and extended value is empty string', () => {
      const agentDefaults = buildValidAgentDefaults();
      agentDefaults.zipCode = new ZipCodeBuilder()
        .setBaseValue('12345')
        .setExtendedValue('')
        .build();

      const result = validate(agentDefaults);

      expect(result.errors.zipCode).to.eql([]);
    });

    it('returns no errors when the base value is 5 characters long and extended value is null', () => {
      const agentDefaults = buildValidAgentDefaults();
      agentDefaults.zipCode = new ZipCodeBuilder()
        .setBaseValue('12345')
        .build();

      const result = validate(agentDefaults);

      expect(result.errors.zipCode).to.eql([]);
    });

    it('returns an error when the base value is not 5 characters long', () => {
      const agentDefaults = buildValidAgentDefaults();
      agentDefaults.zipCode = new ZipCodeBuilder()
        .setBaseValue('1234')
        .build();

      const result = validate(agentDefaults);

      expect(result.valid).to.equal(false);
      expect(result.errors.zipCode).to.eql(['Standard zip code must be 5 characters']);
    });

    it('returns an error when the base value is 5 characters long and extended value is not 4 characters long ', () => {
      const agentDefaults = buildValidAgentDefaults();
      agentDefaults.zipCode = new ZipCodeBuilder()
        .setBaseValue('12345')
        .setExtendedValue('123')
        .build();

      const result = validate(agentDefaults);

      expect(result.valid).to.equal(false);
      expect(result.errors.zipCode).to.eql(['Zip+4 must be 4 characters']);
    });
  });
});
