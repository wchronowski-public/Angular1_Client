export const AGENT_DEFAULTS_ROUTER = 'agentDefaultsRouter';

export interface IAgentDefaultsRouter {
  navigateToAgentDefaultsShow(): Promise<this>;
  navigateToAgentDefaultsEdit(): Promise<this>;
}
