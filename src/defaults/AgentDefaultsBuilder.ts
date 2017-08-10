import {AgentDefaults} from './AgentDefaults';
import {ZipCode} from '../addresses/ZipCode';
import {StateTerritory} from '../addresses/StateTerritory';

export class AgentDefaultsBuilder {
  private agencyNumber: string = null;
  private city: string = null;
  private state: StateTerritory = null;
  private county: string = null;
  private zipCode: ZipCode = null;

  public constructor(agentDefaults?: AgentDefaults) {
    if (agentDefaults) {
      this.agencyNumber = agentDefaults.agencyNumber;
      this.city = agentDefaults.city;
      this.state = agentDefaults.state;
      this.county = agentDefaults.county;
      this.zipCode = agentDefaults.zipCode;
    }
  }

  public build(): AgentDefaults {
    return {
      agencyNumber: this.agencyNumber,
      city: this.city,
      state: this.state,
      county: this.county,
      zipCode: this.zipCode,
    };
  }

  public setAgencyNumber(agencyNumber: string): this {
    this.agencyNumber = agencyNumber;
    return this;
  }

  public setCity(city: string): this {
    this.city = city;
    return this;
  }

  public setState(state: StateTerritory): this {
    this.state = state;
    return this;
  }

  public setCounty(county: string): this {
    this.county = county;
    return this;
  }

  public setZipCode(zipCode: ZipCode): this {
    this.zipCode = zipCode;
    return this;
  }
}
