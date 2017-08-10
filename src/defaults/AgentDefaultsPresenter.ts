import * as format from '../util/Format';
import { AgentDefaults } from './AgentDefaults';
import { AgentDefaultsViewModel } from './AgentDefaultsViewModel';
import { toFullName } from '../addresses/StateTerritory';

export class AgentDefaultsPresenter {

  constructor(private agentDefaults: AgentDefaults) { }

  public present(): AgentDefaultsViewModel {
    return {
      agencyNumber: this.agentDefaults.agencyNumber,
      city: this.agentDefaults.city,
      state: this.presentState(),
      county: this.agentDefaults.county,
      zipCode: this.presentZipCode(),
    };
  }

  private presentState(): string {
    return format.emptyStringOrValue(this.agentDefaults.state, state => { return toFullName(state).get(); });
  }

  private presentZipCode(): string {
    return format.emptyStringOrValue(this.agentDefaults.zipCode, zipCode => {return format.zipCode(zipCode); });
  }
}
