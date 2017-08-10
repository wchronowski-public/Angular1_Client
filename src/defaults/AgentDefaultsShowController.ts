import { AgentDefaultsPresenter } from './AgentDefaultsPresenter';
import { AgentDefaultsResult } from './AgentDefaultsResult';
import { AgentDefaultsViewModel } from './AgentDefaultsViewModel';
import { AGENT_DEFAULTS_ROUTER, IAgentDefaultsRouter } from './IAgentDefaultsRouter';
import { IAuthService, AUTH_SERVICE } from './../auth/IAuthService';
import { Inject, InjectStatic } from '../util/Inject';

@Inject('agentDefaultsResult', AGENT_DEFAULTS_ROUTER, AUTH_SERVICE)
export class AgentDefaultsShowController {
  public  agentDefaultsViewModel: AgentDefaultsViewModel;

  @InjectStatic('agentDefaultsResult', AGENT_DEFAULTS_ROUTER)
  public static onEnter(agentDefaultsResult: AgentDefaultsResult, router: IAgentDefaultsRouter): Promise<void> {
    if(!agentDefaultsResult.getDefaults().hasValue()) {
      return router.navigateToAgentDefaultsEdit();
    }
    return Promise.resolve();
  }

  public constructor(private agentDefaultsResult: AgentDefaultsResult, private router: IAgentDefaultsRouter, private authService: IAuthService) {
    this.agentDefaultsViewModel = this.presentDefaults();
  }

  public navigateToEdit(): Promise<void> {
    return this.router.navigateToAgentDefaultsEdit();
  }

  private presentDefaults(): AgentDefaultsViewModel {
    return new AgentDefaultsPresenter(this.agentDefaultsResult.getDefaults().get()).present();
  }
}
