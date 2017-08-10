import { Inject } from '../util/Inject';
import { IAuthService } from './IAuthService';
import { IUser } from './IUser';
import { CONFIG, IUserConfig } from '../IEnvironmentConfiguration';
import { Permission } from './Permissions';

@Inject(CONFIG)
export class AuthService implements IAuthService {
  private user: IUser;

  public constructor(config: IUserConfig) {
    this.user = config.user;
  }

  public isAuthenticated(): boolean {
    return !!this.user;
  }

  public isAuthorized(permission: Permission): boolean {
    return this.user && permission(this.user);
  }

  public getAgencyNumber(): string {
    return this.user.agencyNumber;
  }
}
