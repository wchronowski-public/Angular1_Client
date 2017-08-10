import { IAgentDefaultsRouter } from 'src/defaults/IAgentDefaultsRouter';
import * as angular from 'angular';
import { STATES } from '../routing/States';
import { Inject } from '../util/Inject';

@Inject('$state', '$stateParams')
export class AngularUiRouter implements IAgentDefaultsRouter {

  private $state: angular.ui.IStateService;
  private $stateParams: any;

  public constructor($state: angular.ui.IStateService, $stateParams: any) {
    this.$state = $state;
    this.$stateParams = $stateParams;
  }

  public navigateToUnauthorized(): void {
    this.go(STATES.UNAUTHORIZED);
  }

  public reload(): Promise<this> {
    return new Promise(resolve => {
      const s = this.$state as any;
      s.reload(this.$state.current).then(() => resolve(this));
    });
  }

  public navigateToAgentDefaultsShow(): Promise<this> {
    return this.go(STATES.AGENT_DEFAULTS_SHOW);
  }

  public navigateToAgentDefaultsEdit(): Promise<this> {
    return this.go(STATES.AGENT_DEFAULTS_EDIT);
  }

  private go(state: string, params?: any): Promise<this> {
    return new Promise((resolve, reject) => {
      if(this.$state.transition) {
        this.$state.transition
          .then(() => this.$state.go(state, params))
          .then(() => resolve(this))
          .catch(reject);
      } else {
        this.$state.go(state, params)
          .then(() => resolve(this))
          .catch(reject);
      }
    });
  }
}
