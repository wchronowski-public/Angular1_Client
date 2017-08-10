import { IHttpResponse } from './IHttpResponse';
import { JsonObject } from '../util/Json';

export const HTTP_CLIENT = 'httpClient';

export interface IHttpClient {
  get(path: string, data?: JsonObject): Promise<IHttpResponse>;
  post(path: string, data: JsonObject): Promise<IHttpResponse>;
  put(path: string, data: JsonObject): Promise<IHttpResponse>;
  delete(path: string): Promise<IHttpResponse>;
}
