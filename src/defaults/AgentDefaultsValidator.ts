import { ZipCodeValidator } from './../addresses/ZipCodeValidator';
import * as p from '../validations/Predicates';
import { AgentDefaults } from './AgentDefaults';
import { AgentDefaultsErrors } from './AgentDefaultsErrors';
import { IAgentDefaultsValidator } from './IAgentDefaultsValidator';
import { Validator } from '../validations/Validator';
import { ValidationResult } from '../validations/ValidationResult';

export class AgentDefaultsValidator extends Validator<AgentDefaults, AgentDefaultsErrors> implements IAgentDefaultsValidator {
  public initializeRules(): void {
    this.rulesFor(agentDefaults => agentDefaults.agencyNumber, errors => errors.agencyNumber, rules => {
      rules.validate(p.presentWithValue, 'Required');
    });

    this.rulesFor(agentDefaults => agentDefaults.state, errors => errors.state, rules => {
      rules.validate(p.presentWithValue, 'Required');
    });

    this.when(agentDefaults => agentDefaults.zipCode !== null && agentDefaults.zipCode !== undefined, context => {
      context.rulesFor(agentDefaults => agentDefaults.zipCode, errors => errors.zipCode, rules => {
        rules.whenProperty(zip => p.presentWithValue(zip.baseValue), _ => {
          rules.validatePropertyUsing(new ZipCodeValidator());
        });
      });
    });
  }

  public validate(agentDefaults: AgentDefaults): ValidationResult<AgentDefaultsErrors> {
    return this.validateStartingWith(agentDefaults, new AgentDefaultsErrors());
  }
}
