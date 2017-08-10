import * as angular from 'angular';
import { Inject } from '../util/Inject';
import { IHttpClient } from './IHttpClient';
import { IHttpResponse } from './IHttpResponse';
import { CONFIG, IServerBasePathConfig } from '../IEnvironmentConfiguration';
import { JsonObject } from '../util/Json';

@Inject('$http', CONFIG)
export class AngularHttpClient implements IHttpClient {
  public constructor(private $http: angular.IHttpService,
                     private config: IServerBasePathConfig) {}

  public get(path: string, data?: JsonObject): Promise<IHttpResponse> {
    return this.request('GET', path, data);
  }

  public post(path: string, data: JsonObject): Promise<IHttpResponse> {
    return this.request('POST', path, data);
  }

  public put(path: string, data: JsonObject): Promise<IHttpResponse> {
    return this.request('PUT', path, data);
  }

  public delete(path: string): Promise<IHttpResponse> {
    return this.request('DELETE', path);
  }

  private request(method: string, path: string, data?: JsonObject): Promise<IHttpResponse> {
    const config: any = {
      method: method,
      transformResponse: this.transformResponse,
      url: this.withServerBasePath(path),
    };

    if(method === 'GET') {
      config.params = data;
    } else {
      config.data = data;
    }

    return new Promise((resolve, reject) => {
      return this.$http(config).then(result => {
        resolve(result.data);
      }).catch(result => {
        result.data.statusCode !== 0
          ? resolve(result.data)
          : reject();
      });
    });
  }

  private withServerBasePath(path: string): string {
    return this.config.serverBasePath + path;
  }

  private transformResponse(body: string, _: any, statusCode: number): IHttpResponse {
    return { statusCode, body };
  }
}
