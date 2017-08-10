import { AgentDefaultsFormController } from 'src/defaults/AgentDefaultsFormController';
import { AgentDefaultsShowController } from './../../src/defaults/AgentDefaultsShowController';
import { AgentDefaultsBuilder } from 'src/defaults/AgentDefaultsBuilder';
import { AgentDefaultsResult } from 'src/defaults/AgentDefaultsResult';
import * as angular from 'angular';
import { expect } from 'chai';
import { Application } from '../../src/Application';
import { FakeConfig } from '../util/FakeConfig';
import { STATES } from '../../src/routing/States';
import { HomeController } from '../../src/home/HomeController';
import { Optional }from '../../src/util/Optional';

describe('Resolve', () => {
  context('currentQuoteOrRedirect', () => {
    let $state: angular.ui.IStateService;
    let $rootScope: angular.IRootScopeService;

    beforeEach(() => {
      angular.mock.module(new Application().setupAngular(new FakeConfig()).name());
      inject([
        '$state',
        '$rootScope',
        (injectedStateService: angular.ui.IStateService,
         injectedRootScope: angular.IRootScopeService) => {
          $state = injectedStateService;
          $rootScope = injectedRootScope;
        },
      ]);
    });
  });
});

describe('ROUTING', () => {
  let $state: angular.ui.IStateService;
  let $stateParams: any;

  beforeEach(() => {
    angular.mock.module(new Application().setupAngular(new FakeConfig()).name());
    inject([
      '$state',
      '$stateParams',
      (injectedStateService: angular.ui.IStateService,
       injectedStateParams: any) => {
        $state = injectedStateService;
        $stateParams = injectedStateParams;
      },
    ]);
  });

  it('defines the application layout state', () => {
    const state = $state.get(STATES.ROOT);

    expect(state.abstract).to.equal(true);
    expect(state.template).to.not.equal(null);
    expect(state.url).to.equal('');
  });

  it('defines the landing page', () => {
    const state = $state.get(STATES.HOME) as any;
    const href = $state.href(STATES.HOME);

    expect(state.views.main.controller).to.equal(HomeController);
    expect(state.views.main.controllerAs).to.exist;
    expect(state.views.main.template).to.exist;
    expect(href).to.equal('/');
  });

  it('defines the styleguide state', () => {
    const state = $state.get(STATES.STYLEGUIDE);
    const href = $state.href(STATES.STYLEGUIDE);

    expect(state.template).to.not.equal(null);
    expect(href).to.equal('/styleguide');
  });

  it('defines the agent defaults state', () => {
    const state = $state.get(STATES.AGENT_DEFAULTS) as any;
    const href = $state.href(STATES.AGENT_DEFAULTS);

    expect(state.views.main.template).to.exist;
    expect(state.views.navigation.template).to.exist;
    expect(href).to.equal('/defaults');
  });

  it('defines the agent defaults show state', () => {
    const state = $state.get(STATES.AGENT_DEFAULTS_SHOW) as any;
    const href = $state.href(STATES.AGENT_DEFAULTS_SHOW, {
      agentDefaultsResult: AgentDefaultsResult.success(new AgentDefaultsBuilder().build()),
    });

    expect(state.views.main.template).to.exist;
    expect(state.views.main.controller).to.equal(AgentDefaultsShowController);
    expect(state.views.main.controllerAs).to.exist;
    expect(state.views.navigation.template).to.exist;
    expect(state.onEnter).to.equal(AgentDefaultsShowController.onEnter);
    expect(state.resolve).to.exist;
    expect(href).to.equal('/defaults');
  });

  it('defines the agent defaults edit state', () => {
    const state = $state.get(STATES.AGENT_DEFAULTS_EDIT) as any;
    const href = $state.href(STATES.AGENT_DEFAULTS_EDIT, {
      agentDefaultsResult: Optional.none<AgentDefaultsResult>(),
    });

    expect(state.views.main.template).to.exist;
    expect(state.views.main.controller).to.equal(AgentDefaultsFormController);
    expect(state.views.main.controllerAs).to.exist;
    expect(state.views.navigation.template).to.exist;
    expect(state.resolve).to.exist;
    expect(href).to.equal('/defaults/edit');
  });
});
