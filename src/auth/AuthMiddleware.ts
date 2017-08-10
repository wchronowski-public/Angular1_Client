import { Inject } from '../util/Inject';
import { IRouteMiddleware, INext } from '../routing/IRouteMiddleware';
import { AUTH_SERVICE, IAuthService } from './IAuthService';
import { AUTH_ROUTER, IAuthRouter } from './IAuthRouter';

@Inject(AUTH_SERVICE, AUTH_ROUTER)
export class AuthMiddleware implements IRouteMiddleware {
  public static NAME = 'authMiddleware';

  public authService: IAuthService;
  public router: IAuthRouter;

  public constructor(authService: IAuthService, router: IAuthRouter) {
    this.authService = authService;
    this.router = router;
  }

  public call(next: INext): void {
    if (this.authService.isAuthenticated()) {
      if (this.authService.isAuthorized(next.permission)) {
        next.call();
      } else {
        this.router.navigateToUnauthorized();
      }
    } else {
      // Not sure how we actually would get to this place, but it would
      // probably be treated differently than the unauthorized path
      this.router.navigateToUnauthorized();
    }
  }
}
