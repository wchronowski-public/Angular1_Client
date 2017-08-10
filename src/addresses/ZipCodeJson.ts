import { ZipCode } from './ZipCode';
import { valueOrUndefined, valueOrNull , noPropertiesHaveValue } from '../util/Json';

export type ZipCodeJson = {
  baseValue?: string;
  extendedValue?: string;
};

export function mapZipCodeToJson(zipCode: ZipCode): ZipCodeJson {
  if(noPropertiesHaveValue(zipCode)) {
    return undefined;
  }

  return {
    baseValue: valueOrUndefined(zipCode.baseValue),
    extendedValue: valueOrUndefined(zipCode.extendedValue),
  };
}

export function mapJsonToZipCode(json: ZipCodeJson): ZipCode {
  return {
    baseValue: valueOrNull(json.baseValue),
    extendedValue: valueOrNull(json.extendedValue),
  };
}
