import { IEnvironmentConfiguration } from '../../src/IEnvironmentConfiguration';
import { FakeUser } from './FakeUser';

export class FakeConfig implements IEnvironmentConfiguration {
  public serverBasePath = '';
  public homeRaterUrl = 'http://example.com/rater';
  public user = new FakeUser();
}
