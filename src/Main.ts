import 'angular';
import 'angular-ui-router';
import { Application } from './Application';
import { IEnvironmentConfiguration } from './IEnvironmentConfiguration';

require('./stylesheets/main.scss');
require('es6-promise').polyfill();

export class Main {
  public static main(configuration: IEnvironmentConfiguration): void {
    new Application().initialize(configuration);
  }
}

/* tslint:disable:no-string-literal */
(window as any)['start'] = Main.main.bind(Main);
