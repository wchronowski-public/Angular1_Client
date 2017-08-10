import { expect } from 'chai';
import { ValidationResult } from './../../src/validations/ValidationResult';
import { AgentDefaults } from './../../src/defaults/AgentDefaults';
import { AgentDefaultsErrors } from './../../src/defaults/AgentDefaultsErrors';
import { IAgentDefaultsValidator } from './../../src/defaults/IAgentDefaultsValidator';

export class MockAgentDefaultsValidator implements IAgentDefaultsValidator {
  public result = new ValidationResult(true, new AgentDefaultsErrors());
  private validatedAgentDefaults: AgentDefaults;

  public validate(agentDefaults: AgentDefaults): ValidationResult<AgentDefaultsErrors> {
    this.validatedAgentDefaults = agentDefaults;
    return this.result;
  }

  public stubbedToReturnInvalidResult(): this {
    this.result.valid = false;
    return this;
  }

  public stubbedToReturnValidResult(): this {
    this.result.valid = true;
    return this;
  }

  public withErrors(errors: AgentDefaultsErrors): this {
    this.result.errors = errors;
    return this;
  }

  public verifyValidateWasCalledWith(agentDefaults: AgentDefaults): void {
    expect(this.validatedAgentDefaults).to.equal(agentDefaults);
  }
}
