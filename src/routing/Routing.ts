import { AgentDefaultsFormController } from 'src/defaults/AgentDefaultsFormController';
import { AgentDefaultsShowController } from './../defaults/AgentDefaultsShowController';
import { InjectStatic } from '../util/Inject';
import { AgentDefaultsResult } from 'src/defaults/AgentDefaultsResult';
import { IAuthService, AUTH_SERVICE } from './../auth/IAuthService';
import { IAgentDefaultsService, AGENT_DEFAULTS_SERVICE} from 'src/defaults/IAgentDefaultsService';
import * as angular from 'angular';
import { ApplicationController } from '../ApplicationController';
import { HomeController } from '../home/HomeController';
import { STATES } from '../routing/States';

export class Resolve {
  @InjectStatic(AGENT_DEFAULTS_SERVICE, AUTH_SERVICE)
  public static currentDefaults(service: IAgentDefaultsService, authService: IAuthService): Promise<AgentDefaultsResult> {
    return service.loadDefaults(authService.getAgencyNumber());
  }
}

function createYieldingTemplate(name?: 'main' | 'navigation'): string {
  return !!name
    ? `<div ui-view="${name}"></div>`
    : '<div ui-view></div>';
}

export const ROUTING = [
  '$stateProvider',
  '$locationProvider',
  '$urlRouterProvider',
  ($stateProvider: angular.ui.IStateProvider,
   $locationProvider: angular.ILocationProvider,
   $urlRouterProvider: angular.ui.IUrlRouterProvider): void => {
     $locationProvider.html5Mode(true);
     $urlRouterProvider.otherwise('/');

     $stateProvider.state(STATES.ROOT, {
       abstract: true,
       controller: ApplicationController,
       controllerAs: 'controller',
       template: require('../ApplicationLayout.html'),
       url: '',
     });

     $stateProvider.state(STATES.HOME, {
       url: '/',
       views: {
         main: {
           controller: HomeController,
           controllerAs: 'controller',
           template: require('../home/Home.html'),
         },
       },
     });

     $stateProvider.state(STATES.UNAUTHORIZED, {
       views: {
         main: {
           template: require('../auth/Unauthorized.html'),
         },
       },
     });

     $stateProvider.state(STATES.STYLEGUIDE, {
       url: '/styleguide',
       views: {
         main: {
           template: require('../styleguide.html'),
         },
       },
     });

     $stateProvider.state(STATES.AGENT_DEFAULTS, {
       abstract: true,
       url: '/defaults',
       views: {
         main: {
           template: createYieldingTemplate('main'),
         },
         navigation: {
           template: createYieldingTemplate('navigation'),
         },
       },
     });

     $stateProvider.state(STATES.AGENT_DEFAULTS_SHOW, {
       resolve: {
         agentDefaultsResult: Resolve.currentDefaults,
       },
       onEnter: AgentDefaultsShowController.onEnter,
       views: {
         main: {
           template: require('../defaults/AgentDefaultsShow.html'),
           controller: AgentDefaultsShowController,
           controllerAs: 'form',
         },
         navigation: {
           template: createYieldingTemplate(),
         },
       },
       url: '',
     });

     $stateProvider.state(STATES.AGENT_DEFAULTS_EDIT, {
      resolve: {
        agentDefaultsResult: Resolve.currentDefaults,
      },
      views: {
        main: {
          template: require('../defaults/AgentDefaultsForm.html'),
          controller: AgentDefaultsFormController,
          controllerAs: 'form',
        },
        navigation: {
          template: createYieldingTemplate(),
        },
      },
      url: '/edit',
     });
   },
];
