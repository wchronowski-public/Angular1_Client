import { expect } from 'chai';
import { ApplicationController } from '../src/ApplicationController';
import { FakeConfig } from './util/FakeConfig';
import { IEnvironmentConfiguration } from '../src/IEnvironmentConfiguration';

interface IApplicationControllerConstructorOverrides {
  config?: IEnvironmentConfiguration;
}

function buildApplicationController(overrides: IApplicationControllerConstructorOverrides = {}): ApplicationController {
  const config = overrides.config || { homeRaterUrl: '/' };
  return new ApplicationController(config);
}

describe('Application Controller', () => {
  it('returns the home rater url from the config', () => {
    const config = new FakeConfig();
    const controller = buildApplicationController({ config });

    expect(controller.getHomeRaterUrl()).to.equal(config.homeRaterUrl);
  });
});
