import { AgentDefaultsResult } from './AgentDefaultsResult';
import { AgentDefaults } from './AgentDefaults';

export const AGENT_DEFAULTS_SERVICE = 'agentDefaultsService';

export interface IAgentDefaultsService {
  loadDefaults(agencyNumber: string): Promise<AgentDefaultsResult>;
  upsertDefaults(agentDefaults: AgentDefaults): Promise<AgentDefaultsResult>;
}
