import * as angular from 'angular';
import { expect } from 'chai';
import { Application } from '../../src/Application';
import { AngularHttpClient } from '../../src/http/AngularHttpClient';
import { HttpStatusCode } from '../../src/http/HttpStatusCode';
import { FakeConfig } from '../util/FakeConfig';

describe('AngularHttpClient', () => {
  let $httpBackend: angular.IHttpBackendService;
  let $http: angular.IHttpService;

  beforeEach(() => {
    angular.mock.module(new Application().setupAngular(new FakeConfig()).name());
    inject([
      '$httpBackend',
      '$http',
      (injectedHttpBackendService: angular.IHttpBackendService,
       injectedHttpService: angular.IHttpService) => {
        $httpBackend = injectedHttpBackendService;
        $http = injectedHttpService;
      },
    ]);
  });

  context('get', () => {
    [
      HttpStatusCode.Ok,
      HttpStatusCode.InternalServerError,
    ].forEach(statusCode => {
      it(`resolves ${statusCode} responses`, () => {
        $httpBackend.when('GET', '/api/some-api-call?foo=bar').respond(statusCode, 'foo');
        const client = new AngularHttpClient($http, { serverBasePath: '' });
        const promise = client.get('/api/some-api-call', { foo: 'bar' });

        $httpBackend.flush();

        return promise.then(response => {
          expect(response.statusCode).to.equal(statusCode);
          expect(response.body).to.equal('foo');
        });
      });
    });

    it('prepends the server base path to all get requests', () => {
      $httpBackend.when('GET', '/the/server/base/path/api/some-api-call').respond(200, 'foo');
      const wrapper = new AngularHttpClient($http, { serverBasePath: '/the/server/base/path' });
      const promise = wrapper.get('/api/some-api-call', {});

      $httpBackend.flush();

      return promise.then(response => {
        expect(response.statusCode).to.equal(HttpStatusCode.Ok);
        expect(response.body).to.equal('foo');
      });
    });

    it('rejects the promise when the http call times out', () => {
      $httpBackend.when('GET', '/api/some-api-call').respond(0, '');
      const wrapper = new AngularHttpClient($http, { serverBasePath: '' });
      const promise = wrapper.get('/api/some-api-call', {});

      $httpBackend.flush();

      return expect(promise).to.be.rejected;
    });
  });

  context('post', () => {
    [
      HttpStatusCode.Ok,
      HttpStatusCode.InternalServerError,
    ].forEach(statusCode => {
      it(`resolves ${statusCode} responses`, () => {
        const data = { foo: 'bar' };
        $httpBackend.whenPOST('/api/endpoint', data).respond(statusCode, '{}');
        const client = new AngularHttpClient($http, { serverBasePath: '' });
        const promise = client.post('/api/endpoint', data);

        $httpBackend.flush();

        return promise.then(response => {
          expect(response.statusCode).to.equal(statusCode);
          expect(response.body).to.equal('{}');
        });
      });
    });

    it('prepends the server base path to all requests', () => {
      const data = { foo: 'bar' };
      $httpBackend.whenPOST('/foo/api/endpoint', data).respond(200, '{}');
      const client = new AngularHttpClient($http, { serverBasePath: '/foo' });
      const promise = client.post('/api/endpoint', data);

      $httpBackend.flush();

      return promise.then(response => {
        expect(response.statusCode).to.equal(HttpStatusCode.Ok);
        expect(response.body).to.equal('{}');
      });
    });

    it('rejects the promise when there is no response', () => {
      const data = { foo: 'bar' };
      $httpBackend.whenPOST('/api/endpoint', data).respond(0, '');
      const client = new AngularHttpClient($http, { serverBasePath: '' });
      const promise = client.post('/api/endpoint', data);

      $httpBackend.flush();

      return expect(promise).to.be.rejected;
    });
  });

  context('put', () => {
    [
      HttpStatusCode.Ok,
      HttpStatusCode.InternalServerError,
    ].forEach(statusCode => {
      it(`resolves ${statusCode} responses`, () => {
        const data = { foo: 'bar' };
        $httpBackend.whenPUT('/api/endpoint', data).respond(statusCode, '{}');
        const client = new AngularHttpClient($http, { serverBasePath: '' });
        const promise = client.put('/api/endpoint', data);

        $httpBackend.flush();

        return promise.then(response => {
          expect(response.statusCode).to.equal(statusCode);
          expect(response.body).to.equal('{}');
        });
      });
    });

    it('prepends the server base path to all requests', () => {
      const data = { foo: 'bar' };
      $httpBackend.whenPUT('/foo/api/endpoint', data).respond(200, '{}');
      const client = new AngularHttpClient($http, { serverBasePath: '/foo' });
      const promise = client.put('/api/endpoint', data);

      $httpBackend.flush();

      return promise.then(response => {
        expect(response.statusCode).to.equal(HttpStatusCode.Ok);
        expect(response.body).to.equal('{}');
      });
    });

    it('rejects the promise when there is no response', () => {
      const data = { foo: 'bar' };
      $httpBackend.whenPUT('/api/endpoint', data).respond(0, '');
      const client = new AngularHttpClient($http, { serverBasePath: '' });
      const promise = client.put('/api/endpoint', data);

      $httpBackend.flush();

      return expect(promise).to.be.rejected;
    });
  });

  context('delete', () => {
    [
      HttpStatusCode.Ok,
      HttpStatusCode.InternalServerError,
    ].forEach(statusCode => {
      it(`resolves ${statusCode} responses`, () => {
        $httpBackend.whenDELETE('/api/endpoint').respond(statusCode, '{}');
        const client = new AngularHttpClient($http, { serverBasePath: '' });
        const promise = client.delete('/api/endpoint');

        $httpBackend.flush();

        return promise.then(response => {
          expect(response.statusCode).to.equal(statusCode);
          expect(response.body).to.equal('{}');
        });
      });
    });

    it('prepends the server base path to all requests', () => {
      $httpBackend.whenDELETE('/foo/bar/api/endpoint').respond(200, '{}');
      const client = new AngularHttpClient($http, { serverBasePath: '/foo/bar' });
      const promise = client.delete('/api/endpoint');

      $httpBackend.flush();

      return promise.then(response => {
        expect(response.statusCode).to.equal(HttpStatusCode.Ok);
      });
    });

    it('rejects the promise when there is no response', () => {
      $httpBackend.whenDELETE('/api/endpoint').respond(0, '');
      const client = new AngularHttpClient($http, { serverBasePath: '' });
      const promise = client.delete('/api/endpoint');

      $httpBackend.flush();

      return expect(promise).to.be.rejected;
    });
  });
});
