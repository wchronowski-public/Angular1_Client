import { IAuthRouter } from '../../src/auth/IAuthRouter';

export class MockAuthRouter implements IAuthRouter {
  public navigatedToUnauthorized: boolean = false;

  public navigateToUnauthorized(): void {
    this.navigatedToUnauthorized = true;
  }
}
