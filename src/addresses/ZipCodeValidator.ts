import * as p from '../validations/Predicates';
import { ZipCode } from './ZipCode';
import { Validator } from '../validations/Validator';

export class ZipCodeValidator extends Validator<ZipCode, string[]> {
  public initializeRules(): void {
    this.rulesFor(zip => zip.baseValue, e => e, rules => {
      rules.whenProperty(p.presentWithValue, rules => {
        rules.validate(p.isIntegerOrWhitespace, 'Zip code must only contain numeric characters');
        rules.validate(p.stringLength(5), 'Standard zip code must be 5 characters');
      });
    });

    this.rulesFor(zip => zip.extendedValue, e => e, rules => {
      rules.whenProperty(p.presentWithValue, rules => {
        rules.validate(p.isIntegerOrWhitespace, 'Zip code must only contain numeric characters');
        rules.validate(p.stringLength(4), 'Zip+4 must be 4 characters');
      });
    });
  }
}
