import { AgentDefaults } from './AgentDefaults';
import { AgentDefaultsErrors } from './AgentDefaultsErrors';
import { ValidationResult } from './../validations/ValidationResult';

export const AGENT_DEFAULTS_VALIDATOR = 'agentDefaultsValidator';

export interface IAgentDefaultsValidator {
  validate(agentDefaults: AgentDefaults): ValidationResult<AgentDefaultsErrors>;
}
