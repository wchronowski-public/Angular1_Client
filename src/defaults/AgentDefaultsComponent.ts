import * as angular from 'angular';

export class AgentDefaultsComponent {
  public static NAME: string = 'agentDefaults';
  public static COMPONENT: angular.IComponentOptions = {
    template: require('./AgentDefaultsRequestButton.html'),
  };
}
