import { AgentDefaultsPresenter } from './../../src/defaults/AgentDefaultsPresenter';
import { MockAuthService } from './../auth/MockAuthService';
import { IAuthService } from './../../src/auth/IAuthService';
import { expect } from 'chai';
import { AgentDefaultsBuilder } from './../../src/defaults/AgentDefaultsBuilder';
import { AgentDefaultsResult } from './../../src/defaults/AgentDefaultsResult';
import { AgentDefaultsShowController } from '../../src/defaults/AgentDefaultsShowController';
import { MockAgentDefaultsRouter } from './MockAgentDefaultsRouter';
import { IAgentDefaultsRouter } from '../../src/defaults/IAgentDefaultsRouter';

describe('AgentDefaultsShowController', () => {
  interface IAgentDefaultsShowOverrides {
    agentDefaultsResult?: AgentDefaultsResult;
    router?: IAgentDefaultsRouter;
    authService?: IAuthService;
  }

  function buildAgentDefaultsShow(overrides: IAgentDefaultsShowOverrides = {}): AgentDefaultsShowController {
    const agentDefaultsResult = overrides.agentDefaultsResult || AgentDefaultsResult.success(new AgentDefaultsBuilder().build());
    const router = overrides.router || new MockAgentDefaultsRouter();
    const authService = overrides.authService || new MockAuthService();
    return new AgentDefaultsShowController(agentDefaultsResult, router, authService);
  }

  context('onEnter', () => {
    it('navigates to the agency defaults form if there is no defaults', () => {
      const agentDefaultsResult = AgentDefaultsResult.defaultsNotFound();
      const router = new MockAgentDefaultsRouter();
      return AgentDefaultsShowController.onEnter(agentDefaultsResult, router).then(() => {
        router.verifyNavigatedToAgentDefaultsEdit();
      });
    });

    it('does not navigate to the agent defaults form if there is defaults', () => {
      const agentDefaults = new AgentDefaultsBuilder().build();
      const agentDefaultsResult = AgentDefaultsResult.success(agentDefaults);
      const router = new MockAgentDefaultsRouter();
      return AgentDefaultsShowController.onEnter(agentDefaultsResult, router).then(() => {
        router.verifyDidNotNavigateToAgentDefaultsEdit();
      });
    });
  });

  context('consumable behavior', () => {
    it('loads defaults for agency defaults successfully', () => {
      const defaultAgency = new AgentDefaultsBuilder().setAgencyNumber('A000123').setCity('Pekin').build();
      const expected = new AgentDefaultsPresenter(defaultAgency).present();
      const agentDefaultsResult = AgentDefaultsResult.success(defaultAgency);

      const form = buildAgentDefaultsShow( { agentDefaultsResult: agentDefaultsResult });

      expect(form.agentDefaultsViewModel).to.eql(expected);
    });
  });

  context('Navigation', () => {
    it('navigates to edit page', () => {
      const router = new MockAgentDefaultsRouter();
      const form = buildAgentDefaultsShow({ router: router });

      return form.navigateToEdit().then(() => {
        router.verifyNavigatedToAgentDefaultsEdit();
      });
    });
  });
});
