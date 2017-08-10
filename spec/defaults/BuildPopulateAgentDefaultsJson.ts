import { AgentDefaultsJson } from './../../src/defaults/AgentDefaultsJson';

export function buildPopulateAgentDefaultsJson(update: Action<AgentDefaultsJson> = _ => {}): AgentDefaultsJson {
  const defaultsJson: AgentDefaultsJson = {
    agencyNumber: 'A000123',
    city: 'Pekin',
    state: 'IL',
    county: 'Tazewell',
    zipCode: {
      baseValue: '12345',
      extendedValue: '1234',
    },
  };
  update(defaultsJson);
  return defaultsJson;
}
