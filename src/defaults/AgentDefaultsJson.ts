import { AgentDefaultsBuilder } from './../../src/defaults/AgentDefaultsBuilder';
import { AgentDefaults } from './../../src/defaults/AgentDefaults';
import { mapJsonToZipCode, mapZipCodeToJson, ZipCodeJson } from '../../src/addresses/ZipCodeJson';
import { valueOrNull, valueOrUndefined, applyOrUndefined, applyOrNull } from '../util/Json';
import { toJson as mapStateTerritoryToJson, fromJson as mapJsonToStateTerritory } from '../addresses/StateTerritory';

export type AgentDefaultsJson = {
  agencyNumber?: string;
  city?: string;
  state?: string;
  county?: string;
  zipCode?: ZipCodeJson;
};

export function mapJsonToDefaults(json: AgentDefaultsJson): AgentDefaults {
  return new AgentDefaultsBuilder()
    .setAgencyNumber(valueOrNull(json.agencyNumber))
    .setCity(valueOrNull(json.city))
    .setState(applyOrNull(json.state, mapJsonToStateTerritory))
    .setCounty(valueOrNull(json.county))
    .setZipCode(applyOrNull(json.zipCode || {}, mapJsonToZipCode))
    .build();
}

export function mapDefaultsToJson(agentDefaults: AgentDefaults): AgentDefaultsJson {
  return {
    agencyNumber: valueOrUndefined(agentDefaults.agencyNumber),
    city: valueOrUndefined(agentDefaults.city),
    state: applyOrUndefined(agentDefaults.state, mapStateTerritoryToJson),
    county: valueOrUndefined(agentDefaults.county),
    zipCode: applyOrUndefined(agentDefaults.zipCode, mapZipCodeToJson),
  };
}
