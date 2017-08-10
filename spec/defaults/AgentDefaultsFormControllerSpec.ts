import { MockAuthService } from 'spec/auth/MockAuthService';
import { IAuthService } from 'src/auth/IAuthService';
import { expect } from 'chai';
import { MockAgentDefaultsService } from './MockAgentDefaultsService';
import { IAgentDefaultsService } from 'src/defaults/IAgentDefaultsService';
import { AgentDefaultsBuilder } from 'src/defaults/AgentDefaultsBuilder';
import { AgentDefaultsResult } from 'src/defaults/AgentDefaultsResult';
import { IAgentDefaultsValidator } from 'src/defaults/IAgentDefaultsValidator';
import { MockAgentDefaultsValidator } from './MockAgentDefaultsValidator';
import { AgentDefaultsErrors } from 'src/defaults/AgentDefaultsErrors';
import { AgentDefaultsFormController } from 'src/defaults/AgentDefaultsFormController';
import { BUSINESS_STATE_OPTIONS } from 'src/addresses/StateTerritory';
import { MockAgentDefaultsRouter } from './MockAgentDefaultsRouter';
import { IAgentDefaultsRouter } from 'src/defaults/IAgentDefaultsRouter';

describe('AgentDefaultsFormController', () => {
  interface IAgentDefaultsFormOverrides {
    agentDefaultsResult?: AgentDefaultsResult;
    service?: IAgentDefaultsService;
    validator?: IAgentDefaultsValidator;
    router?: IAgentDefaultsRouter;
    authService?: IAuthService;
  }

  function buildAgentDefaultsForm(overrides: IAgentDefaultsFormOverrides = {}): AgentDefaultsFormController {
    const agentDefaultsResult = overrides.agentDefaultsResult || AgentDefaultsResult.success(new AgentDefaultsBuilder().build());
    const service = overrides.service || new MockAgentDefaultsService();
    const validator = overrides.validator || new MockAgentDefaultsValidator();
    const router = overrides.router || new MockAgentDefaultsRouter();
    const authService = overrides.authService || new MockAuthService();
    return new AgentDefaultsFormController(agentDefaultsResult, router, service, validator, authService);
  }

  context('consumable behavior', () => {

    it('returns rated state select option', () => {
      const form = buildAgentDefaultsForm();

      const ratedStates = form.getRatedStates();

      expect(ratedStates).to.eql(BUSINESS_STATE_OPTIONS);
    });

    it('validates using the provided validator', () => {
      const errors = new AgentDefaultsErrors();
      const agentDefaultsValidator = new MockAgentDefaultsValidator().stubbedToReturnInvalidResult().withErrors(errors);
      const form = buildAgentDefaultsForm({ validator: agentDefaultsValidator });

      form.validate();

      agentDefaultsValidator.verifyValidateWasCalledWith(form.agentDefaults);
      expect(form.errors).to.equal(errors);
    });

    it('loads defaults for agency defaults successfully', () => {
      const defaultAgency = new AgentDefaultsBuilder().setAgencyNumber('A000123').setCity('Pekin').build();
      const agentDefaultsResult = AgentDefaultsResult.success(defaultAgency);

      const form = buildAgentDefaultsForm( { agentDefaultsResult: agentDefaultsResult });

      expect(form.agentDefaults).to.eql(defaultAgency);
    });

    it('loads defaults for agency defaults unsuccessfully', () => {
      const authService = new MockAuthService();
      authService.user.agencyNumber = 'A999999';
      const agentDefaultsResult = AgentDefaultsResult.defaultsNotFound();

      const form = buildAgentDefaultsForm( { agentDefaultsResult: agentDefaultsResult, authService: authService });

      expect(form.agentDefaults.agencyNumber).to.eql('A999999');
    });

    it('saves new defaults for agency number when valid', () => {
      const defaultAgency = new AgentDefaultsBuilder().setAgencyNumber('A000123').setCity('Pekin').build();
      const agentDefaultsResult = AgentDefaultsResult.defaultsNotFound();
      const service = new MockAgentDefaultsService().stubUpsertDefaultsReturns(AgentDefaultsResult.success(defaultAgency));
      const validator = new MockAgentDefaultsValidator().stubbedToReturnValidResult();
      const router = new MockAgentDefaultsRouter();

      const form = buildAgentDefaultsForm({  agentDefaultsResult: agentDefaultsResult, service: service, validator: validator, router: router });
      return form.save().then((result) => {
        service.verifyUpsertDefaultsCalled(form.agentDefaults);
        router.verifyNavigatedToAgentDefaultsShow();
      });
    });

    it('no errors when valid', () => {
      const errors = new AgentDefaultsErrors();
      const defaultAgency = new AgentDefaultsBuilder().build();
      const agentDefaultsResult = AgentDefaultsResult.defaultsNotFound();
      const service = new MockAgentDefaultsService().stubUpsertDefaultsReturns(AgentDefaultsResult.success(defaultAgency));
      const validator = new MockAgentDefaultsValidator().stubbedToReturnValidResult().withErrors(errors);

      const form = buildAgentDefaultsForm({  agentDefaultsResult: agentDefaultsResult, service: service, validator: validator });
      return form.save().then((result) => {
        validator.verifyValidateWasCalledWith(form.agentDefaults);
        expect(form.errors).to.not.eql(errors);
      });
    });

    it('show errors when invalid', () => {
      const errors = new AgentDefaultsErrors();
      const defaultAgency = new AgentDefaultsBuilder().build();
      const agentDefaultsResult = AgentDefaultsResult.defaultsNotFound();
      const service = new MockAgentDefaultsService().stubUpsertDefaultsReturns(AgentDefaultsResult.success(defaultAgency));
      const validator = new MockAgentDefaultsValidator().stubbedToReturnInvalidResult().withErrors(errors);

      const form = buildAgentDefaultsForm({  agentDefaultsResult: agentDefaultsResult, service: service, validator: validator });
      return form.save().then((result) => {
        validator.verifyValidateWasCalledWith(form.agentDefaults);
        expect(form.errors).to.eql(errors);
      });
    });

    it('does not save new defaults for agency number when invalid', () => {
      const defaultAgency = new AgentDefaultsBuilder().build();
      const agentDefaultsResult = AgentDefaultsResult.defaultsNotFound();
      const service = new MockAgentDefaultsService().stubUpsertDefaultsReturns(AgentDefaultsResult.success(defaultAgency));
      const validator = new MockAgentDefaultsValidator().stubbedToReturnInvalidResult();

      const form = buildAgentDefaultsForm({  agentDefaultsResult: agentDefaultsResult, service: service, validator: validator });
      return form.save().then((result) => {
        service.verifyUpsertDefaultsNotCalled(form.agentDefaults);
      });
    });

    it('does not update new defaults for agency number when invalid', () => {
      const defaultAgency = new AgentDefaultsBuilder().build();
      const agentDefaultsResult = AgentDefaultsResult.success(defaultAgency);
      const service = new MockAgentDefaultsService().stubUpsertDefaultsReturns(AgentDefaultsResult.success(defaultAgency));
      const validator = new MockAgentDefaultsValidator().stubbedToReturnInvalidResult();

      const form = buildAgentDefaultsForm({  agentDefaultsResult: agentDefaultsResult, service: service, validator: validator });
      return form.save().then((result) => {
        service.verifyUpsertDefaultsNotCalled(form.agentDefaults);
      });
    });

    it('updates defaults for agency number', () => {
      const oldDefaultAgency = AgentDefaultsResult.success(new AgentDefaultsBuilder().setAgencyNumber('A000123').setCity('Pekin').build());
      const newDefaultAgency = new AgentDefaultsBuilder().setAgencyNumber('A000123').setCity('Dekalb').build();
      const service = new MockAgentDefaultsService()
        .stubUpsertDefaultsReturns(AgentDefaultsResult.success(newDefaultAgency));
      const router = new MockAgentDefaultsRouter();

      const form = buildAgentDefaultsForm({ agentDefaultsResult: oldDefaultAgency, service: service, router: router });
      form.agentDefaults.city = 'Dekalb';
      return form.save().then((result) => {
        service.verifyUpsertDefaultsCalled(form.agentDefaults);
        router.verifyNavigatedToAgentDefaultsShow();
      });
    });

    it('does not show errors when not submitted', () => {
      const form = buildAgentDefaultsForm();

      expect(form.shouldShowErrors()).to.equal(false);
    });

    it('shows errors when submitted', () => {
      const defaultAgency = new AgentDefaultsBuilder().setAgencyNumber('A000123').build();
      const agentDefaultsResult = AgentDefaultsResult.defaultsNotFound();
      const service = new MockAgentDefaultsService().stubUpsertDefaultsReturns(AgentDefaultsResult.success(defaultAgency));
      const validator = new MockAgentDefaultsValidator().stubbedToReturnValidResult();

      const form = buildAgentDefaultsForm({  agentDefaultsResult: agentDefaultsResult, service: service, validator: validator});

      return form.save().then(() => {
        expect(form.shouldShowErrors()).to.equal(true);
      });
    });

    it('remains on edit page and does not persist if defaults do not exist when cancelled', () => {
      const defaultAgency = AgentDefaultsResult.defaultsNotFound();
      const router = new MockAgentDefaultsRouter();

      const form = buildAgentDefaultsForm({  agentDefaultsResult: defaultAgency, router: router });

      return form.cancel().then(() => {
        router.verifyNavigatedToAgentDefaultsEdit();
        router.verifyDidNotNavigateToAgentDefaultsShow();
      });
    });

    it('navigate to show page and does not persist if defaults exist when cancelled', () => {
      const defaultAgency = new AgentDefaultsBuilder().setAgencyNumber('A000123').build();
      const agentDefaultsResult = AgentDefaultsResult.success(defaultAgency);
      const router = new MockAgentDefaultsRouter();

      const form = buildAgentDefaultsForm({  agentDefaultsResult: agentDefaultsResult, router: router });

      return form.cancel().then(() => {
        router.verifyNavigatedToAgentDefaultsShow();
        router.verifyDidNotNavigateToAgentDefaultsEdit();
      });
    });
  });
});
