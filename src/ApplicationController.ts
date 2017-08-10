import { IExternalUrlConfig, CONFIG } from './IEnvironmentConfiguration';
import { Inject } from './util/Inject';

@Inject(CONFIG)
export class ApplicationController {
  public constructor(private configuration: IExternalUrlConfig) {}

  public getHomeRaterUrl(): string {
    return this.configuration.homeRaterUrl;
  }
}
