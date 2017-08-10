import { IAuthService, AUTH_SERVICE } from './../auth/IAuthService';
import { WindowHelper } from './../util/WindowHelper';
import { IAgentDefaultsService, AGENT_DEFAULTS_SERVICE } from './IAgentDefaultsService';
import { IInputContext } from './../inputs/IInputContext';
import { AgentDefaultsResult } from './AgentDefaultsResult';
import { IAgentDefaultsValidator, AGENT_DEFAULTS_VALIDATOR } from './IAgentDefaultsValidator';
import { AgentDefaultsErrors } from './AgentDefaultsErrors';
import { SelectListItem } from '../../src/util/SelectListItem';
import { StateTerritory } from '../../src/addresses/StateTerritory';
import { BUSINESS_STATE_OPTIONS } from '../../src/addresses/StateTerritory';
import { AgentDefaults } from './AgentDefaults';
import { AgentDefaultsBuilder } from './AgentDefaultsBuilder';
import { AGENT_DEFAULTS_ROUTER, IAgentDefaultsRouter } from './IAgentDefaultsRouter';
import { Inject } from '../util/Inject';

@Inject('agentDefaultsResult', AGENT_DEFAULTS_ROUTER, AGENT_DEFAULTS_SERVICE, AGENT_DEFAULTS_VALIDATOR, AUTH_SERVICE)
export class AgentDefaultsFormController implements IInputContext {
  public agentDefaults: AgentDefaults;
  public errors: AgentDefaultsErrors;
  private submitted = false;

  public constructor(private agentDefaultsResult: AgentDefaultsResult, private router: IAgentDefaultsRouter, private service: IAgentDefaultsService, private validator: IAgentDefaultsValidator, private authService: IAuthService) {
    this.agentDefaults = agentDefaultsResult.getDefaults().hasValue()
                         ? this.presentAgentDefaults()
                         : this.newAgentDefaults();
  }

  public getRatedStates(): SelectListItem<StateTerritory>[] {
    return BUSINESS_STATE_OPTIONS;
  }

  public save(): Promise<AgentDefaultsResult> {
    this.submitted = true;
    const result = this.validator.validate(this.agentDefaults);
    if(result.valid) {
      return this.service.upsertDefaults(this.agentDefaults)
      .then(_ => {
        return this.navigateToShow();
      });
    } else {
      this.errors = result.errors;
      WindowHelper.goToFirstError();
      return Promise.resolve();
    }
  }

  public cancel(): Promise<void> {
    if (this.agentDefaultsResult.getDefaults().hasValue()) {
      return this.navigateToShow();
    }

    return this.navigateToEdit();
  }

  public validate(): void {
    this.errors = this.validator.validate(this.agentDefaults).errors;
  }

  public shouldShowErrors(): boolean {
    return this.submitted;
  }

  private presentAgentDefaults(): AgentDefaults {
    return this.agentDefaultsResult.getDefaults().get();
  }

  private newAgentDefaults(): AgentDefaults {
    return new AgentDefaultsBuilder().setAgencyNumber(this.authService.getAgencyNumber()).build();
  }

  private navigateToShow(): Promise<void> {
    return this.router.navigateToAgentDefaultsShow();
  }

  private navigateToEdit(): Promise<void> {
    return this.router.navigateToAgentDefaultsEdit();
  }
}
