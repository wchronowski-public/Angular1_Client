import { expect } from 'chai';
import * as _ from 'lodash';
import * as Immutable from 'immutable';
import { IHttpClient } from '../../src/http/IHttpClient';
import { IHttpResponse } from '../../src/http/IHttpResponse';
import { Optional } from '../../src/util/Optional';
import { JsonObject } from '../../src/util/Json';
import { setImmediateAsync } from '../../src/util/Promise';

enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE,
}

export interface IRequest {
  method: HttpMethod;
  path: string;
  data: any;
}

export class MockHttpClient implements IHttpClient {
  private requests: IRequest[] = [];
  private responses = Immutable.Map<HttpMethod, IHttpResponse>();

  public withGetStubbedToReturn(response: IHttpResponse): this {
    this.responses = this.responses.set(HttpMethod.GET, response);
    return this;
  }

  public withGetStubbedToFail(): this {
    this.responses = this.responses.delete(HttpMethod.GET);
    return this;
  }

  public withPostStubbedToReturn(response: IHttpResponse): this {
    this.responses = this.responses.set(HttpMethod.POST, response);
    return this;
  }

  public withPostStubbedToFail(): this {
    this.responses = this.responses.delete(HttpMethod.POST);
    return this;
  }

  public withPutStubbedToReturn(response: IHttpResponse): this {
    this.responses = this.responses.set(HttpMethod.PUT, response);
    return this;
  }

  public withPutStubbedToFail(): this {
    this.responses = this.responses.delete(HttpMethod.PUT);
    return this;
  }

  public withDeleteStubbedToReturn(response: IHttpResponse): this {
    this.responses = this.responses.set(HttpMethod.DELETE, response);
    return this;
  }

  public withDeleteStubbedToFail(): this {
    this.responses = this.responses.delete(HttpMethod.DELETE);
    return this;
  }

  public get(path: string, data?: JsonObject): Promise<IHttpResponse> {
    return this.request(HttpMethod.GET, path, data);
  }

  public post(path: string, data: JsonObject): Promise<IHttpResponse> {
    return this.request(HttpMethod.POST, path, data);
  }

  public put(path: string, data: JsonObject): Promise<IHttpResponse> {
    return this.request(HttpMethod.PUT, path, data);
  }

  public delete(path: string): Promise<IHttpResponse> {
    return this.request(HttpMethod.DELETE, path);
  }

  public verifyMadeGetRequest(path: string, data?: JsonObject): void {
    this.verifyMadeRequest(HttpMethod.GET, path, data);
  }

  public verifyMadeGetRequestWith(path: string, comp: (request: IRequest) => boolean): void {
    const matchedRequest = this.requests.some(request => {
      return request.method === HttpMethod.GET
          && request.path === path
          && comp(request);
    });

    expect(!!matchedRequest).to.equal(true);
  }

  public dataForPostRequest(path: string): Optional<any> {
    return this.dataForRequest(HttpMethod.POST, path);
  }

  public verifyMadePostRequest(path: string, data: JsonObject): void {
    this.verifyMadeRequest(HttpMethod.POST, path, data);
  }

  public verifyMadeDeleteRequest(path: string): void {
    this.verifyMadeRequest(HttpMethod.DELETE, path);
  }

  public dataForPutRequest(path: string): Optional<any> {
    return this.dataForRequest(HttpMethod.PUT, path);
  }

  public verifyMadePutRequest(path: string, data: JsonObject): void {
    this.verifyMadeRequest(HttpMethod.PUT, path, data);
  }

  private request(method: HttpMethod, path: string, data?: JsonObject): Promise<IHttpResponse> {
    return setImmediateAsync(() => {
      this.requests.push({ method, path, data });
      return this.responses.get(method);
    });
  }

  private verifyMadeRequest(method: HttpMethod, path: string, data?: JsonObject): void {
    const matchedRequest = this.requests.some(request => {
      return request.method === method
          && request.path === path
          && _.isEqual(request.data, data);
    });

    expect(!!matchedRequest).to.equal(true);
  }

  private dataForRequest(method: HttpMethod, path: string): Optional<any> {
    return this.findRequest(method, path).flatMap(r => Optional.of(r.data));
  }

  private findRequest(method: HttpMethod, path: string): Optional<IRequest> {
    return Optional.of(this.requests.filter(request => {
      return request.method === method
          && request.path === path;
    })[0]);
  }
}
