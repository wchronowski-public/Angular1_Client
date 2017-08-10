import { expect } from 'chai';
import { AuthMiddleware } from '../../src/auth/AuthMiddleware';
import { INext } from '../../src/routing/IRouteMiddleware';
import { IUser } from '../../src/auth/IUser';
import { MockAuthRouter } from './MockAuthRouter';
import { MockAuthService } from './MockAuthService';

describe('AuthMiddleware', () => {
  let router: MockAuthRouter = new MockAuthRouter();
  let authService: MockAuthService = new MockAuthService();
  let next: INext;

  it('continues when authenticated and authorized', () => {
    const middleware = new AuthMiddleware(authService, router);
    let nextCalled = false;
    next = {
      call: (): void => {
        nextCalled = true;
      },
      permission: (u: IUser): boolean => true,
    };

    middleware.call(next);

    expect(nextCalled).to.be.true;
  });

  it('navigates to the unauthrorized route when not authorized', () => {
    const middleware = new AuthMiddleware(authService, router);
    let nextCalled = false;
    next = {
      call: (): void => {
        nextCalled = true;
      },
      permission: (u: IUser): boolean => false,
    };

    middleware.call(next);

    expect(nextCalled).to.be.false;
    expect(router.navigatedToUnauthorized).to.be.true;
  });

  it('navigates to the unauthrorized route when not authenticated', () => {
    const middleware = new AuthMiddleware(authService, router);
    authService.user = null;
    let nextCalled = false;
    next = {
      call: (): void => {
        nextCalled = true;
      },
      permission: null,
    };

    middleware.call(next);

    expect(nextCalled).to.be.false;
    expect(router.navigatedToUnauthorized).to.be.true;
  });
});
