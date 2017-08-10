import * as angular from 'angular';
import { expect } from 'chai';
import * as RouteMiddlewareChain from '../../src/routing/RouteMiddlewareChain';
import { IRouteMiddleware, INext } from '../../src/routing/IRouteMiddleware';

class MockMiddlewareA implements IRouteMiddleware {
  public static NAME = 'middlewareA';
  public static called: boolean = false;
  public static onCall: (next: INext) => void = (n) => {
    n.call();
    MockMiddlewareA.called = true;
  };

  public call(next: INext): void {
    MockMiddlewareA.onCall(next);
  }
}

class MockMiddlewareB implements IRouteMiddleware {
  public static NAME = 'middlewareB';
  public static called: boolean = false;
  public static onCall: (next: INext) => void = (n) => {
    n.call();
    MockMiddlewareB.called = true;
  };

  public call(next: INext): void {
    MockMiddlewareB.onCall(next);
  }
}

describe('RouteMiddlewareChain', () => {
  let $rootScope: angular.IRootScopeService;

  beforeEach(() => {
    angular.module('MiddlewareSpec', [])
      .service(MockMiddlewareA.NAME, MockMiddlewareA)
      .service(MockMiddlewareB.NAME, MockMiddlewareB)
      .run(RouteMiddlewareChain.using(MockMiddlewareA.NAME, MockMiddlewareB.NAME));
    angular.mock.module('MiddlewareSpec');
    MockMiddlewareA.called = false;
    MockMiddlewareB.called = false;
    inject([
      '$rootScope',
      (rootScope: angular.IRootScopeService) => {
        $rootScope = rootScope;
      },
    ]);
  });

  it('calls each middleware in the chain', () => {
    $rootScope.$emit('$stateChangeStart', {});

    expect(MockMiddlewareA.called).to.be.true;
    expect(MockMiddlewareB.called).to.be.true;
  });

  it('halts the chain if next is not called', () => {
    MockMiddlewareA.onCall = n => MockMiddlewareA.called = true;

    $rootScope.$emit('$stateChangeStart', {});

    expect(MockMiddlewareA.called).to.be.true;
    expect(MockMiddlewareB.called).to.be.false;
  });
});
