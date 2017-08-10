import { Address } from './Address';
import { ZipCodeJson } from './ZipCodeJson';
import { mapZipCodeToJson, mapJsonToZipCode } from './ZipCodeJson';
import {
  toJson as mapStateTerritoryToJson,
  fromJson as mapJsonToStateTerritory,
} from './StateTerritory';
import { valueOrUndefined , valueOrNull , applyOrUndefined , applyOrNull } from '../util/Json';

export type AddressJson = {
  address1?: string;
  address2?: string;
  city?: string;
  county?: string;
  state?: string;
  zipCode?: ZipCodeJson;
};

export function mapAddressToJson(address: Address): AddressJson {
  return {
    address1: valueOrUndefined(address.address1),
    address2: valueOrUndefined(address.address2),
    city: valueOrUndefined(address.city),
    county: valueOrUndefined(address.county),
    state: applyOrUndefined(address.state, mapStateTerritoryToJson),
    zipCode: applyOrUndefined(address.zipCode, mapZipCodeToJson),
  };
}

export function mapJsonToAddress(json: AddressJson): Address {
  return {
    address1: valueOrNull(json.address1),
    address2: valueOrNull(json.address2),
    city: valueOrNull(json.city),
    county: valueOrNull(json.county),
    state: applyOrNull(json.state, mapJsonToStateTerritory),
    zipCode: mapJsonToZipCode(json.zipCode || {}),
  };
}
