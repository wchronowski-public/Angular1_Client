import { StateTerritory } from './StateTerritory';
import { ZipCode } from './ZipCode';

export type Address = {
  address1: string;
  address2: string;
  city: string;
  state: StateTerritory;
  zipCode: ZipCode;
  county: string;
}
