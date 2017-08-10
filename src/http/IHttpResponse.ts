import { HttpStatusCode } from './HttpStatusCode';

export interface IHttpResponse {
  statusCode: HttpStatusCode;
  body?: string;
}
