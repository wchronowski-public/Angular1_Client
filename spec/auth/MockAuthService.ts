import { IAuthService } from '../../src/auth/IAuthService';
import { Permission } from '../../src/auth/Permissions';
import { FakeUser } from '../util/FakeUser';
import { IUser } from '../../src/auth/IUser';

export class MockAuthService implements IAuthService {
  public user: IUser = new FakeUser();

  public isAuthenticated(): boolean {
    return !!this.user;
  }

  public isAuthorized(permission: Permission): boolean {
    return permission(this.user);
  }

  public setAgencyNumber(agencyNumber: string): this {
    this.user.agencyNumber = agencyNumber;
    return this;
  }

  public getAgencyNumber(): string {
    return this.user.agencyNumber;
  }
}
