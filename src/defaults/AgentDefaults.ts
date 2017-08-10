import { StateTerritory } from '../addresses/StateTerritory';
import { ZipCode } from '../addresses/ZipCode';

export type AgentDefaults = {
  agencyNumber: string;
  city: string;
  state: StateTerritory;
  county: string;
  zipCode: ZipCode;
}
